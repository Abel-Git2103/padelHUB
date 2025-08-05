import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  TipoRango, 
  ProgresoRango, 
  calcularProgresoRango, 
  obtenerConsejosProgreso,
  obtenerInfoRango,
  UMBRALES_ASCENSO 
} from '../../../models/rango.model';

@Component({
  selector: 'app-compact-rank-progress',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="compact-rank-progress" *ngIf="progreso">
      <!-- Header compacto -->
      <div class="rank-header">
        <div class="current-rank">
          <span class="rank-icon">{{ obtenerIconoRango(progreso.rangoActual) }}</span>
          <div class="rank-info">
            <h4 class="rank-name">{{ obtenerNombreRango(progreso.rangoActual) }} - {{ progreso.puntos }} pts</h4>
            <p class="rank-subtitle" *ngIf="umbralSiguiente?.siguienteRango">
              Progreso hacia {{ obtenerNombreRango(umbralSiguiente.siguienteRango) }}
            </p>
          </div>
        </div>
        <div class="progress-circle" [class.complete]="progreso.puedeAscender">
          <span class="progress-percentage">{{ Math.round(progreso.progresoTotal) }}%</span>
        </div>
      </div>

      <!-- Barra de progreso compacta -->
      <div class="compact-progress-bar" *ngIf="umbralSiguiente?.siguienteRango">
        <div class="progress-track">
          <div 
            class="progress-fill" 
            [style.width.%]="progreso.progresoTotal"
            [class.complete]="progreso.puedeAscender">
          </div>
        </div>
        <div class="progress-labels">
          <span class="current-points">{{ progreso.puntos }} pts</span>
          <span class="target-points">{{ umbralSiguiente.puntosRequeridos }} pts</span>
        </div>
      </div>

      <!-- Detalles compactos -->
      <div class="compact-details" *ngIf="umbralSiguiente?.siguienteRango && !progreso.puedeAscender">
        <div class="detail-grid">
          <div class="detail-item">
            <span class="detail-icon">🎯</span>
            <span class="detail-text">
              {{ umbralSiguiente.puntosRequeridos - progreso.puntos }} pts más
            </span>
          </div>
          <div class="detail-item">
            <span class="detail-icon">📈</span>
            <span class="detail-text">
              {{ umbralSiguiente.winRateRequerido }}% win rate
            </span>
          </div>
          <div class="detail-item" *ngIf="progreso.victoriasNecesarias > 0">
            <span class="detail-icon">🏆</span>
            <span class="detail-text">
              ~{{ progreso.victoriasNecesarias }} victorias
            </span>
          </div>
        </div>
      </div>

      <!-- Mensaje de ascenso -->
      <div class="ascension-ready" *ngIf="progreso.puedeAscender">
        <span class="ascension-icon">🎉</span>
        <span class="ascension-text">
          ¡Listo para ascender a {{ obtenerNombreRango(umbralSiguiente?.siguienteRango!) }}!
        </span>
      </div>

      <!-- Zona de peligro compacta -->
      <div class="danger-alert" *ngIf="progreso.enZonaPeligro">
        <span class="danger-icon">⚠️</span>
        <span class="danger-text">
          Zona de peligro - {{ progreso.margenSeguridad }} pts de margen
        </span>
      </div>

      <!-- Un consejo principal -->
      <div class="main-tip" *ngIf="consejos.length > 0">
        <span class="tip-icon">💡</span>
        <span class="tip-text">{{ consejos[0] }}</span>
      </div>
    </div>
  `,
  styles: [`
    .compact-rank-progress {
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      border-radius: 12px;
      padding: 16px;
      border: 1px solid #dee2e6;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .rank-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }

    .current-rank {
      display: flex;
      align-items: center;
      gap: 12px;
      flex: 1;
    }

    .rank-icon {
      font-size: 2rem;
      filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
    }

    .rank-info h4 {
      margin: 0;
      font-size: 1.1rem;
      font-weight: 600;
      color: #2d3748;
    }

    .rank-subtitle {
      margin: 2px 0 0 0;
      font-size: 0.875rem;
      color: #718096;
    }

    .progress-circle {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: conic-gradient(#4299e1 var(--progress, 0deg), #e2e8f0 var(--progress, 0deg));
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      font-weight: 600;
      font-size: 0.75rem;
      color: #2d3748;
    }

    .progress-circle.complete {
      background: conic-gradient(#48bb78 360deg, #48bb78 360deg);
    }

    .progress-circle::before {
      content: '';
      position: absolute;
      inset: 4px;
      border-radius: 50%;
      background: white;
    }

    .progress-percentage {
      position: relative;
      z-index: 1;
    }

    .compact-progress-bar {
      margin-bottom: 12px;
    }

    .progress-track {
      height: 6px;
      background: #e2e8f0;
      border-radius: 3px;
      overflow: hidden;
      margin-bottom: 4px;
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #4299e1, #63b3ed);
      border-radius: 3px;
      transition: width 0.8s ease-out;
    }

    .progress-fill.complete {
      background: linear-gradient(90deg, #48bb78, #68d391);
    }

    .progress-labels {
      display: flex;
      justify-content: space-between;
      font-size: 0.75rem;
      color: #718096;
    }

    .compact-details {
      margin-bottom: 12px;
    }

    .detail-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
      gap: 8px;
    }

    .detail-item {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.875rem;
      color: #4a5568;
    }

    .detail-icon {
      font-size: 1rem;
    }

    .ascension-ready {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      background: linear-gradient(135deg, #c6f6d5, #9ae6b4);
      border-radius: 8px;
      border: 1px solid #48bb78;
      font-size: 0.875rem;
      color: #22543d;
      font-weight: 500;
      margin-bottom: 12px;
    }

    .danger-alert {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      background: linear-gradient(135deg, #fed7d7, #feb2b2);
      border-radius: 8px;
      border: 1px solid #f56565;
      font-size: 0.875rem;
      color: #742a2a;
      font-weight: 500;
      margin-bottom: 12px;
    }

    .main-tip {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      padding: 8px 12px;
      background: rgba(255, 255, 255, 0.7);
      border-radius: 8px;
      border: 1px solid #e2e8f0;
      font-size: 0.875rem;
      color: #4a5568;
    }

    .tip-icon {
      font-size: 1rem;
      margin-top: 1px;
    }

    .tip-text {
      flex: 1;
      line-height: 1.4;
    }

    @media (max-width: 768px) {
      .compact-rank-progress {
        padding: 12px;
      }
      
      .rank-header {
        flex-direction: column;
        gap: 12px;
        align-items: flex-start;
      }
      
      .current-rank {
        width: 100%;
      }
      
      .detail-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class CompactRankProgressComponent {
  @Input() rangoActual!: TipoRango;
  @Input() puntos!: number;
  @Input() winRate!: number;
  @Input() partidosJugados: number = 0;
  @Input() victorias: number = 0;

  progreso!: ProgresoRango;
  consejos: string[] = [];
  umbralSiguiente: any;

  // Exposer Math para el template
  Math = Math;

  ngOnInit() {
    this.calcularProgreso();
  }

  ngOnChanges() {
    this.calcularProgreso();
  }

  private calcularProgreso() {
    this.progreso = calcularProgresoRango(
      this.rangoActual,
      this.puntos,
      this.winRate,
      this.partidosJugados,
      this.victorias
    );
    
    this.consejos = obtenerConsejosProgreso(this.progreso);
    this.umbralSiguiente = UMBRALES_ASCENSO[this.rangoActual];
  }

  obtenerIconoRango(rango: TipoRango): string {
    return obtenerInfoRango(rango).icono;
  }

  obtenerNombreRango(rango: TipoRango): string {
    return obtenerInfoRango(rango).nombre;
  }
}
