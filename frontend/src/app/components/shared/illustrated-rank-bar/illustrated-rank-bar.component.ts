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
      </div>

      <!-- Barra de progreso principal con badges laterales -->
      <div class="main-progress-section" *ngIf="umbralSiguiente?.siguienteRango">
        <!-- Barra de progreso principal -->
        <div class="fifa-progress-container">
          <!-- Badge izquierdo -->
          <div class="fifa-rank-badge left-badge" *ngIf="umbralAnterior">
            <div class="fifa-badge-content">
              <div class="fifa-badge-icon">{{ obtenerIconoRango(umbralAnterior.rango) }}</div>
            </div>
          </div>

          <!-- Barra central -->
          <div class="fifa-progress-track">
            <!-- Sección de descenso/mantenimiento -->
            <div class="fifa-section fifa-hold" [style.width]="'30%'">
              <span class="fifa-section-label">RIESGO</span>
              <div class="fifa-zone-info" *ngIf="umbralAnterior">
                <span class="zone-points">{{ umbralAnterior.puntosMinimoParaMantenerse }}+ pts</span>
              </div>
            </div>
            
            <!-- Sección de progreso actual -->
            <div class="fifa-section fifa-current" 
                 [style.width]="'70%'">
              <!-- Marca de posición actual -->
              <div class="fifa-position-marker" 
                   [style.left]="calcularPosicionMarca() + '%'">
                <div class="marker-line"></div>
                <div class="marker-info">
                  <span class="marker-points">{{ progreso.puntos }}</span>
                </div>
              </div>
            </div>

            <!-- Flecha de promoción -->
            <div class="fifa-promotion-arrow" *ngIf="progreso.puedeAscender">
              <span>▲ PROMOTION</span>
            </div>
          </div>

          <!-- Badge derecho -->
          <div class="fifa-rank-badge right-badge">
            <div class="fifa-badge-content">
              <div class="fifa-badge-icon">{{ obtenerIconoRango(umbralSiguiente.siguienteRango) }}</div>
            </div>
          </div>
        </div>

        <!-- Información adicional debajo de la barra -->
        <div class="progress-info-bottom">
          <div class="info-item">
            <span class="info-label">Puntos actuales:</span>
            <span class="info-value">{{ progreso.puntos }}</span>
          </div>
          <div class="info-item" *ngIf="umbralAnterior">
            <span class="info-label">Zona riesgo:</span>
            <span class="info-value">{{ umbralAnterior.puntosMinimoParaMantenerse }}+ pts</span>
          </div>
          <div class="info-item">
            <span class="info-label">Para ascender:</span>
            <span class="info-value">{{ umbralSiguiente.puntosRequeridos }} pts</span>
          </div>
          <div class="info-item">
            <span class="info-label">Win rate actual:</span>
            <span class="info-value">{{ Math.round(winRate) }}%</span>
          </div>
          <div class="info-item" *ngIf="umbralSiguiente?.winRateMinimo">
            <span class="info-label">Win rate necesario:</span>
            <span class="info-value">{{ umbralSiguiente.winRateMinimo }}%</span>
          </div>
          <div class="info-item" *ngIf="progreso.victoriasNecesarias > 0">
            <span class="info-label">Victorias necesarias:</span>
            <span class="info-value">{{ progreso.victoriasNecesarias }}</span>
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

      @media (max-width: 768px) {
        padding: 12px;
        border-radius: 12px;
        margin: 12px 0;
      }
    }

    .rank-header {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 20px;

      @media (max-width: 768px) {
        margin-bottom: 12px;
      }
    }

    .rank-info {
      display: flex;
      align-items: center;
      gap: 12px;

      @media (max-width: 768px) {
        gap: 8px;
      }
    }

    .rank-icon {
      font-size: 2.5rem;
      filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));

      @media (max-width: 768px) {
        font-size: 2rem;
      }
    }

    .rank-details h3 {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 700;
      color: #2d3748;

      @media (max-width: 768px) {
        font-size: 1.1rem;
      }
    }

    .rank-subtitle {
      margin: 4px 0 0 0;
      font-size: 0.9rem;
      color: #718096;

      @media (max-width: 768px) {
        font-size: 0.8rem;
      }
    }

    .main-progress-section {
      margin-bottom: 20px;
    }

    /* Información debajo de la barra */
    .progress-info-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 12px;
      padding: 12px 16px;
      background: rgba(248, 250, 252, 0.8);
      border-radius: 6px;
      border: 1px solid #e2e8f0;

      @media (max-width: 768px) {
        flex-direction: column;
        gap: 6px;
        padding: 8px;
        margin-top: 8px;
      }

      @media (min-width: 769px) and (max-width: 1024px) {
        justify-content: center;
        gap: 12px;
      }
    }

    .info-item {
      display: flex;
      align-items: center;
      gap: 6px;
      
      @media (max-width: 768px) {
        justify-content: space-between;
        width: 100%;
      }
    }

    .info-label {
      font-size: 0.8rem;
      color: #64748b;
      font-weight: 500;

      @media (max-width: 768px) {
        font-size: 0.75rem;
      }
    }

    .info-value {
      font-size: 0.85rem;
      color: #1e293b;
      font-weight: 600;

      @media (max-width: 768px) {
        font-size: 0.8rem;
      }
    }

    /* Badges estilo FIFA */
    .fifa-progress-container {
      display: flex;
      align-items: center;
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      border-radius: 8px;
      padding: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      border: 1px solid #e2e8f0;

      @media (max-width: 768px) {
        padding: 8px;
        flex-direction: row;
        gap: 8px;
        align-items: center;
      }
    }

    /* Badges estilo FIFA */
    .fifa-rank-badge {
      background: white;
      border: 2px solid #e2e8f0;
      border-radius: 8px;
      padding: 12px;
      min-width: 60px;
      height: 48px;
      color: #2d3748;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      display: flex;
      align-items: center;
      justify-content: center;

      &.left-badge {
        border-color: #f59e0b;
        background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
        color: #92400e;
      }

      &.right-badge {
        border-color: #10b981;
        background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
        color: #065f46;
      }

      @media (max-width: 768px) {
        min-width: 45px;
        height: 36px;
        padding: 8px;
        flex-shrink: 0;
      }
    }

    .fifa-badge-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2px;
    }

    .fifa-badge-icon {
      font-size: 2rem;
      filter: drop-shadow(0 1px 2px rgba(0,0,0,0.1));

      @media (max-width: 768px) {
        font-size: 1.5rem;
      }
    }

    /* Barra de progreso principal estilo FIFA */
    .fifa-progress-track {
      flex: 1;
      height: 48px;
      background: #e2e8f0;
      border-radius: 6px;
      margin: 0 16px;
      position: relative;
      overflow: hidden;
      border: 1px solid #cbd5e0;
      box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);

      @media (max-width: 768px) {
        margin: 0 8px;
        height: 36px;
        flex: 1;
      }
    }

    /* Secciones de la barra */
    .fifa-section {
      position: absolute;
      top: 0;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.8s ease-out;
    }

    .fifa-section.fifa-hold {
      left: 0;
      background: linear-gradient(90deg, #fbbf24 0%, #f59e0b 100%);
      border-right: 1px solid #d97706;
      flex-direction: column;
      gap: 2px;

      .fifa-section-label {
        color: white;
        text-shadow: 0 1px 2px rgba(0,0,0,0.3);
        font-weight: 600;
        
        @media (max-width: 768px) {
          font-size: 0.55rem;
        }
      }
    }

    .fifa-zone-info {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .zone-points {
      font-size: 0.6rem;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.9);
      text-shadow: 0 1px 2px rgba(0,0,0,0.3);
      background: rgba(255, 255, 255, 0.1);
      padding: 1px 4px;
      border-radius: 3px;
      border: 1px solid rgba(255, 255, 255, 0.2);

      @media (max-width: 768px) {
        font-size: 0.5rem;
        padding: 1px 3px;
      }
    }

    .fifa-section.fifa-current {
      left: 30%;
      background: linear-gradient(90deg, #e2e8f0 0%, #cbd5e0 100%);
      box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
      position: relative;
    }

    .fifa-section-label {
      font-size: 0.7rem;
      font-weight: 700;
      color: white;
      text-transform: uppercase;
      letter-spacing: 1px;
      text-shadow: 0 1px 2px rgba(0,0,0,0.3);

      @media (max-width: 768px) {
        font-size: 0.6rem;
        letter-spacing: 0.5px;
      }
    }

    /* Información dentro de la barra - Marca de posición */
    .fifa-position-marker {
      position: absolute;
      top: 0;
      height: 100%;
      width: 2px;
      z-index: 10;
      transform: translateX(-50%);
    }

    .marker-line {
      width: 2px;
      height: 100%;
      background: linear-gradient(180deg, #6b7280 0%, #9ca3af 100%);
      border-radius: 1px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.2);
      position: relative;
    }

    .marker-line::before {
      content: '';
      position: absolute;
      top: -3px;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
      border-bottom: 6px solid #6b7280;
    }

    .marker-line::after {
      content: '';
      position: absolute;
      bottom: -3px;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
      border-top: 6px solid #9ca3af;
    }

    .marker-info {
      position: absolute;
      top: -28px;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(135deg, #374151 0%, #4b5563 100%);
      color: white;
      padding: 3px 6px;
      border-radius: 4px;
      font-size: 0.7rem;
      font-weight: 600;
      white-space: nowrap;
      box-shadow: 0 1px 6px rgba(0,0,0,0.15);
      border: 1px solid #6b7280;

      @media (max-width: 768px) {
        font-size: 0.6rem;
        padding: 2px 5px;
        top: -25px;
      }
    }

    .marker-info::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border-left: 3px solid transparent;
      border-right: 3px solid transparent;
      border-top: 3px solid #4b5563;
    }

    .marker-points {
      color: #fbbf24;
      font-weight: 700;
    }

    /* Flecha de promoción */
    .fifa-promotion-arrow {
      position: absolute;
      right: -2px;
      top: 50%;
      transform: translateY(-50%);
      background: linear-gradient(90deg, #48bb78 0%, #38a169 100%);
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 0.65rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      animation: pulse-promotion 2s infinite;
      z-index: 15;

      @media (max-width: 768px) {
        font-size: 0.55rem;
        padding: 2px 4px;
        right: -1px;
      }
    }

    @keyframes pulse-promotion {
      0%, 100% { 
        opacity: 1;
        transform: translateY(-50%) scale(1);
      }
      50% { 
        opacity: 0.8;
        transform: translateY(-50%) scale(1.05);
      }
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
        padding: 12px;
        margin: 8px 0;
      }
      
      .rank-header {
        flex-direction: row;
        gap: 8px;
        align-items: center;
      }
      
      .rank-info {
        align-self: stretch;
      }
      
      .ascension-stats {
        flex-direction: column;
        gap: 4px;
      }
      
      .fifa-progress-container {
        min-height: 60px;
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
  umbralAnterior: any;

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
    this.umbralAnterior = this.obtenerUmbralAnterior();
  }

  private obtenerUmbralAnterior() {
    const rangos: TipoRango[] = ['COBRE', 'BRONCE', 'PLATA', 'ORO', 'PLATINO'];
    const currentIndex = rangos.indexOf(this.rangoActual);
    
    if (currentIndex > 0) {
      const rangoAnterior = rangos[currentIndex - 1];
      const umbral = UMBRALES_ASCENSO[rangoAnterior];
      return {
        rango: rangoAnterior,
        puntosMinimoParaMantenerse: umbral?.puntosRequeridos || 0
      };
    }
    
    return null;
  }

  calcularPorcentajeZonaPeligro(): number {
    if (!this.progreso.enZonaPeligro) return 0;
    
    // La zona de peligro representa el primer 25% de la barra
    const margenPeligro = this.progreso.margenSeguridad;
    const rangoTotal = this.umbralSiguiente?.puntosRequeridos - (this.umbralAnterior?.puntosMinimoParaMantenerse || 0);
    
    if (rangoTotal > 0) {
      return Math.min((margenPeligro / rangoTotal) * 100, 25);
    }
    
    return 20; // Valor por defecto
  }

  calcularPosicionMarca(): number {
    // Calcular la posición de la marca dentro de la barra total
    const puntosMinimos = this.umbralAnterior?.puntosMinimoParaMantenerse || 0;
    const puntosMaximos = this.umbralSiguiente?.puntosRequeridos || 100;
    const puntosActuales = this.progreso.puntos;
    
    // Asegurar que los puntos estén dentro del rango válido
    const puntosNormalizados = Math.max(puntosMinimos, Math.min(puntosMaximos, puntosActuales));
    
    // Calcular porcentaje dentro del rango total (0-100%)
    const rangoTotal = puntosMaximos - puntosMinimos;
    const progresoDentroDelRango = puntosNormalizados - puntosMinimos;
    
    let posicionTotal = 0;
    
    if (rangoTotal > 0) {
      // Calcular porcentaje real de progreso dentro del rango
      const porcentajeProgreso = (progresoDentroDelRango / rangoTotal) * 100;
      
      // Mapear directamente el porcentaje a toda la barra
      // La zona de riesgo ocupa el 30%, el progreso el 70%
      // Pero mapeamos los puntos proporcionalmente a toda la barra
      posicionTotal = porcentajeProgreso;
    }
    
    // Asegurar que esté dentro de los límites de la barra
    return Math.min(98, Math.max(2, posicionTotal));
  }

  obtenerIconoRango(rango: TipoRango): string {
    return obtenerInfoRango(rango).icono;
  }

  obtenerNombreRango(rango: TipoRango): string {
    return obtenerInfoRango(rango).nombre;
  }
}
