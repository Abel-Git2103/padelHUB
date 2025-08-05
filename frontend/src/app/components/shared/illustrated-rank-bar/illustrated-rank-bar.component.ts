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
  selector: 'app-illustrated-rank-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="illustrated-rank-bar" *ngIf="progreso">
      <!-- Header con información del rango -->
      <div class="rank-header">
        <div class="rank-info">
          <span class="rank-icon">{{ obtenerIconoRango(progreso.rangoActual) }}</span>
          <div class="rank-details">
            <h3 class="rank-name">{{ obtenerNombreRango(progreso.rangoActual) }}</h3>
            <p class="rank-subtitle" *ngIf="umbralSiguiente?.siguienteRango">
              Progreso hacia {{ obtenerNombreRango(umbralSiguiente.siguienteRango) }}
            </p>
          </div>
        </div>
        <div class="progress-percentage" [class.complete]="progreso.puedeAscender">
          {{ Math.round(progreso.progresoTotal) }}%
        </div>
      </div>

      <!-- Barra de progreso principal con detalles -->
      <div class="main-progress-section" *ngIf="umbralSiguiente?.siguienteRango">
        <div class="progress-track">
          <div 
            class="progress-fill" 
            [style.width.%]="progreso.progresoTotal"
            [class.complete]="progreso.puedeAscender">
            <div class="progress-shine"></div>
          </div>
          <div class="progress-markers">
            <span class="marker start">{{ progreso.puntos }}</span>
            <span class="marker end">{{ umbralSiguiente.puntosRequeridos }}</span>
          </div>
        </div>
        
        <!-- Información detallada debajo de la barra -->
        <div class="progress-details">
          <div class="detail-section partidos">
            <div class="detail-icon">🎾</div>
            <div class="detail-content">
              <span class="detail-value">{{ partidosJugados }}</span>
              <span class="detail-label">Partidos jugados</span>
              <div class="detail-breakdown">
                <span class="wins">{{ victorias }}W</span>
                <span class="losses">{{ partidosJugados - victorias }}L</span>
              </div>
            </div>
          </div>

          <div class="detail-section winrate">
            <div class="detail-icon">📈</div>
            <div class="detail-content">
              <span class="detail-value">{{ Math.round(winRate) }}%</span>
              <span class="detail-label">Win Rate actual</span>
              <div class="detail-comparison">
                <span class="required">Necesario: {{ umbralSiguiente.winRateRequerido }}%</span>
              </div>
            </div>
          </div>

          <div class="detail-section points">
            <div class="detail-icon">🎯</div>
            <div class="detail-content">
              <span class="detail-value">{{ umbralSiguiente.puntosRequeridos - progreso.puntos }}</span>
              <span class="detail-label">Puntos restantes</span>
              <div class="detail-estimate" *ngIf="progreso.victoriasNecesarias > 0">
                <span class="estimate">~{{ progreso.victoriasNecesarias }} victorias más</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Estado especial: listo para ascender -->
      <div class="ascension-ready" *ngIf="progreso.puedeAscender">
        <div class="ascension-content">
          <span class="ascension-icon">🎉</span>
          <div class="ascension-text">
            <strong>¡Felicidades!</strong>
            <span>Cumples los requisitos para ascender a {{ obtenerNombreRango(umbralSiguiente?.siguienteRango!) }}</span>
          </div>
        </div>
        <div class="ascension-stats">
          <span>✅ {{ progreso.puntos }} puntos</span>
          <span>✅ {{ Math.round(winRate) }}% win rate</span>
          <span>✅ {{ partidosJugados }} partidos</span>
        </div>
      </div>

      <!-- Estado especial: zona de peligro -->
      <div class="danger-zone" *ngIf="progreso.enZonaPeligro && !progreso.puedeAscender">
        <div class="danger-content">
          <span class="danger-icon">⚠️</span>
          <div class="danger-text">
            <strong>Zona de peligro</strong>
            <span>Solo {{ progreso.margenSeguridad }} puntos de margen para mantener el rango</span>
          </div>
        </div>
      </div>

      <!-- Consejo principal -->
      <div class="main-advice" *ngIf="consejos.length > 0 && !progreso.puedeAscender">
        <div class="advice-icon">💡</div>
        <div class="advice-text">{{ consejos[0] }}</div>
      </div>

      <!-- Rango máximo alcanzado -->
      <div class="max-rank" *ngIf="progreso.rangoActual === 'PLATINO'">
        <div class="max-rank-content">
          <span class="max-rank-icon">👑</span>
          <div class="max-rank-text">
            <strong>Rango máximo alcanzado</strong>
            <span>Has llegado al nivel PLATINO, ¡el más alto disponible!</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .illustrated-rank-bar {
      background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
      border-radius: 16px;
      padding: 20px;
      border: 1px solid #e2e8f0;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      margin: 16px 0;
    }

    .rank-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .rank-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .rank-icon {
      font-size: 2.5rem;
      filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
    }

    .rank-details h3 {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 700;
      color: #2d3748;
    }

    .rank-subtitle {
      margin: 4px 0 0 0;
      font-size: 0.9rem;
      color: #718096;
    }

    .progress-percentage {
      font-size: 1.5rem;
      font-weight: 700;
      color: #4299e1;
      padding: 8px 16px;
      background: rgba(66, 153, 225, 0.1);
      border-radius: 20px;
      border: 2px solid #4299e1;
    }

    .progress-percentage.complete {
      color: #48bb78;
      background: rgba(72, 187, 120, 0.1);
      border-color: #48bb78;
    }

    .main-progress-section {
      margin-bottom: 20px;
    }

    .progress-track {
      position: relative;
      height: 12px;
      background: #e2e8f0;
      border-radius: 6px;
      overflow: hidden;
      margin-bottom: 16px;
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #4299e1, #63b3ed);
      border-radius: 6px;
      transition: width 1s ease-out;
      position: relative;
      overflow: hidden;
    }

    .progress-fill.complete {
      background: linear-gradient(90deg, #48bb78, #68d391);
    }

    .progress-shine {
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
      animation: shine 2s infinite;
    }

    @keyframes shine {
      0% { left: -100%; }
      100% { left: 100%; }
    }

    .progress-markers {
      display: flex;
      justify-content: space-between;
      margin-top: 4px;
      font-size: 0.8rem;
      color: #718096;
    }

    .progress-details {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 16px;
      margin-top: 16px;
    }

    .detail-section {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      padding: 12px;
      background: rgba(255, 255, 255, 0.8);
      border-radius: 10px;
      border: 1px solid #e2e8f0;
    }

    .detail-icon {
      font-size: 1.5rem;
      margin-top: 2px;
    }

    .detail-content {
      flex: 1;
    }

    .detail-value {
      display: block;
      font-size: 1.1rem;
      font-weight: 600;
      color: #2d3748;
    }

    .detail-label {
      display: block;
      font-size: 0.8rem;
      color: #718096;
      margin-bottom: 4px;
    }

    .detail-breakdown {
      display: flex;
      gap: 8px;
      font-size: 0.8rem;
    }

    .wins {
      color: #48bb78;
      font-weight: 500;
    }

    .losses {
      color: #f56565;
      font-weight: 500;
    }

    .detail-comparison,
    .detail-estimate {
      font-size: 0.8rem;
      color: #4a5568;
    }

    .required {
      color: #ed8936;
      font-weight: 500;
    }

    .estimate {
      color: #4299e1;
      font-style: italic;
    }

    .ascension-ready {
      background: linear-gradient(135deg, #c6f6d5, #9ae6b4);
      border: 2px solid #48bb78;
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 16px;
    }

    .ascension-content {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 8px;
    }

    .ascension-icon {
      font-size: 1.8rem;
    }

    .ascension-text strong {
      display: block;
      color: #22543d;
      font-size: 1rem;
      margin-bottom: 2px;
    }

    .ascension-text span {
      color: #2f855a;
      font-size: 0.9rem;
    }

    .ascension-stats {
      display: flex;
      gap: 16px;
      font-size: 0.85rem;
      color: #2f855a;
      font-weight: 500;
    }

    .danger-zone {
      background: linear-gradient(135deg, #fed7d7, #feb2b2);
      border: 2px solid #f56565;
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 16px;
    }

    .danger-content {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .danger-icon {
      font-size: 1.8rem;
    }

    .danger-text strong {
      display: block;
      color: #742a2a;
      font-size: 1rem;
      margin-bottom: 2px;
    }

    .danger-text span {
      color: #c53030;
      font-size: 0.9rem;
    }

    .main-advice {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 12px 16px;
      background: rgba(66, 153, 225, 0.1);
      border-radius: 10px;
      border-left: 4px solid #4299e1;
    }

    .advice-icon {
      font-size: 1.3rem;
      margin-top: 2px;
    }

    .advice-text {
      color: #2c5282;
      font-size: 0.9rem;
      line-height: 1.4;
    }

    .max-rank {
      background: linear-gradient(135deg, #ffd700, #ffed4e);
      border: 2px solid #d69e2e;
      border-radius: 12px;
      padding: 16px;
    }

    .max-rank-content {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .max-rank-icon {
      font-size: 1.8rem;
    }

    .max-rank-text strong {
      display: block;
      color: #744210;
      font-size: 1rem;
      margin-bottom: 2px;
    }

    .max-rank-text span {
      color: #975a16;
      font-size: 0.9rem;
    }

    @media (max-width: 768px) {
      .illustrated-rank-bar {
        padding: 16px;
      }
      
      .rank-header {
        flex-direction: column;
        gap: 12px;
        align-items: flex-start;
      }
      
      .progress-details {
        grid-template-columns: 1fr;
      }
      
      .ascension-stats {
        flex-direction: column;
        gap: 4px;
      }
    }
  `]
})
export class IllustratedRankBarComponent {
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
