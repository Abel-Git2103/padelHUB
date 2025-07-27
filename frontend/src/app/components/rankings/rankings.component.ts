import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ServicioAutenticacion } from '../../services/auth.service';
import { Usuario } from '../../models/user.model';
import { obtenerInfoRango } from '../../models/rango.model';

@Component({
  selector: 'app-rankings',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="contenedor-rankings">
      <!-- Contenido principal -->
      <main class="contenido-principal">
        <div class="encabezado">
          <h1>Rankings 🏆</h1>
          <p>Consulta las clasificaciones y estadísticas</p>
        </div>

        <!-- Filtros de ranking -->
        <div class="filtros-ranking">
          <button 
            class="boton-filtro"
            [class.activo]="tipoRankingActivo() === 'general'"
            (click)="cambiarTipoRanking('general')"
          >
            🌍 Ranking General
          </button>
          <button 
            class="boton-filtro"
            [class.activo]="tipoRankingActivo() === 'club'"
            (click)="cambiarTipoRanking('club')"
          >
            🏟️ Ranking por Club
          </button>
          <button 
            class="boton-filtro"
            [class.activo]="tipoRankingActivo() === 'rango'"
            (click)="cambiarTipoRanking('rango')"
          >
            🥇 Ranking por Rango
          </button>
        </div>

        <!-- Tu posición actual -->
        <div class="tu-posicion" *ngIf="usuario()">
          <h2>Tu Posición Actual</h2>
          <div class="tarjeta-posicion">
            <div class="posicion-numero">
              <span class="hashtag">#</span>
              <span class="numero">-</span>
            </div>
            <div class="info-jugador">
              <div class="avatar">
                {{ obtenerIniciales(usuario()!.nombre) }}
              </div>
              <div class="detalles">
                <h3>{{ usuario()?.nombre }}</h3>
                <div class="rango">
                  <span class="etiqueta-rango" [style.background-color]="obtenerInfoRango(usuario()!.rangoActual).color">
                    {{ obtenerInfoRango(usuario()!.rangoActual).icono }} {{ obtenerInfoRango(usuario()!.rangoActual).nombre }}
                  </span>
                </div>
              </div>
            </div>
            <div class="estadisticas">
              <div class="stat">
                <div class="valor">0</div>
                <div class="etiqueta">Puntos</div>
              </div>
              <div class="stat">
                <div class="valor">0</div>
                <div class="etiqueta">Partidos</div>
              </div>
              <div class="stat">
                <div class="valor">0%</div>
                <div class="etiqueta">Victorias</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tabla de ranking -->
        <div class="tabla-ranking">
          <h2>
            <span *ngIf="tipoRankingActivo() === 'general'">🌍 Ranking General</span>
            <span *ngIf="tipoRankingActivo() === 'club'">🏟️ Ranking por Club</span>
            <span *ngIf="tipoRankingActivo() === 'rango'">🥇 Ranking por Rango</span>
          </h2>

          <!-- Contenido de prueba - próximamente se conectará con datos reales -->
          <div class="sin-datos">
            <div class="icono-vacio">📊</div>
            <h3>Rankings en desarrollo</h3>
            <p>Los rankings estarán disponibles cuando tengamos datos de partidos y torneos.</p>
            <div class="caracteristicas-proximamente">
              <div class="caracteristica">
                <span class="icono">⚽</span>
                <span>Rankings basados en resultados de partidos</span>
              </div>
              <div class="caracteristica">
                <span class="icono">🏆</span>
                <span>Puntuación por torneos ganados</span>
              </div>
              <div class="caracteristica">
                <span class="icono">📈</span>
                <span>Actualizaciones en tiempo real</span>
              </div>
              <div class="caracteristica">
                <span class="icono">🏟️</span>
                <span>Rankings internos por club</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Información sobre el sistema de puntuación -->
        <div class="info-puntuacion">
          <h2>Sistema de Puntuación</h2>
          <div class="grid-puntuacion">
            <div class="tarjeta-puntuacion">
              <div class="icono">⚽</div>
              <h3>Partidos</h3>
              <ul>
                <li>Victoria: +10 puntos</li>
                <li>Derrota: +2 puntos (participación)</li>
                <li>Walkover: +5 puntos</li>
              </ul>
            </div>
            <div class="tarjeta-puntuacion">
              <div class="icono">🏆</div>
              <h3>Torneos</h3>
              <ul>
                <li>Campeón: +50 puntos</li>
                <li>Finalista: +30 puntos</li>
                <li>Semifinalista: +20 puntos</li>
                <li>Participación: +10 puntos</li>
              </ul>
            </div>
            <div class="tarjeta-puntuacion">
              <div class="icono">🥇</div>
              <h3>Bonificaciones</h3>
              <ul>
                <li>Racha de 5 victorias: +10 puntos</li>
                <li>Ascenso de rango: +25 puntos</li>
                <li>Actividad mensual: +5 puntos</li>
              </ul>
            </div>
            <div class="tarjeta-puntuacion">
              <div class="icono">📅</div>
              <h3>Temporadas</h3>
              <ul>
                <li>Los puntos se resetean cada temporada</li>
                <li>Temporada actual: 2025</li>
                <li>Próximo reset: Enero 2026</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .contenedor-rankings {
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
      margin: 0;
    }

    .filtros-ranking {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-bottom: 2rem;
      flex-wrap: wrap;
    }

    .boton-filtro {
      padding: 0.75rem 1.5rem;
      border: 2px solid #e1e5e9;
      background: white;
      border-radius: 25px;
      cursor: pointer;
      transition: all 0.3s;
      font-size: 0.9rem;
    }

    .boton-filtro:hover {
      border-color: #667eea;
    }

    .boton-filtro.activo {
      background: #667eea;
      color: white;
      border-color: #667eea;
    }

    .tu-posicion {
      margin-bottom: 3rem;
    }

    .tu-posicion h2 {
      margin: 0 0 1rem 0;
      color: #333;
      text-align: center;
    }

    .tarjeta-posicion {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      display: flex;
      align-items: center;
      gap: 2rem;
    }

    .posicion-numero {
      font-size: 3rem;
      font-weight: bold;
      color: #667eea;
      display: flex;
      align-items: baseline;
    }

    .hashtag {
      font-size: 1.5rem;
      margin-right: 0.25rem;
    }

    .info-jugador {
      display: flex;
      align-items: center;
      gap: 1rem;
      flex: 1;
    }

    .avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 1.2rem;
      font-weight: bold;
    }

    .detalles h3 {
      margin: 0 0 0.5rem 0;
      color: #333;
      font-size: 1.25rem;
    }

    .etiqueta-rango {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      color: white;
      font-size: 0.8rem;
      font-weight: 500;
    }

    .estadisticas {
      display: flex;
      gap: 2rem;
    }

    .stat {
      text-align: center;
    }

    .stat .valor {
      font-size: 1.5rem;
      font-weight: bold;
      color: #333;
      margin-bottom: 0.25rem;
    }

    .stat .etiqueta {
      color: #666;
      font-size: 0.8rem;
    }

    .tabla-ranking {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      margin-bottom: 3rem;
    }

    .tabla-ranking h2 {
      margin: 0 0 2rem 0;
      color: #333;
      text-align: center;
      font-size: 1.5rem;
    }

    .sin-datos {
      text-align: center;
      padding: 3rem;
    }

    .icono-vacio {
      font-size: 4rem;
      margin-bottom: 1rem;
    }

    .sin-datos h3 {
      margin: 0 0 1rem 0;
      color: #333;
    }

    .sin-datos p {
      margin: 0 0 2rem 0;
      color: #666;
      font-size: 1.1rem;
    }

    .caracteristicas-proximamente {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
      max-width: 800px;
      margin: 0 auto;
    }

    .caracteristica {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 1rem;
      background: #f8f9fa;
      border-radius: 8px;
      text-align: left;
    }

    .caracteristica .icono {
      font-size: 1.5rem;
    }

    .info-puntuacion {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }

    .info-puntuacion h2 {
      margin: 0 0 2rem 0;
      color: #333;
      text-align: center;
      font-size: 1.5rem;
    }

    .grid-puntuacion {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
    }

    .tarjeta-puntuacion {
      padding: 1.5rem;
      background: #f8f9fa;
      border-radius: 8px;
      text-align: center;
    }

    .tarjeta-puntuacion .icono {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    .tarjeta-puntuacion h3 {
      margin: 0 0 1rem 0;
      color: #333;
      font-size: 1.1rem;
    }

    .tarjeta-puntuacion ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .tarjeta-puntuacion li {
      padding: 0.25rem 0;
      color: #666;
      font-size: 0.9rem;
    }

    @media (max-width: 768px) {
      .contenido-principal {
        padding: 1rem;
      }

      .tarjeta-posicion {
        flex-direction: column;
        text-align: center;
      }

      .estadisticas {
        justify-content: center;
      }

      .caracteristicas-proximamente {
        grid-template-columns: 1fr;
      }

      .grid-puntuacion {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ComponenteRankings implements OnInit {
  usuario = signal<Usuario | null>(null);
  tipoRankingActivo = signal<'general' | 'club' | 'rango'>('general');
  obtenerInfoRango = obtenerInfoRango;

  constructor(
    private servicioAuth: ServicioAutenticacion,
    private enrutador: Router
  ) {}

  ngOnInit() {
    this.usuario.set(this.servicioAuth.usuarioActual());
    
    this.servicioAuth.usuarioActual$.subscribe(usuario => {
      this.usuario.set(usuario);
    });
  }

  obtenerIniciales(nombre: string): string {
    return nombre
      .split(' ')
      .map(palabra => palabra.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }

  cambiarTipoRanking(tipo: 'general' | 'club' | 'rango') {
    this.tipoRankingActivo.set(tipo);
  }

  navegarA(ruta: string) {
    this.enrutador.navigate([ruta]);
  }

  cerrarSesion() {
    this.servicioAuth.cerrarSesion();
  }
}
