import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface AccionRapida {
  id: string;
  titulo: string;
  descripcion: string;
  icono: string;
  ruta?: string;
  proximamente?: boolean;
  clickeable?: boolean;
}

@Component({
  selector: 'app-admin-action-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="action-card" 
      [class.coming-soon]="proximamente"
      [class.clickeable]="clickeable && !proximamente"
      (click)="onClick()">
      
      <div class="action-icon">
        <div [innerHTML]="icono"></div>
      </div>
      
      <h3>{{ titulo }}</h3>
      <p>{{ descripcion }}</p>
      
      <span *ngIf="proximamente" class="coming-soon-badge">
        Próximamente
      </span>
    </div>
  `,
  styles: [`
    .action-card {
      position: relative;
      background: white;
      border-radius: 16px;
      padding: 24px;
      border: 1px solid #e2e8f0;
      transition: all 0.3s ease;
      text-align: center;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .action-card.clickeable {
      cursor: pointer;
    }

    .action-card.clickeable:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      border-color: var(--primary-color);
    }

    .action-card.coming-soon {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .action-card.coming-soon:hover {
      transform: none;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      border-color: #e2e8f0;
    }

    .action-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
      border-radius: 12px;
      color: white;
      margin: 0 auto 16px;
    }

    .action-card h3 {
      font-size: 18px;
      font-weight: 600;
      color: #1e293b;
      margin: 0 0 8px 0;
    }

    .action-card p {
      font-size: 14px;
      color: #64748b;
      margin: 0;
      line-height: 1.4;
    }

    .coming-soon-badge {
      position: absolute;
      top: 12px;
      right: 12px;
      background: #FEF3C7;
      color: #92400E;
      padding: 4px 8px;
      border-radius: 8px;
      font-size: 10px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    @media (max-width: 768px) {
      .action-card {
        padding: 16px;
      }
      
      .action-icon {
        width: 40px;
        height: 40px;
        margin-bottom: 12px;
      }
      
      .action-card h3 {
        font-size: 16px;
      }
      
      .action-card p {
        font-size: 13px;
      }
    }
  `]
})
export class AdminActionCardComponent {
  @Input() titulo!: string;
  @Input() descripcion!: string;
  @Input() icono!: string;
  @Input() proximamente: boolean = false;
  @Input() clickeable: boolean = true;
  
  @Output() cardClick = new EventEmitter<void>();

  onClick(): void {
    if (!this.proximamente && this.clickeable) {
      this.cardClick.emit();
    }
  }
}
