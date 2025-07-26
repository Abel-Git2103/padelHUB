import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicioAutenticacion } from '../../services/auth.service';
import { ServicioClubes } from '../../services/clubes.service';
import { Club } from '../../models/club.model';

@Component({
  selector: 'app-clubs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="contenedor-clubes">
      <!-- Barra de navegación -->
      <nav class="barra-navegacion">
        <div class="logo">
          <h2>🏓 PadelHUB</h2>
        </div>
        <div class="menu-navegacion">
          <button class="boton-nav" (click)="navegarA('/tablero')">
            🏠 Inicio
          </button>
          <button class="boton-nav" (click)="navegarA('/perfil')">
            👤 Perfil
          </button>
          <button class="boton-nav activo">
            🏟️ Clubes
          </button>
          <button class="boton-nav" (click)="navegarA('/rankings')">
            🏆 Rankings
          </button>
          <button class="boton-nav boton-salir" (click)="cerrarSesion()">
            🚪 Salir
          </button>
        </div>
      </nav>

      <!-- Contenido principal -->
      <main class="contenido-principal">
        <div class="encabezado">
          <h1>Clubes de Pádel 🏟️</h1>
          <p>Explora y únete a clubes de pádel</p>
        </div>

        <!-- Estado de carga -->
        <div class="cargando" *ngIf="cargando()">
          <div class="spinner"></div>
          <p>Cargando clubes...</p>
        </div>

        <!-- Lista de clubes -->
        <div class="lista-clubes" *ngIf="!cargando()">
          <div class="tarjeta-club" *ngFor="let club of clubes()">
            <div class="icono-club">🏟️</div>
            <div class="info-club">
              <h3>{{ club.nombre }}</h3>
              <p class="direccion">📍 {{ club.direccion }}</p>
              <div class="detalles" *ngIf="club.telefono || club.email">
                <p *ngIf="club.telefono" class="telefono">📞 {{ club.telefono }}</p>
                <p *ngIf="club.email" class="email">✉️ {{ club.email }}</p>
              </div>
              <div class="sitio-web" *ngIf="club.sitioWeb">
                <a [href]="club.sitioWeb" target="_blank" class="enlace-web">
                  🌐 Sitio web
                </a>
              </div>
            </div>
            <div class="acciones-club">
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

    .barra-navegacion {
      background: white;
      padding: 1rem 2rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .logo h2 {
      margin: 0;
      color: #333;
      font-size: 1.5rem;
    }

    .menu-navegacion {
      display: flex;
      gap: 1rem;
      align-items: center;
    }

    .boton-nav {
      padding: 0.5rem 1rem;
      border: none;
      background: transparent;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.9rem;
      transition: all 0.2s;
    }

    .boton-nav:hover {
      background: #f1f3f4;
    }

    .boton-nav.activo {
      background: #667eea;
      color: white;
    }

    .boton-salir {
      color: #e74c3c;
    }

    .boton-salir:hover {
      background: #fee;
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
      margin: 0;
    }

    .cargando {
      text-align: center;
      padding: 3rem;
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
      align-items: center;
      gap: 2rem;
      transition: transform 0.2s;
    }

    .tarjeta-club:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0,0,0,0.15);
    }

    .icono-club {
      font-size: 4rem;
      flex-shrink: 0;
    }

    .info-club {
      flex: 1;
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
      flex-shrink: 0;
    }

    .boton-unirse {
      background: #6c757d;
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 6px;
      font-size: 0.9rem;
      cursor: not-allowed;
      opacity: 0.6;
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
      .barra-navegacion {
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
      }

      .menu-navegacion {
        flex-wrap: wrap;
        justify-content: center;
      }

      .contenido-principal {
        padding: 1rem;
      }

      .tarjeta-club {
        flex-direction: column;
        text-align: center;
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

  navegarA(ruta: string) {
    this.enrutador.navigate([ruta]);
  }

  cerrarSesion() {
    this.servicioAuth.cerrarSesion();
  }
}
