import { Component, OnInit, signal } from '@angular/core';
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
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  usuario = signal<Usuario | null>(null);
  obtenerInfoRango = obtenerInfoRango; // Hacer disponible en la plantilla

  // Próximos partidos/torneos, incluyendo integrantes
  upcomingMatches = signal<Array<{
    id: string;
    fecha: string | Date;
    titulo: string;
    tipo: 'partido' | 'torneo';
    ubicacion?: string;
    duracion: string; // '1h', '1h 30min', etc.
    tipoPartido: 'igualado' | 'no-igualado';
    rango?: string; // Solo si es igualado
    jugadores: {
      equipo1: { jugador1: string; jugador2: string };
      equipo2: { jugador1: string; jugador2: string };
    };
  }>>([]);

  constructor(
    private servicioAuth: ServicioAutenticacion,
    private enrutador: Router
  ) {}

  ngOnInit() {
    // Obtener usuario actual del signal
    const usuarioActual = this.servicioAuth.usuarioActual();
    this.usuario.set(usuarioActual);
    
    // Suscribirse a cambios del usuario solo si es diferente
    this.servicioAuth.usuarioActual$.subscribe(usuario => {
      if (this.usuario() !== usuario) {
        this.usuario.set(usuario);
        // Al cambiar usuario, recargar próximos partidos
        this.cargarProximosPartidos();
      }
    });

    // Cargar inicialmente
    this.cargarProximosPartidos();
  }

  private cargarProximosPartidos(): void {
    // Mock de próximos partidos y torneos (fechas futuras) con integrantes
    const now = new Date();
    const addHours = (hours: number) => new Date(now.getTime() + hours * 60 * 60 * 1000).toISOString();
    const addDays = (days: number, plusHours: number = 0) => addHours(days * 24 + plusHours);

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
        jugadores: {
          equipo1: { jugador1: 'Abel Jornet', jugador2: 'Gerard' },
          equipo2: { jugador1: 'Raul', jugador2: 'Jose' }
        }
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
        jugadores: {
          equipo1: { jugador1: 'Abel Jornet', jugador2: 'Maria' },
          equipo2: { jugador1: 'Pedro', jugador2: 'Ana' }
        }
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
        jugadores: {
          equipo1: { jugador1: 'Abel Jornet', jugador2: 'Patricia' },
          equipo2: { jugador1: 'Sergio', jugador2: 'Elena' }
        }
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
        jugadores: {
          equipo1: { jugador1: 'Abel Jornet', jugador2: 'Carlos' },
          equipo2: { jugador1: 'Luis', jugador2: 'Miguel' }
        }
      }
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
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
  }

  formatTime(date: string | Date): string {
    const d = new Date(date);
    return d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  }

  getPlayerInitials(name?: string): string {
    if (!name) return '?';
    const parts = name.trim().split(/\s+/);
    const first = parts[0]?.charAt(0) ?? '';
    const last = parts.length > 1 ? parts[parts.length - 1].charAt(0) : (parts[0]?.charAt(1) ?? '');
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
}
