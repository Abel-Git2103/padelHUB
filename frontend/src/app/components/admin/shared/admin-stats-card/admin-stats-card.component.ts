import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIconComponent, IconType } from '../../../shared/svg-icon/svg-icon.component';

export interface EstadisticaCard {
  titulo: string;
  valor: string | number;
  descripcion: string;
  icono: string;
  tipo: 'success' | 'warning' | 'info' | 'primary';
  cambio?: {
    valor: string;
    positivo: boolean;
  };
}

@Component({
  selector: 'app-admin-stats-card',
  standalone: true,
  imports: [CommonModule, SvgIconComponent],
  template: `
    <div class="stat-card" [class]="tipo" (click)="onClick()">
      <div class="stat-icon" [class]="tipo">
        <app-svg-icon 
          *ngIf="iconoTipo; else iconoTexto"
          [type]="iconoTipo" 
          [size]="24" 
          color="currentColor">
        </app-svg-icon>
        <ng-template #iconoTexto>
          <div [innerHTML]="icono"></div>
        </ng-template>
      </div>
      <div class="stat-content">
        <h3>{{ valor }}</h3>
        <p>{{ titulo }}</p>
        <span class="stat-description">{{ descripcion }}</span>
        <span 
          *ngIf="cambio" 
          class="stat-change"
          [class.positive]="cambio.positivo"
          [class.negative]="!cambio.positivo">
          {{ cambio.valor }}
        </span>
      </div>
    </div>
  `,
  styles: [`
    .stat-card {
      background: white;
      border-radius: 16px;
      padding: 24px;
      border: 1px solid #e2e8f0;
      display: flex;
      align-items: center;
      gap: 20px;
      transition: all 0.3s ease;
      cursor: pointer;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .stat-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      border-color: var(--primary-color, #2E7D32);
    }

    .stat-icon {
      width: 60px;
      height: 60px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .stat-icon.primary {
      background: linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%);
      color: white;
    }

    .stat-icon.success {
      background: linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%);
      color: white;
    }

    .stat-icon.warning {
      background: linear-gradient(135deg, #FF9800 0%, #FFB74D 100%);
      color: white;
    }

    .stat-icon.info {
      background: linear-gradient(135deg, #2196F3 0%, #42A5F5 100%);
      color: white;
    }

    .stat-content {
      flex: 1;
    }

    .stat-content h3 {
      font-size: 28px;
      font-weight: 700;
      color: #1e293b;
      margin: 0 0 4px 0;
      line-height: 1.2;
    }

    .stat-content p {
      font-size: 16px;
      font-weight: 600;
      color: #1e293b;
      margin: 0 0 4px 0;
    }

    .stat-description {
      font-size: 14px;
      color: #64748b;
      display: block;
      margin-bottom: 8px;
    }

    .stat-change {
      font-size: 12px;
      font-weight: 600;
      padding: 4px 8px;
      border-radius: 12px;
      display: inline-block;
    }

    .stat-change.positive {
      background: #dcfce7;
      color: #166534;
    }

    .stat-change.negative {
      background: #fee2e2;
      color: #dc2626;
    }

    @media (max-width: 768px) {
      .stat-card {
        padding: 16px;
        flex-direction: column;
        text-align: center;
        gap: 16px;
      }
      
      .stat-icon {
        width: 56px;
        height: 56px;
      }
      
      .stat-content h3 {
        font-size: 24px;
      }
    }
  `]
})
export class AdminStatsCardComponent {
  @Input() titulo!: string;
  @Input() valor!: string | number;
  @Input() descripcion!: string;
  @Input() icono!: string;
  @Input() iconoTipo?: IconType; // Nueva propiedad para usar iconos tipados
  @Input() tipo: 'success' | 'warning' | 'info' | 'primary' = 'primary';
  @Input() cambio?: { valor: string; positivo: boolean };
  @Input() clickeable: boolean = false;
  
  @Output() cardClick = new EventEmitter<void>();

  onClick(): void {
    if (this.clickeable) {
      this.cardClick.emit();
    }
  }
}
