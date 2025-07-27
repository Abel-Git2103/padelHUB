import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminBaseComponent } from '../../shared/admin-base.component';
import { AdminStatsCardComponent } from '../../shared/admin-stats-card/admin-stats-card.component';
import { AdminActionCardComponent } from '../../shared/admin-action-card/admin-action-card.component';
import { SvgIconComponent } from '../../../shared/svg-icon/svg-icon.component';

@Component({
  selector: 'app-system-admin-dashboard',
  standalone: true,
  imports: [CommonModule, AdminStatsCardComponent, AdminActionCardComponent, SvgIconComponent],
  template: `
    <div class="system-admin-dashboard">
      <div class="dashboard-header">
        <h1>Panel de Administración del Sistema</h1>
        <p>Bienvenido, {{ usuario()?.nombre }}. Control global de la plataforma PadelHUB.</p>
      </div>

      <!-- Estadísticas globales -->
      <div class="stats-grid">
        <app-admin-stats-card
          titulo="Total de Clubes"
          [valor]="estadisticasGlobales().totalClubes"
          descripcion="Clubes registrados en el sistema"
          tipo="primary"
          iconoTipo="clubes"
          [cambio]="{ valor: '+5 este mes', positivo: true }">
        </app-admin-stats-card>

        <app-admin-stats-card
          titulo="Usuarios Activos"
          [valor]="estadisticasGlobales().usuariosActivos"
          descripcion="Usuarios activos en la plataforma"
          tipo="success"
          iconoTipo="usuarios"
          [cambio]="{ valor: '+12% este mes', positivo: true }">
        </app-admin-stats-card>

        <app-admin-stats-card
          titulo="Ingresos Mensuales"
          [valor]="estadisticasGlobales().ingresosMensuales"
          descripcion="Ingresos por suscripciones"
          tipo="info"
          iconoTipo="ingresos"
          [cambio]="{ valor: '+8.5%', positivo: true }">
        </app-admin-stats-card>

        <app-admin-stats-card
          titulo="Partidos Jugados"
          [valor]="estadisticasGlobales().partidosJugados"
          descripcion="Total este mes"
          tipo="warning"
          iconoTipo="partidos"
          [cambio]="{ valor: '+23%', positivo: true }">
        </app-admin-stats-card>
      </div>

      <!-- Acciones rápidas para admin sistema -->
      <div class="quick-actions">
        <h2>Gestión del Sistema</h2>
        <div class="actions-grid">
          <app-admin-action-card
            *ngFor="let accion of accionesRapidas"
            [titulo]="accion.titulo"
            [descripcion]="accion.descripcion"
            [iconoTipo]="accion.iconoTipo"
            [icono]="accion.icono"
            [proximamente]="accion.proximamente || false"
            (cardClick)="ejecutarAccion(accion)">
          </app-admin-action-card>
        </div>
      </div>

      <!-- Actividad reciente global -->
      <div class="recent-activity">
        <h2>Actividad Reciente Global</h2>
        <div class="activity-list">
          <div 
            *ngFor="let actividad of actividadReciente" 
            class="activity-item">
            <div class="activity-icon">
              <app-svg-icon 
                [type]="actividad.iconoTipo" 
                [size]="16" 
                [color]="actividad.color">
              </app-svg-icon>
            </div>
            <div class="activity-content">
              <p [innerHTML]="actividad.descripcion"></p>
              <span class="activity-time">{{ actividad.tiempo }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .system-admin-dashboard {
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
      margin: 0;
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

    @media (max-width: 768px) {
      .dashboard-header h1 {
        font-size: 28px;
      }
      
      .stats-grid {
        grid-template-columns: 1fr;
        gap: 16px;
      }
      
      .actions-grid {
        grid-template-columns: 1fr;
        gap: 16px;
      }
    }
  `]
})
export class SystemAdminDashboardComponent extends AdminBaseComponent {

  // Datos para estadísticas globales
  estadisticasGlobales = signal({
    totalClubes: 127,
    usuariosActivos: 2543,
    ingresosMensuales: '€25,400',
    partidosJugados: 1847
  });

  // Iconos SVG
  iconos = {
    clubes: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>`,
    usuarios: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>`,
    ingresos: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <line x1="12" y1="1" x2="12" y2="23"></line>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
    </svg>`,
    partidos: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M12 6v6l4 2"></path>
    </svg>`
  };

  // Acciones rápidas para admin sistema
  accionesRapidas = [
    {
      id: 'gestionar-clubes',
      titulo: 'Gestionar Clubes',
      descripcion: 'Control global de todos los clubes',
      icono: this.iconos.clubes,
      iconoTipo: 'clubes' as const,
      ruta: '/admin/system/clubs'
    },
    {
      id: 'usuarios-globales',
      titulo: 'Usuarios Globales',
      descripcion: 'Gestión de todos los usuarios',
      icono: this.iconos.usuarios,
      iconoTipo: 'usuarios' as const,
      ruta: '/admin/system/users'
    },
    {
      id: 'analytics',
      titulo: 'Analytics Avanzado',
      descripcion: 'Estadísticas y métricas de la plataforma',
      icono: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"></polyline>
      </svg>`,
      iconoTipo: 'analytics' as const,
      ruta: '/admin/system/analytics'
    },
    {
      id: 'configuracion-sistema',
      titulo: 'Configuración Sistema',
      descripcion: 'Ajustes globales de la plataforma',
      icono: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
      </svg>`,
      iconoTipo: 'configuracion' as const,
      ruta: '/admin/system/settings'
    },
    {
      id: 'rankings-globales',
      titulo: 'Rankings Globales',
      descripcion: 'Gestión de rankings nacionales',
      icono: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"></polyline>
      </svg>`,
      iconoTipo: 'rankings' as const,
      ruta: '/admin/system/rankings'
    },
    {
      id: 'finanzas',
      titulo: 'Gestión Financiera',
      descripcion: 'Suscripciones y pagos',
      icono: this.iconos.ingresos,
      iconoTipo: 'ingresos' as const,
      proximamente: true
    }
  ];

  // Actividad reciente global
  actividadReciente = [
    {
      descripcion: '<strong>Nuevo club registrado:</strong> Club Deportivo Madrid Norte',
      tiempo: 'Hace 2 horas',
      icono: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="16,12 12,8 8,12"></polyline>
        <line x1="12" y1="16" x2="12" y2="8"></line>
      </svg>`,
      iconoTipo: 'actividad' as const,
      color: '#4CAF50'
    },
    {
      descripcion: '<strong>Suscripción renovada:</strong> Club Padel Elite Valencia',
      tiempo: 'Hace 4 horas',
      icono: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2196F3" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
      </svg>`,
      iconoTipo: 'suscripcion' as const,
      color: '#2196F3'
    },
    {
      descripción: '<strong>Usuario suspendido:</strong> Comportamiento inapropiado reportado',
      descripcion: '<strong>Usuario suspendido:</strong> Comportamiento inapropiado reportado',
      tiempo: 'Hace 6 horas',
      icono: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF9800" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
      </svg>`,
      iconoTipo: 'suspension' as const,
      color: '#FF9800'
    }
  ];

  protected onInit(): void {
    // Verificar permisos usando AdminBaseComponent
    if (!this.esAdminSistema()) {
      this.navegarA('/admin/club/dashboard');
      return;
    }
    
    this.cargarEstadisticasGlobales();
  }

  protected onDestroy(): void {
    // Cleanup específico del componente
  }

  private cargarEstadisticasGlobales(): void {
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
}
