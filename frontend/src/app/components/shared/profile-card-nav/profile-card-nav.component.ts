import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export type TabOption = 'stats' | 'history' | 'achievements' | 'settings';

@Component({
  selector: 'app-profile-card-nav',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card-navigation">
      <div class="cards-grid">
        <div
          *ngFor="let option of navigationOptions"
          [class]="'nav-card ' + (activeTab === option.id ? 'active' : '')"
          (click)="selectTab(option.id)"
        >
          <div class="card-header">
            <div class="card-icon">{{ option.icon }}</div>
            <div class="card-badge" *ngIf="option.badge">{{ option.badge }}</div>
          </div>
          
          <div class="card-content">
            <h3 class="card-title">{{ option.label }}</h3>
            <p class="card-description">{{ option.description }}</p>
          </div>
          
          <div class="card-footer" *ngIf="option.stats">
            <div class="card-stat">
              <span class="stat-value">{{ option.stats.value }}</span>
              <span class="stat-label">{{ option.stats.label }}</span>
            </div>
          </div>
          
          <div class="card-glow" *ngIf="activeTab === option.id"></div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card-navigation {
      margin: 2rem 0;
    }

    .cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      
      @media (max-width: 768px) {
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
      }

      @media (max-width: 480px) {
        grid-template-columns: 1fr;
        gap: 0.75rem;
      }
    }

    .nav-card {
      position: relative;
      background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
      border: 2px solid #e2e8f0;
      border-radius: 20px;
      padding: 1.5rem;
      cursor: pointer;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      overflow: hidden;
      min-height: 160px;
      display: flex;
      flex-direction: column;

      @media (max-width: 768px) {
        padding: 1.25rem;
        min-height: 140px;
      }

      &:hover:not(.active) {
        transform: translateY(-8px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        border-color: #cbd5e1;

        .card-icon {
          transform: scale(1.1) rotate(5deg);
        }
      }

      &.active {
        background: linear-gradient(145deg, #4f46e5 0%, #7c3aed 100%);
        border-color: #4f46e5;
        color: white;
        transform: translateY(-12px);
        box-shadow: 0 25px 50px rgba(79, 70, 229, 0.3);

        .card-title,
        .card-description {
          color: white;
        }

        .card-description {
          opacity: 0.9;
        }

        .stat-value {
          color: white;
        }

        .stat-label {
          color: rgba(255, 255, 255, 0.8);
        }

        .card-icon {
          transform: scale(1.2);
          filter: brightness(1.2);
        }
      }

      &:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.3);
      }
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1rem;
    }

    .card-icon {
      font-size: 2.5rem;
      transition: all 0.3s ease;
      
      @media (max-width: 768px) {
        font-size: 2rem;
      }
    }

    .card-badge {
      background: #ef4444;
      color: white;
      font-size: 0.7rem;
      font-weight: 700;
      padding: 0.25rem 0.5rem;
      border-radius: 12px;
      min-width: 20px;
      text-align: center;
    }

    .card-content {
      flex: 1;
      margin-bottom: 1rem;
    }

    .card-title {
      font-size: 1.125rem;
      font-weight: 700;
      color: #1e293b;
      margin: 0 0 0.5rem 0;
      
      @media (max-width: 768px) {
        font-size: 1rem;
      }
    }

    .card-description {
      font-size: 0.875rem;
      color: #64748b;
      margin: 0;
      line-height: 1.4;
      
      @media (max-width: 768px) {
        font-size: 0.8rem;
      }
    }

    .card-footer {
      margin-top: auto;
    }

    .card-stat {
      text-align: center;
      padding: 0.75rem;
      background: rgba(79, 70, 229, 0.05);
      border-radius: 12px;
      border: 1px solid rgba(79, 70, 229, 0.1);
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

    .card-glow {
      position: absolute;
      inset: -2px;
      background: linear-gradient(45deg, #4f46e5, #7c3aed, #4f46e5);
      border-radius: 20px;
      z-index: -1;
      opacity: 0.3;
      filter: blur(8px);
      animation: glow 2s ease-in-out infinite alternate;
    }

    @keyframes glow {
      from {
        opacity: 0.3;
        filter: blur(8px);
      }
      to {
        opacity: 0.5;
        filter: blur(12px);
      }
    }
  `]
})
export class ProfileCardNavComponent {
  @Input() activeTab: TabOption = 'stats';
  @Input() matchCount: number = 0;
  @Input() winRate: number = 0;
  @Input() achievementCount: number = 0;
  
  @Output() tabChanged = new EventEmitter<TabOption>();

  get navigationOptions() {
    return [
      {
        id: 'stats' as TabOption,
        icon: '📊',
        label: 'Estadísticas',
        description: 'Rendimiento, rankings y progreso actual',
        stats: {
          value: `${this.winRate}%`,
          label: 'Win Rate'
        }
      },
      {
        id: 'history' as TabOption,
        icon: '📋',
        label: 'Historial',
        description: 'Todos tus partidos y resultados',
        stats: {
          value: this.matchCount,
          label: 'Partidos'
        }
      },
      {
        id: 'achievements' as TabOption,
        icon: '🏆',
        label: 'Logros',
        description: 'Medallas, trofeos y reconocimientos',
        badge: this.achievementCount > 0 ? this.achievementCount.toString() : undefined,
        stats: {
          value: this.achievementCount,
          label: 'Desbloqueados'
        }
      },
      {
        id: 'settings' as TabOption,
        icon: '⚙️',
        label: 'Configuración',
        description: 'Personaliza tu perfil y preferencias'
      }
    ];
  }

  selectTab(tabId: TabOption): void {
    this.tabChanged.emit(tabId);
  }
}
