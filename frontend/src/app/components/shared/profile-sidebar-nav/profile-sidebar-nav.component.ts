import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export type TabOption = 'stats' | 'history' | 'achievements' | 'settings';

@Component({
  selector: 'app-profile-sidebar-nav',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="sidebar-navigation">
      <div class="nav-header">
        <h3>{{ playerName }}</h3>
        <p>Perfil del jugador</p>
      </div>
      
      <nav class="nav-menu">
        <button
          *ngFor="let option of navigationOptions"
          [class]="'nav-item ' + (activeTab === option.id ? 'active' : '')"
          (click)="selectTab(option.id)"
        >
          <div class="nav-icon">{{ option.icon }}</div>
          <div class="nav-content">
            <span class="nav-label">{{ option.label }}</span>
            <span class="nav-description">{{ option.description }}</span>
          </div>
          <div class="nav-indicator" *ngIf="activeTab === option.id"></div>
        </button>
      </nav>
      
      <div class="nav-footer">
        <div class="player-stats">
          <div class="stat-item">
            <span class="stat-value">{{ matchCount }}</span>
            <span class="stat-label">Partidos</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ winRate }}%</span>
            <span class="stat-label">Win Rate</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .sidebar-navigation {
      width: 280px;
      background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
      border-radius: 20px;
      padding: 1.5rem;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
      border: 1px solid #e2e8f0;
      height: fit-content;
      position: sticky;
      top: 1rem;

      @media (max-width: 1024px) {
        width: 100%;
        position: static;
        margin-bottom: 1.5rem;
      }
    }

    .nav-header {
      text-align: center;
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #e2e8f0;

      h3 {
        margin: 0 0 0.5rem 0;
        font-size: 1.25rem;
        font-weight: 700;
        color: #1e293b;
      }

      p {
        margin: 0;
        font-size: 0.875rem;
        color: #64748b;
      }
    }

    .nav-menu {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-bottom: 2rem;

      @media (max-width: 1024px) {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 0.75rem;
      }

      @media (max-width: 640px) {
        grid-template-columns: 1fr;
      }
    }

    .nav-item {
      position: relative;
      background: transparent;
      border: none;
      border-radius: 12px;
      padding: 1rem;
      text-align: left;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      display: flex;
      align-items: center;
      gap: 0.75rem;
      overflow: hidden;

      &:hover:not(.active) {
        background: rgba(79, 70, 229, 0.05);
        transform: translateX(4px);
      }

      &.active {
        background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
        color: white;
        transform: translateX(8px);
        box-shadow: 0 4px 15px rgba(79, 70, 229, 0.3);

        .nav-content {
          .nav-label {
            color: white;
          }
          .nav-description {
            color: rgba(255, 255, 255, 0.8);
          }
        }
      }

      &:focus {
        outline: none;
        box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.3);
      }
    }

    .nav-icon {
      font-size: 1.5rem;
      flex-shrink: 0;
    }

    .nav-content {
      flex: 1;
      min-width: 0;
    }

    .nav-label {
      display: block;
      font-weight: 600;
      font-size: 0.875rem;
      color: #1e293b;
      margin-bottom: 0.25rem;
    }

    .nav-description {
      display: block;
      font-size: 0.75rem;
      color: #64748b;
      line-height: 1.2;
    }

    .nav-indicator {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 3px;
      height: 20px;
      background: rgba(255, 255, 255, 0.8);
      border-radius: 2px;
    }

    .nav-footer {
      padding-top: 1rem;
      border-top: 1px solid #e2e8f0;
    }

    .player-stats {
      display: flex;
      justify-content: space-around;
      gap: 1rem;
    }

    .stat-item {
      text-align: center;
      flex: 1;
    }

    .stat-value {
      display: block;
      font-size: 1.25rem;
      font-weight: 700;
      color: #4f46e5;
      margin-bottom: 0.25rem;
    }

    .stat-label {
      display: block;
      font-size: 0.75rem;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
  `]
})
export class ProfileSidebarNavComponent {
  @Input() activeTab: TabOption = 'stats';
  @Input() playerName: string = '';
  @Input() matchCount: number = 0;
  @Input() winRate: number = 0;
  
  @Output() tabChanged = new EventEmitter<TabOption>();

  navigationOptions = [
    {
      id: 'stats' as TabOption,
      icon: '📊',
      label: 'Estadísticas',
      description: 'Rendimiento y progreso'
    },
    {
      id: 'history' as TabOption,
      icon: '📋',
      label: 'Historial',
      description: 'Partidos jugados'
    },
    {
      id: 'achievements' as TabOption,
      icon: '🏆',
      label: 'Logros',
      description: 'Medallas y trofeos'
    },
    {
      id: 'settings' as TabOption,
      icon: '⚙️',
      label: 'Configuración',
      description: 'Ajustes del perfil'
    }
  ];

  selectTab(tabId: TabOption): void {
    this.tabChanged.emit(tabId);
  }
}
