import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicioAutenticacion } from '../../services/auth.service';
import { ServicioClubes } from '../../services/clubes.service';
import { Club } from '../../models/club.model';
import { SkeletonLoaderComponent } from '../../shared/components/skeleton-loader/skeleton-loader.component';

@Component({
  selector: 'app-clubs',
  standalone: true,
  imports: [CommonModule, FormsModule, SkeletonLoaderComponent],
  template: `
    <div class="contenedor-clubes">
      <!-- Contenido principal -->
      <main class="contenido-principal">
        <div class="encabezado">
          <h1>Clubes de Pádel 🏟️</h1>
          <p>Explora y únete a clubes de pádel</p>
        </div>

        <!-- Estado de carga -->
        <div class="skeleton-container" *ngIf="cargando()">
          <div class="skeleton-grid">
            <app-skeleton-loader 
              *ngFor="let item of [1,2,3,4,5,6]"
              type="card" 
              width="100%" 
              height="200px">
            </app-skeleton-loader>
          </div>
        </div>

        <!-- Lista de clubes -->
        <div class="lista-clubes" *ngIf="!cargando()">
          <div class="tarjeta-club" *ngFor="let club of clubes()">
            <div class="club-header">
              <div class="icono-club">🏟️</div>
              <div class="info-club">
                <h3>{{ getClubName(club) }}</h3>
                <p class="descripcion">{{ getClubDescription(club) }}</p>
                <p class="direccion">📍 {{ getClubAddress(club) }}</p>
              </div>
            </div>
            <div class="detalles">
              <p *ngIf="getClubPhone(club)" class="telefono">📞 {{ getClubPhone(club) }}</p>
              <p *ngIf="getClubEmail(club)" class="email">✉️ {{ getClubEmail(club) }}</p>
              <p *ngIf="getClubCourts(club)" class="pistas">🎾 {{ getClubCourts(club) }} pistas</p>
              <p *ngIf="getClubPrice(club)" class="precio">💰 {{ getClubPrice(club) }}€/hora</p>
            </div>
            <div class="sitio-web" *ngIf="getClubWebsite(club)">
              <a [href]="getClubWebsite(club)" target="_blank" class="enlace-web">
                🌐 Sitio web
              </a>
            </div>
            <div class="acciones-club">
              <button class="boton-ver-detalles" (click)="verDetallesClub(club._id!)" [disabled]="!club._id">
                Ver Detalles
              </button>
              <button class="boton-unirse" disabled>
                Próximamente
              </button>
            </div>
          </div>

          <!-- Mensaje cuando no hay clubes -->
          <div class="sin-clubes" *ngIf="clubes().length === 0">
            <div class="icono-vacio">🏟️</div>
            <h3>No hay clubes disponibles</h3>
            <p>Aún no se han registrado clubes en la plataforma.</p>
          </div>
        </div>

        <!-- Mensaje de error -->
        <div class="mensaje-error" *ngIf="error()">
          <div class="icono-error">⚠️</div>
          <h3>Error al cargar clubes</h3>
          <p>{{ error() }}</p>
          <button class="boton-reintentar" (click)="cargarClubes()">
            Reintentar
          </button>
        </div>

        <!-- Información adicional -->
        <div class="info-adicional">
          <div class="tarjeta-info">
            <h2>¿Qué puedes hacer con los clubes?</h2>
            <div class="caracteristicas">
              <div class="caracteristica">
                <div class="icono">👥</div>
                <div class="texto">
                  <h4>Unirse a un club</h4>
                  <p>Forma parte de una comunidad de jugadores de pádel</p>
                </div>
              </div>
              <div class="caracteristica">
                <div class="icono">🏆</div>
                <div class="texto">
                  <h4>Participar en torneos</h4>
                  <p>Compite en torneos internos y entre clubes</p>
                </div>
              </div>
              <div class="caracteristica">
                <div class="icono">📊</div>
                <div class="texto">
                  <h4>Rankings del club</h4>
                  <p>Ve tu posición en el ranking interno del club</p>
                </div>
              </div>
              <div class="caracteristica">
                <div class="icono">⚽</div>
                <div class="texto">
                  <h4>Partidos regulares</h4>
                  <p>Juega partidos con otros miembros del club</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .contenedor-clubes {
      min-height: 100vh;
      background: #f8f9fa;
    }

    .contenido-principal {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .encabezado {
      text-align: center;
      margin-bottom: 2rem;
    }

    .encabezado h1 {
      color: #333;
      margin: 0 0 0.5rem 0;
      font-size: 2.5rem;
    }

    .encabezado p {
      color: #666;
      font-size: 1.1rem;
      margin: 0 0 1rem 0;
    }

    .header-actions {
      margin-top: 1rem;
    }

    .btn-primary {
      background: #007bff;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .btn-primary:hover {
      background: #0056b3;
    }

    .cargando {
      text-align: center;
      padding: 3rem;
    }

    .skeleton-container {
      margin-bottom: 3rem;
    }

    .skeleton-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 1.5rem;
    }

    .spinner {
      width: 50px;
      height: 50px;
      border: 4px solid #f3f3f3;
      border-top: 4px solid #667eea;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 1rem;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .lista-clubes {
      display: grid;
      gap: 1.5rem;
      margin-bottom: 3rem;
    }

    .tarjeta-club {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      transition: transform 0.2s;
      width: 100%;
      max-width: 100%;
      overflow: hidden;
    }

    .tarjeta-club:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0,0,0,0.15);
    }

    .icono-club {
      font-size: 4rem;
      align-self: flex-start;
      margin-bottom: 1rem;
    }

    .club-header {
      display: flex;
      align-items: flex-start;
      gap: 1.5rem;
      margin-bottom: 1rem;
    }

    .info-club {
      flex: 1;
      min-width: 0;
    }

    .info-club h3 {
      margin: 0 0 0.5rem 0;
      color: #333;
      font-size: 1.5rem;
    }

    .direccion {
      margin: 0 0 1rem 0;
      color: #666;
      font-size: 1rem;
    }

    .detalles {
      margin-bottom: 1rem;
    }

    .telefono,
    .email {
      margin: 0.25rem 0;
      color: #666;
      font-size: 0.9rem;
    }

    .enlace-web {
      color: #667eea;
      text-decoration: none;
      font-size: 0.9rem;
    }

    .enlace-web:hover {
      text-decoration: underline;
    }

    .acciones-club {
      display: flex;
      gap: 1rem;
      justify-content: center;
      margin-top: 1rem;
    }

    .boton-ver-detalles {
      background: #007bff;
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
      transition: background-color 0.2s;
      white-space: nowrap;
      font-size: 0.9rem;
      flex: 1;
      max-width: 150px;
    }

    .boton-ver-detalles:hover:not(:disabled) {
      background: #0056b3;
    }

    .boton-ver-detalles:disabled {
      background: #6c757d;
      cursor: not-allowed;
      opacity: 0.6;
    }

    .boton-unirse {
      background: #6c757d;
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      font-size: 0.9rem;
      cursor: not-allowed;
      opacity: 0.6;
      flex: 1;
      max-width: 150px;
    }

    .descripcion {
      color: #666;
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
      line-height: 1.4;
    }

    .pistas, .precio {
      color: #007bff;
      font-weight: 600;
      margin: 0.25rem 0;
    }

    .sin-clubes,
    .mensaje-error {
      text-align: center;
      padding: 3rem;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }

    .icono-vacio,
    .icono-error {
      font-size: 4rem;
      margin-bottom: 1rem;
    }

    .sin-clubes h3,
    .mensaje-error h3 {
      margin: 0 0 1rem 0;
      color: #333;
    }

    .sin-clubes p,
    .mensaje-error p {
      margin: 0 0 1rem 0;
      color: #666;
    }

    .boton-reintentar {
      background: #667eea;
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 6px;
      cursor: pointer;
      transition: background 0.2s;
    }

    .boton-reintentar:hover {
      background: #5a6fd8;
    }

    .info-adicional {
      margin-top: 3rem;
    }

    .tarjeta-info {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }

    .tarjeta-info h2 {
      margin: 0 0 2rem 0;
      color: #333;
      text-align: center;
      font-size: 1.5rem;
    }

    .caracteristicas {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .caracteristica {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
    }

    .caracteristica .icono {
      font-size: 2rem;
      flex-shrink: 0;
    }

    .caracteristica .texto h4 {
      margin: 0 0 0.5rem 0;
      color: #333;
      font-size: 1.1rem;
    }

    .caracteristica .texto p {
      margin: 0;
      color: #666;
      line-height: 1.5;
    }

    @media (max-width: 768px) {
      .contenido-principal {
        padding: 1rem;
      }

      .club-header {
        flex-direction: column;
        text-align: center;
        gap: 1rem;
      }

      .icono-club {
        align-self: center;
        margin-bottom: 0;
      }

      .acciones-club {
        flex-direction: column;
        gap: 0.5rem;
      }

      .caracteristicas {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ComponenteClubes implements OnInit {
  clubes = signal<Club[]>([]);
  cargando = signal(false);
  error = signal('');

  constructor(
    private servicioAuth: ServicioAutenticacion,
    private servicioClubes: ServicioClubes,
    private enrutador: Router
  ) {}

  ngOnInit() {
    this.cargarClubes();
  }

  cargarClubes() {
    this.cargando.set(true);
    this.error.set('');

    this.servicioClubes.obtenerTodosClubes().subscribe({
      next: (clubes) => {
        this.clubes.set(clubes);
        this.cargando.set(false);
      },
      error: (err) => {
        console.error('Error al cargar clubes:', err);
        this.error.set('No se pudieron cargar los clubes. Por favor, intenta de nuevo.');
        this.cargando.set(false);
      }
    });
  }

  // Métodos auxiliares para manejar compatibilidad de datos
  getClubName(club: Club): string {
    return club.name || club.nombre || 'Club sin nombre';
  }

  getClubDescription(club: Club): string {
    return club.description || 'Descripción no disponible';
  }

  getClubAddress(club: Club): string {
    return club.location?.address || club.direccion || 'Dirección no disponible';
  }

  getClubPhone(club: Club): string | null {
    return club.contact?.phone || club.telefono || null;
  }

  getClubEmail(club: Club): string | null {
    return club.contact?.email || club.email || null;
  }

  getClubWebsite(club: Club): string | null {
    return club.contact?.website || club.sitioWeb || null;
  }

  getClubCourts(club: Club): number | null {
    return club.totalCourts || club.numeroPistas || null;
  }

  getClubPrice(club: Club): number | null {
    return club.pricing?.courtPricePerHour || club.precioHora || null;
  }

  navegarA(ruta: string) {
    this.enrutador.navigate([ruta]);
  }

  verDetallesClub(clubId: string) {
    if (clubId) {
      this.enrutador.navigate(['/clubes', clubId]);
    }
  }

  cerrarSesion() {
    this.servicioAuth.cerrarSesion();
  }

  // Métodos auxiliares para compatibilidad con diferentes formatos de datos
  obtenerNombreClub(club: Club): string {
    return club.name || club.nombre || 'Sin nombre';
  }

  obtenerDescripcionClub(club: Club): string {
    return club.description || 'Descripción no disponible';
  }

  obtenerDireccionClub(club: Club): string {
    return club.location?.address || club.direccion || 'Dirección no disponible';
  }

  obtenerTelefonoClub(club: Club): string | undefined {
    return club.contact?.phone || club.telefono;
  }

  obtenerEmailClub(club: Club): string | undefined {
    return club.contact?.email || club.email;
  }

  obtenerSitioWebClub(club: Club): string | undefined {
    return club.contact?.website || club.sitioWeb;
  }

  obtenerNumeroPistas(club: Club): number | undefined {
    return club.totalCourts || club.numeroPistas;
  }

  obtenerPrecioHora(club: Club): number | undefined {
    return club.pricing?.courtPricePerHour || club.precioHora;
  }
}
