import {
  Component,
  OnInit,
  AfterViewInit,
  signal,
  inject,
  DestroyRef,
  ViewChildren,
  QueryList,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ServicioAutenticacion } from '../../services/auth.service';
import { Usuario } from '../../models/user.model';
import { obtenerInfoRango } from '../../models/rango.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  // styleUrl (singular) está deprecado; se usa styleUrls (array)
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChildren('matchCard') matchCards!: QueryList<ElementRef<HTMLElement>>;
  @ViewChild('matchesList') matchesListRef!: ElementRef<HTMLElement>;
  matchesListMaxHeight = signal<number | null>(null);
  indicatorVisible = signal(false);
  // Opacidad dinámica para fade al desplazarse
  indicatorOpacity = signal(1);
  // Indicador superior (contenido hacia arriba)
  topIndicatorVisible = signal(false);
  topIndicatorOpacity = signal(0);

  usuario = signal<Usuario | null>(null);
  obtenerInfoRango = obtenerInfoRango; // Hacer disponible en la plantilla

  // Próximos partidos/torneos, incluyendo integrantes
  upcomingMatches = signal<
    Array<{
      id: string;
      fecha: string | Date;
      titulo: string;
      tipo: 'partido' | 'torneo';
      ubicacion?: string;
      duracion: string; // '1h', '1h 30min', etc.
      tipoPartido: 'igualado' | 'no-igualado';
      rango?: string; // Solo si es igualado
      estado: 'pendiente' | 'confirmado';
      jugadores: {
        equipo1: { jugador1: string; jugador2: string };
        equipo2: { jugador1: string; jugador2: string };
      };
    }>
  >([]);

  private destroyRef = inject(DestroyRef);

  constructor(
    private servicioAuth: ServicioAutenticacion,
    private enrutador: Router,
  ) {
    // Recalcular altura al cargar fuentes (si soportado)
    try {
      const anyDoc: any = document;
      if (anyDoc.fonts?.ready) {
        anyDoc.fonts.ready.then(() => this.recalcularAltura());
      }
    } catch {}
  }

  ngOnInit() {
    // Obtener usuario actual del signal
    const usuarioActual = this.servicioAuth.usuarioActual();
    this.usuario.set(usuarioActual);

    // Suscribirse a cambios usando takeUntilDestroyed para evitar fugas
    this.servicioAuth.usuarioActual$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((usuario) => {
        if (this.usuario() !== usuario) {
          this.usuario.set(usuario);
          this.cargarProximosPartidos();
        }
      });

    // Cargar inicialmente
    this.cargarProximosPartidos();
  }

  ngAfterViewInit() {
    // Medir tras render inicial
    queueMicrotask(() => this.recalcularAltura());
    // Medir si cambia la lista (ej: nuevos partidos)
    this.matchCards.changes.subscribe(() => this.recalcularAltura());
    // Recalcular en resize (responsiveness / wrap)
    fromEvent(window, 'resize')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.recalcularAltura());
  }

  private recalcularAltura() {
    const listEl = this.matchesListRef?.nativeElement;
    if (!listEl) return;
    const cards = this.matchCards?.toArray();
    if (!cards || cards.length === 0) return;

    // Asegurar layout estable antes de medir
    requestAnimationFrame(() => {
      const first = cards[0].nativeElement;
      const second = cards[1]?.nativeElement;
      const h1 = first.getBoundingClientRect().height;
      const h2 = second ? second.getBoundingClientRect().height : 0;
      const styles = getComputedStyle(listEl);
      const gap = second ? parseFloat(styles.rowGap || styles.gap || '0') : 0;
      // Altura visible = suma de 2 tarjetas + el gap entre ellas (y un pixel de seguridad para evitar corte por redondeo)
      const total = Math.ceil(h1 + h2 + gap + 1);
      if (total > 0) this.matchesListMaxHeight.set(total);

      // Actualizar indicadores tras medición
      this.actualizarIndicadoresScroll();
    });
  }
  // (Lógica simplificada: sin flags ni reintentos extra)

  private mostrarIndicadorScroll() {
    if (!this.indicatorVisible()) this.indicatorVisible.set(true);
    this.indicatorOpacity.set(1);
  }
  private ocultarIndicadorScroll() {
    if (this.indicatorVisible()) this.indicatorVisible.set(false);
    this.indicatorOpacity.set(0);
  }
  private mostrarIndicadorSuperior() {
    if (!this.topIndicatorVisible()) this.topIndicatorVisible.set(true);
    this.topIndicatorOpacity.set(1);
  }
  private ocultarIndicadorSuperior() {
    if (this.topIndicatorVisible()) this.topIndicatorVisible.set(false);
    this.topIndicatorOpacity.set(0);
  }

  private actualizarIndicadoresScroll() {
    const el = this.matchesListRef?.nativeElement;
    if (!el) return;
    const canScroll = el.scrollHeight > el.clientHeight + 1; // hay overflow vertical
    if (!canScroll) {
      this.ocultarIndicadorScroll();
      this.ocultarIndicadorSuperior();
      return;
    }
    const scrollTop = el.scrollTop;
    const maxScroll = el.scrollHeight - el.clientHeight;
    const atTop = scrollTop <= 0;
    const atBottom = scrollTop >= maxScroll - 0.5;
    // Configuración de fade (más corto para desaparecer antes)
    const fadeRange = 60; // rango total de desvanecimiento
    const bottomHideThreshold = 18; // distancia al fondo a partir de la cual ya se oculta totalmente
    const topHideThreshold = 12; // scrollTop por debajo del cual se oculta totalmente la flecha superior

    // Indicador inferior (contenido abajo)
    if (!atBottom) {
      const distance = maxScroll - scrollTop; // distancia hasta el fondo
      if (distance <= bottomHideThreshold) {
        this.indicatorOpacity.set(0);
        this.ocultarIndicadorScroll();
      } else {
        this.mostrarIndicadorScroll();
        const effective = Math.min(
          fadeRange,
          Math.max(0, distance - bottomHideThreshold),
        );
        const opacity = effective / fadeRange; // 1 cuando distance >= bottomHideThreshold + fadeRange
        this.indicatorOpacity.set(Math.min(1, opacity));
      }
    } else {
      this.indicatorOpacity.set(0);
      this.ocultarIndicadorScroll();
    }

    // Indicador superior (contenido arriba)
    if (!atTop) {
      if (scrollTop <= topHideThreshold) {
        this.topIndicatorOpacity.set(0);
        this.ocultarIndicadorSuperior();
      } else {
        this.mostrarIndicadorSuperior();
        const effectiveTop = Math.min(
          fadeRange,
          Math.max(0, scrollTop - topHideThreshold),
        );
        const topOpacity = effectiveTop / fadeRange;
        this.topIndicatorOpacity.set(Math.min(1, topOpacity));
      }
    } else {
      this.topIndicatorOpacity.set(0);
      this.ocultarIndicadorSuperior();
    }
  }

  onMatchesScroll() {
    this.actualizarIndicadoresScroll();
  }

  // Llamar también después de carga de fuentes (si soportado)

  private cargarProximosPartidos(): void {
    // Mock de próximos partidos y torneos (fechas futuras) con integrantes
    const now = new Date();
    const addHours = (hours: number) =>
      new Date(now.getTime() + hours * 60 * 60 * 1000).toISOString();
    const addDays = (days: number, plusHours: number = 0) =>
      addHours(days * 24 + plusHours);

    const mock = [
      {
        id: 'u1',
        fecha: addDays(1, 2),
        titulo: 'Partido igualado - Grupo Plata',
        tipo: 'partido' as const,
        ubicacion: 'Winner Sports Reus',
        duracion: '1h 30min',
        tipoPartido: 'igualado' as const,
        rango: 'PLATA',
        estado: 'pendiente' as const,
        jugadores: {
          equipo1: { jugador1: 'Abel Jornet', jugador2: 'Gerard' },
          equipo2: { jugador1: 'Raul', jugador2: 'Jose' },
        },
      },
      {
        id: 'u2',
        fecha: addDays(3, 1),
        titulo: 'Torneo de Verano - Fase de Grupos',
        tipo: 'torneo' as const,
        ubicacion: 'Procenter Padel Club',
        duracion: '2h',
        tipoPartido: 'igualado' as const,
        rango: 'ORO',
        estado: 'confirmado' as const,
        jugadores: {
          equipo1: { jugador1: 'Abel Jornet', jugador2: 'Maria' },
          equipo2: { jugador1: 'Pedro', jugador2: 'Ana' },
        },
      },
      {
        id: 'u3',
        fecha: addDays(5, 0),
        titulo: 'Amistoso de preparación',
        tipo: 'partido' as const,
        ubicacion: 'Club Pádel Barcelona',
        duracion: '1h',
        tipoPartido: 'igualado' as const,
        rango: 'BRONCE',
        estado: 'confirmado' as const,
        jugadores: {
          equipo1: { jugador1: 'Abel Jornet', jugador2: 'Patricia' },
          equipo2: { jugador1: 'Sergio', jugador2: 'Elena' },
        },
      },
      {
        id: 'u4',
        fecha: addDays(7, 0),
        titulo: 'Partido nivel inicial',
        tipo: 'partido' as const,
        ubicacion: 'Club Municipal',
        duracion: '1h',
        tipoPartido: 'igualado' as const,
        rango: 'COBRE',
        estado: 'pendiente' as const,
        jugadores: {
          equipo1: { jugador1: 'Abel Jornet', jugador2: 'Carlos' },
          equipo2: { jugador1: 'Luis', jugador2: 'Miguel' },
        },
      },
    ].sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());

    this.upcomingMatches.set(mock);
  }

  // Métodos de utilidad para la sección de próximos partidos
  trackByUpcomingId(index: number, m: { id: string }): string {
    return m.id;
  }

  formatDateLong(date: string | Date): string {
    const d = new Date(date);
    return d.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  formatTime(date: string | Date): string {
    const d = new Date(date);
    return d.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  formatTimeRange(fecha: string | Date, duracion: string): string {
    // duracion formato: '1h', '1h 30min', '2h', etc.
    const inicio = new Date(fecha);
    const match = duracion.match(/(\d+)h(?:\s*(\d+)?min)?/i);
    let minutos = 60; // default 1h
    if (match) {
      const horas = parseInt(match[1], 10);
      const mins = match[2] ? parseInt(match[2], 10) : 0;
      minutos = horas * 60 + mins;
    }
    const fin = new Date(inicio.getTime() + minutos * 60000);
    const opts: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
    };
    return `${inicio.toLocaleTimeString('es-ES', opts)} - ${fin.toLocaleTimeString('es-ES', opts)}`;
  }

  getPlayerInitials(name?: string): string {
    if (!name) return '?';
    const parts = name.trim().split(/\s+/);
    const first = parts[0]?.charAt(0) ?? '';
    const last =
      parts.length > 1
        ? parts[parts.length - 1].charAt(0)
        : (parts[0]?.charAt(1) ?? '');
    return `${first}${last}`.toUpperCase();
  }

  obtenerIniciales(): string {
    const usuario = this.usuario();
    if (!usuario) return 'U';

    const apellido = usuario.apellidos || usuario.nombre.split(' ')[1] || '';
    return `${usuario.nombre.charAt(0)}${apellido.charAt(0) || usuario.nombre.charAt(1)}`.toUpperCase();
  }

  obtenerPrimerNombre(): string {
    const usuario = this.usuario();
    if (!usuario) return 'Usuario';

    // Si el nombre tiene espacios, tomar solo el primer nombre
    const primerNombre = usuario.nombre.split(' ')[0];

    // Si es muy largo, truncar
    if (primerNombre.length > 15) {
      return primerNombre.substring(0, 15) + '...';
    }

    return primerNombre;
  }

  obtenerColorRango(): string {
    const usuario = this.usuario();
    if (!usuario?.rangoActual) return '#666';

    const infoRango = obtenerInfoRango(usuario.rangoActual);
    return infoRango.color;
  }

  calcularPorcentajeVictoria(): number {
    const usuario = this.usuario();
    if (!usuario) {
      return 0;
    }

    // TODO: Implementar estadísticas reales cuando estén disponibles en el backend
    // Por ahora retornamos un valor por defecto
    return 0;
  }

  navegarA(ruta: string) {
    this.enrutador.navigate([ruta]);
  }

  cerrarSesion() {
    this.servicioAuth.cerrarSesion();
  }

  // Acciones rápidas sobre un partido (stubs iniciales)
  verMatch(m: any) {
    // TODO: Navegar a detalle del partido
    console.log('Ver partido', m.id);
  }

  editarMatch(m: any) {
    // TODO: Navegar a formulario de edición (si aplica permisos)
    console.log('Editar partido', m.id);
  }

  cancelarMatch(m: any) {
    // TODO: Confirmar y cancelar partido vía servicio
    const confirmacion = confirm('¿Seguro que deseas cancelar este partido?');
    if (confirmacion) {
      console.log('Cancelar partido', m.id);
      // Aquí se podría actualizar estado local o llamar al backend
    }
  }
}
