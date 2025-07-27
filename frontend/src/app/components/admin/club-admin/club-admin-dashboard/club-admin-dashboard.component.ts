import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminBaseComponent } from '../../shared/admin-base.component';
import { AdminStatsCardComponent } from '../../shared/admin-stats-card/admin-stats-card.component';
import { AdminActionCardComponent } from '../../shared/admin-action-card/admin-action-card.component';

@Component({
  selector: 'app-club-admin-dashboard',
  standalone: true,
  imports: [CommonModule, AdminStatsCardComponent, AdminActionCardComponent],
  template: `
    <div class="club-admin-dashboard">
      <div class="dashboard-header">
        <h1>Panel de Administración del Club</h1>
        <p>Bienvenido, {{ usuario()?.nombre }}. Gestiona tu club de pádel.</p>
        <div class="club-info" *ngIf="datosClub()">
          <span class="club-name">{{ datosClub().nombre }}</span>
          <span class="club-members">{{ datosClub().totalMiembros }} miembros</span>
        </div>
      </div>

      <!-- Estadísticas del club -->
      <div class="stats-grid">
        <app-admin-stats-card
          titulo="Miembros Activos"
          [valor]="estadisticasClub().miembrosActivos"
          descripcion="Usuarios activos en tu club"
          tipo="primary"
          [icono]="iconos.miembros"
          [cambio]="{ valor: '+3 esta semana', positivo: true }">
        </app-admin-stats-card>

        <app-admin-stats-card
          titulo="Partidos del Mes"
          [valor]="estadisticasClub().partidosMes"
          descripcion="Partidos jugados este mes"
          tipo="success"
          [icono]="iconos.partidos"
          [cambio]="{ valor: '+15%', positivo: true }">
        </app-admin-stats-card>

        <app-admin-stats-card
          titulo="Torneos Activos"
          [valor]="estadisticasClub().torneosActivos"
          descripcion="Torneos en curso"
          tipo="info"
          [icono]="iconos.torneos"
          [cambio]="{ valor: '2 finalizando', positivo: false }">
        </app-admin-stats-card>

        <app-admin-stats-card
          titulo="Ranking Club"
          [valor]="'#' + estadisticasClub().rankingClub"
          descripcion="Posición nacional"
          tipo="warning"
          [icono]="iconos.ranking"
          [cambio]="{ valor: '+2 posiciones', positivo: true }">
        </app-admin-stats-card>
      </div>

      <!-- Acciones rápidas del club -->
      <div class="quick-actions">
        <h2>Gestión del Club</h2>
        <div class="actions-grid">
          <app-admin-action-card
            *ngFor="let accion of accionesRapidas"
            [titulo]="accion.titulo"
            [descripcion]="accion.descripcion"
            [icono]="accion.icono"
            [proximamente]="accion.proximamente || false"
            (cardClick)="ejecutarAccion(accion)">
          </app-admin-action-card>
        </div>
      </div>

      <!-- Actividad reciente del club -->
      <div class="recent-activity">
        <h2>Actividad Reciente del Club</h2>
        <div class="activity-list">
          <div 
            *ngFor="let actividad of actividadReciente" 
            class="activity-item">
            <div class="activity-icon">
              <div [innerHTML]="actividad.icono"></div>
            </div>
            <div class="activity-content">
              <p [innerHTML]="actividad.descripcion"></p>
              <span class="activity-time">{{ actividad.tiempo }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Rankings por grupo -->
      <div class="club-rankings">
        <h2>Rankings por Grupo</h2>
        <div class="rankings-grid">
          <div *ngFor="let grupo of rankingsPorGrupo" class="ranking-card">
            <div class="grupo-header">
              <span class="grupo-nombre">{{ grupo.nombre }}</span>
              <span class="grupo-total">{{ grupo.totalJugadores }} jugadores</span>
            </div>
            <div class="top-players">
              <div *ngFor="let jugador of grupo.topJugadores" class="player-item">
                <span class="position">#{{ jugador.posicion }}</span>
                <span class="name">{{ jugador.nombre }}</span>
                <span class="points">{{ jugador.puntos }} pts</span>
              </div>
            </div>
            <button class="ver-completo" (click)="verRankingCompleto(grupo.id)">
              Ver ranking completo
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .club-admin-dashboard {
      padding: 0;
    }

    .dashboard-header {
      margin-bottom: 32px;
    }

    .dashboard-header h1 {
      font-size: 32px;
      font-weight: 700;
      color: #1e293b;
      margin: 0 0 8px 0;
    }

    .dashboard-header p {
      font-size: 16px;
      color: #64748b;
      margin: 0 0 12px 0;
    }

    .club-info {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 12px 16px;
      background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
      border-radius: 12px;
      color: white;
      margin-top: 12px;
    }

    .club-name {
      font-weight: 600;
      font-size: 16px;
    }

    .club-members {
      font-size: 14px;
      opacity: 0.9;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 24px;
      margin-bottom: 40px;
    }

    .quick-actions {
      margin-bottom: 40px;
    }

    .quick-actions h2 {
      font-size: 24px;
      font-weight: 600;
      color: #1e293b;
      margin: 0 0 24px 0;
    }

    .actions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
    }

    .recent-activity {
      margin-bottom: 40px;
    }

    .recent-activity h2 {
      font-size: 24px;
      font-weight: 600;
      color: #1e293b;
      margin: 0 0 24px 0;
    }

    .activity-list {
      background: white;
      border-radius: 16px;
      border: 1px solid #e2e8f0;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .activity-item {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 20px 24px;
      border-bottom: 1px solid #f1f5f9;
    }

    .activity-item:last-child {
      border-bottom: none;
    }

    .activity-icon {
      width: 40px;
      height: 40px;
      background: #f8fafc;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .activity-content p {
      font-size: 14px;
      color: #1e293b;
      margin: 0 0 4px 0;
    }

    .activity-time {
      font-size: 12px;
      color: #64748b;
    }

    .club-rankings h2 {
      font-size: 24px;
      font-weight: 600;
      color: #1e293b;
      margin: 0 0 24px 0;
    }

    .rankings-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 20px;
    }

    .ranking-card {
      background: white;
      border-radius: 16px;
      border: 1px solid #e2e8f0;
      padding: 20px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .grupo-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      padding-bottom: 12px;
      border-bottom: 1px solid #f1f5f9;
    }

    .grupo-nombre {
      font-size: 18px;
      font-weight: 600;
      color: #1e293b;
    }

    .grupo-total {
      font-size: 14px;
      color: #64748b;
    }

    .top-players {
      margin-bottom: 16px;
    }

    .player-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 8px 0;
    }

    .position {
      font-weight: 600;
      color: var(--primary-color);
      min-width: 30px;
    }

    .name {
      flex: 1;
      font-size: 14px;
      color: #1e293b;
    }

    .points {
      font-size: 12px;
      color: #64748b;
      font-weight: 500;
    }

    .ver-completo {
      width: 100%;
      padding: 8px 16px;
      background: transparent;
      border: 1px solid var(--primary-color);
      color: var(--primary-color);
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .ver-completo:hover {
      background: var(--primary-color);
      color: white;
    }

    @media (max-width: 768px) {
      .dashboard-header h1 {
        font-size: 28px;
      }
      
      .club-info {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
      }
      
      .stats-grid {
        grid-template-columns: 1fr;
        gap: 16px;
      }
      
      .actions-grid {
        grid-template-columns: 1fr;
        gap: 16px;
      }
      
      .rankings-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ClubAdminDashboardComponent extends AdminBaseComponent {

  // Datos del club
  datosClub = signal({
    nombre: 'Club Deportivo Norte',
    totalMiembros: 127
  });

  // Estadísticas del club
  estadisticasClub = signal({
    miembrosActivos: 98,
    partidosMes: 145,
    torneosActivos: 3,
    rankingClub: 12
  });

  // Iconos SVG
  iconos = {
    miembros: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>`,
    partidos: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M12 6v6l4 2"></path>
    </svg>`,
    torneos: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
      <path d="M4 22h16"></path>
      <path d="M10 14.66V17c0 .55.47.98.97 1.21C12.04 18.75 13 19.44 13 20.25V22"></path>
      <path d="M14 14.66V17c0 .55-.47.98-.97 1.21C11.96 18.75 11 19.44 11 20.25V22"></path>
    </svg>`,
    ranking: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"></polyline>
    </svg>`
  };

  // Acciones rápidas del club
  accionesRapidas = [
    {
      id: 'gestionar-miembros',
      titulo: 'Gestionar Miembros',
      descripcion: 'Administrar usuarios del club',
      icono: this.iconos.miembros,
      ruta: '/admin/club/members'
    },
    {
      id: 'crear-torneo',
      titulo: 'Crear Torneo',
      descripcion: 'Organizar torneos internos',
      icono: this.iconos.torneos,
      ruta: '/admin/club/tournaments'
    },
    {
      id: 'configuracion-club',
      titulo: 'Configuración Club',
      descripcion: 'Ajustes y personalización',
      icono: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
      </svg>`,
      ruta: '/admin/club/settings'
    },
    {
      id: 'estadisticas',
      titulo: 'Estadísticas Detalladas',
      descripcion: 'Análisis del rendimiento del club',
      icono: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="18" y1="20" x2="18" y2="10"></line>
        <line x1="12" y1="20" x2="12" y2="4"></line>
        <line x1="6" y1="20" x2="6" y2="14"></line>
      </svg>`,
      proximamente: true
    }
  ];

  // Actividad reciente del club
  actividadReciente = [
    {
      descripcion: '<strong>Nuevo miembro:</strong> Juan Pérez se registró en el torneo Grupo B',
      tiempo: 'Hace 1 hora',
      icono: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="16,12 12,8 8,12"></polyline>
        <line x1="12" y1="16" x2="12" y2="8"></line>
      </svg>`
    },
    {
      descripcion: '<strong>Partido completado:</strong> Ana & Luis vs Mario & Sara - 6/4, 7/5',
      tiempo: 'Hace 2 horas',
      icono: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2196F3" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M12 6v6l4 2"></path>
      </svg>`
    },
    {
      descripción: '<strong>Nueva solicitud:</strong> Pedro García solicita membresía',
      tiempo: 'Hace 3 horas',
      icono: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF9800" stroke-width="2">
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>`
    }
  ];

  // Rankings por grupo
  rankingsPorGrupo = [
    {
      id: 'grupo-a',
      nombre: '🅰️ Grupo A',
      totalJugadores: 8,
      topJugadores: [
        { posicion: 1, nombre: 'Carlos M.', puntos: 124 },
        { posicion: 2, nombre: 'Roberto L.', puntos: 119 },
        { posicion: 3, nombre: 'Miguel A.', puntos: 115 }
      ]
    },
    {
      id: 'grupo-b',
      nombre: '🅱️ Grupo B',
      totalJugadores: 23,
      topJugadores: [
        { posicion: 1, nombre: 'Ana L.', puntos: 98 },
        { posicion: 2, nombre: 'Carmen S.', puntos: 95 },
        { posicion: 3, nombre: 'Daniel R.', puntos: 92 }
      ]
    },
    {
      id: 'grupo-c',
      nombre: '🆎 Grupo C',
      totalJugadores: 35,
      topJugadores: [
        { posicion: 1, nombre: 'Luis R.', puntos: 87 },
        { posicion: 2, nombre: 'Elena M.', puntos: 84 },
        { posicion: 3, nombre: 'Jorge P.', puntos: 81 }
      ]
    }
  ];

  protected onInit(): void {
    // VALIDACIÓN DE SEGURIDAD: Verificar que es admin de club Y que puede gestionar este club
    if (!this.esAdminClub()) {
      this.navegarA('/admin/system/dashboard');
      return;
    }

    // Doble validación: verificar que puede gestionar SU club específico
    const clubId = this.obtenerIdClubActual();
    if (!clubId || !this.puedeGestionarClub(clubId)) {
      console.error('🚨 Intento de acceso no autorizado a dashboard de club');
      this.navegarA('/admin/system/dashboard');
      return;
    }
    
    this.cargarDatosClub();
  }

  protected onDestroy(): void {
    // Cleanup específico del componente
  }

  private cargarDatosClub(): void {
    this.establecerCarga(true);
    
    // Simular carga de datos
    setTimeout(() => {
      // Aquí iría la llamada real al servicio
      this.establecerCarga(false);
    }, 1000);
  }

  ejecutarAccion(accion: any): void {
    if (accion.proximamente) return;
    
    if (accion.ruta) {
      this.navegarA(accion.ruta);
    } else {
      console.log('Ejecutando acción:', accion.id);
    }
  }

  verRankingCompleto(grupoId: string): void {
    this.navegarA(`/admin/club/rankings?grupo=${grupoId}`);
  }
}
