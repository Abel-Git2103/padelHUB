import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coming-soon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="coming-soon-container">
      <div class="coming-soon-content">
        <div class="coming-soon-icon">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12,6 12,12 16,14"></polyline>
          </svg>
        </div>
        
        <h1>{{ title }}</h1>
        <p>{{ description }}</p>
        
        <div class="feature-list">
          <div class="feature-item" *ngFor="let feature of features">
            <div class="feature-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9,11 12,14 22,4"></polyline>
                <path d="M21,12V19A2,2 0 0 1 19,21H5A2,2 0 0 1 3,19V5A2,2 0 0 1 5,3H16"></path>
              </svg>
            </div>
            <span>{{ feature }}</span>
          </div>
        </div>
        
        <button class="back-button" (click)="goBack()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12,19 5,12 12,5"></polyline>
          </svg>
          Volver al inicio
        </button>
      </div>
    </div>
  `,
  styles: [`
    .coming-soon-container {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: calc(100vh - 120px);
      padding: 20px;
      background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    }

    .coming-soon-content {
      text-align: center;
      max-width: 480px;
      padding: 40px 30px;
      background: white;
      border-radius: 20px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      animation: fadeInUp 0.6s ease-out;
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .coming-soon-icon {
      margin-bottom: 24px;
      color: #2E7D32;
      display: flex;
      justify-content: center;
    }

    h1 {
      font-size: 28px;
      font-weight: 700;
      color: #1e293b;
      margin: 0 0 12px 0;
      background: linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    p {
      font-size: 16px;
      color: #64748b;
      margin: 0 0 32px 0;
      line-height: 1.6;
    }

    .feature-list {
      margin-bottom: 32px;
    }

    .feature-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 0;
      text-align: left;
      color: #475569;
      font-size: 14px;
      font-weight: 500;
    }

    .feature-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      background: #f0f9f1;
      border-radius: 8px;
      color: #2E7D32;
      flex-shrink: 0;
    }

    .back-button {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 12px 24px;
      background: linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%);
      color: white;
      border: none;
      border-radius: 12px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 12px rgba(46, 125, 50, 0.3);
    }

    .back-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(46, 125, 50, 0.4);
    }

    .back-button:active {
      transform: translateY(0);
    }

    /* Responsive */
    @media (max-width: 768px) {
      .coming-soon-container {
        padding: 16px;
        min-height: calc(100vh - 160px);
      }

      .coming-soon-content {
        padding: 30px 20px;
      }

      h1 {
        font-size: 24px;
      }

      p {
        font-size: 15px;
      }
    }
  `]
})
export class ComingSoonComponent {
  @Input() title: string = '¡Próximamente!';
  @Input() description: string = 'Estamos trabajando en esta increíble funcionalidad. Mantente atento a las próximas actualizaciones.';
  @Input() features: string[] = [
    'Interfaz intuitiva y moderna',
    'Experiencia optimizada para móviles',
    'Integración completa con PadelHUB',
    'Notificaciones en tiempo real'
  ];

  constructor(private router: Router) {
    // Personalizar contenido según la ruta actual
    const currentUrl = this.router.url;
    
    if (currentUrl.includes('chat')) {
      this.title = '💬 Chat - ¡Próximamente!';
      this.description = 'El sistema de chat está en desarrollo. Pronto podrás comunicarte con otros jugadores y organizar partidos en tiempo real.';
      this.features = [
        'Chat en tiempo real',
        'Grupos por club y nivel',
        'Organización de partidos',
        'Notificaciones push'
      ];
    } else if (currentUrl.includes('monedero')) {
      this.title = '💳 Monedero Virtual - ¡Próximamente!';
      this.description = 'Estamos desarrollando tu monedero virtual para gestionar pagos, reservas y transacciones de forma segura y cómoda.';
      this.features = [
        'Recarga de saldo virtual',
        'Pagos seguros y rápidos',
        'Historial de transacciones',
        'Ofertas y descuentos exclusivos'
      ];
    } else if (currentUrl.includes('ayuda')) {
      this.title = '❓ Centro de Ayuda - ¡Próximamente!';
      this.description = 'Estamos preparando un completo centro de ayuda con tutoriales, FAQs y soporte técnico personalizado.';
      this.features = [
        'Tutoriales interactivos',
        'FAQ completa',
        'Soporte técnico 24/7',
        'Guías paso a paso'
      ];
    }
  }

  goBack() {
    this.router.navigate(['/jugador/tablero']);
  }
}
