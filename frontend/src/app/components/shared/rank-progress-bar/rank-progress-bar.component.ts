import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  TipoRango, 
  ProgresoRango, 
  calcularProgresoRango, 
  obtenerConsejosProgreso,
  generarLineaProgresoVisual,
  obtenerInfoRango,
  UMBRALES_ASCENSO 
} from '../../../models/rango.model';

@Component({
  selector: 'app-rank-progress-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="rank-progress-container" *ngIf="progreso">
      <!-- Header con rango actual -->
      <div class="rank-header">
        <div class="current-rank">
          <span class="rank-icon">{{ obtenerIconoRango(progreso.rangoActual) }}</span>
          <div class="rank-info">
            <h3 class="rank-name">{{ obtenerNombreRango(progreso.rangoActual) }}</h3>
            <p class="rank-points">{{ progreso.puntos }} puntos</p>
          </div>
        </div>
        
        <div class="progress-summary" *ngIf="umbralSiguiente">
          <div class="progress-circle" [class.complete]="progreso.puedeAscender">
            <span class="progress-percentage">{{ Math.round(progreso.progresoTotal) }}%</span>
          </div>
        </div>
      </div>

      <!-- Línea de progreso completa -->
      <div class="progression-line">
        <div class="rank-nodes">
          <div 
            *ngFor="let rango of todosLosRangos; let i = index"
            class="rank-node"
            [class.completed]="esRangoCompletado(rango.tipo)"
            [class.current]="rango.tipo === progreso.rangoActual"
            [class.next]="esProximoRango(rango.tipo)">
            
            <div class="node-icon">{{ rango.icono }}</div>
            <div class="node-label">{{ rango.nombre }}</div>
            <div class="node-points">
              <span *ngIf="rango.tipo === progreso.rangoActual">{{ progreso.puntos }}pts</span>
              <span *ngIf="rango.tipo !== progreso.rangoActual">{{ rango.puntosMinimos }}pts</span>
            </div>
          </div>
        </div>
        
        <div class="progression-bars">
          <div 
            *ngFor="let segmento of segmentosProgreso; let i = index"
            class="progress-segment"
            [class.completed]="segmento.completado"
            [class.current]="segmento.actual">
            
            <div 
              class="progress-fill" 
              [style.width.%]="segmento.porcentaje">
            </div>
          </div>
        </div>
      </div>

      <!-- Detalles de progreso hacia siguiente rango -->
      <div class="progress-details" *ngIf="umbralSiguiente && !progreso.puedeAscender">
        <h4>Progreso hacia {{ obtenerNombreRango(umbralSiguiente.siguienteRango!) }}</h4>
        
        <div class="requirement-bars">
          <div class="requirement">
            <div class="req-header">
              <span class="req-icon">🎯</span>
              <span class="req-label">Puntos</span>
              <span class="req-status" [class.completed]="progreso.puntos >= umbralSiguiente.puntosRequeridos">
                {{ progreso.puntos }}/{{ umbralSiguiente.puntosRequeridos }}
              </span>
            </div>
            <div class="req-bar">
              <div 
                class="req-fill points" 
                [style.width.%]="progreso.progresoPuntos">
              </div>
            </div>
          </div>

          <div class="requirement">
            <div class="req-header">
              <span class="req-icon">📈</span>
              <span class="req-label">Win Rate</span>
              <span class="req-status" [class.completed]="progreso.winRate >= umbralSiguiente.winRateRequerido">
                {{ progreso.winRate.toFixed(1) }}%/{{ umbralSiguiente.winRateRequerido }}%
              </span>
            </div>
            <div class="req-bar">
              <div 
                class="req-fill winrate" 
                [style.width.%]="progreso.progresoWinRate">
              </div>
            </div>
          </div>
        </div>

        <!-- Victorias necesarias -->
        <div class="victories-needed" *ngIf="progreso.victoriasNecesarias > 0">
          <span class="icon">🏆</span>
          <span class="text">
            Te faltan aproximadamente {{ progreso.victoriasNecesarias }} victorias para ascender
          </span>
        </div>
      </div>

      <!-- Mensaje de ascenso disponible -->
      <div class="ascension-ready" *ngIf="progreso.puedeAscender">
        <div class="ascension-icon">🎉</div>
        <div class="ascension-content">
          <h4>¡Ascenso Automático Disponible!</h4>
          <p>Cumples todos los requisitos para {{ obtenerNombreRango(umbralSiguiente?.siguienteRango!) }}</p>
          <span class="ascension-note">El ascenso será procesado automáticamente</span>
        </div>
      </div>

      <!-- Zona de peligro -->
      <div class="danger-zone" *ngIf="progreso.enZonaPeligro">
        <div class="danger-icon">⚠️</div>
        <div class="danger-content">
          <h4>Zona de Peligro</h4>
          <p>
            Estás cerca de la degradación. 
            Margen: {{ progreso.margenSeguridad }} puntos de seguridad.
          </p>
        </div>
      </div>

      <!-- Consejos -->
      <div class="progress-tips" *ngIf="consejos.length > 0">
        <h4>💡 Consejos para tu progreso:</h4>
        <ul class="tips-list">
          <li *ngFor="let consejo of consejos" class="tip-item">{{ consejo }}</li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .rank-progress-container {
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      border-radius: 16px;
      padding: 24px;
      margin: 16px 0;
      box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
      backdrop-filter: blur(4px);
      border: 1px solid rgba(255, 255, 255, 0.18);
    }

    .rank-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    .current-rank {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .rank-icon {
      font-size: 3rem;
      filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));
    }

    .rank-info h3 {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 700;
      color: #2d3748;
    }

    .rank-info p {
      margin: 4px 0 0 0;
      color: #718096;
      font-weight: 500;
    }

    .progress-circle {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: conic-gradient(#4299e1 0deg, #e2e8f0 0deg);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    .progress-circle.complete {
      background: conic-gradient(#48bb78 360deg, #48bb78 360deg);
    }

    .progress-circle::before {
      content: '';
      position: absolute;
      inset: 8px;
      border-radius: 50%;
      background: white;
    }

    .progress-percentage {
      position: relative;
      z-index: 1;
      font-weight: 700;
      color: #2d3748;
    }

    .progression-line {
      margin: 32px 0;
      position: relative;
    }

    .rank-nodes {
      display: flex;
      justify-content: space-between;
      margin-bottom: 16px;
    }

    .rank-node {
      text-align: center;
      flex: 1;
      position: relative;
    }

    .node-icon {
      font-size: 2rem;
      margin-bottom: 8px;
      filter: grayscale(1) opacity(0.5);
      transition: all 0.3s ease;
    }

    .rank-node.completed .node-icon,
    .rank-node.current .node-icon {
      filter: none;
      opacity: 1;
    }

    .rank-node.current .node-icon {
      transform: scale(1.2);
      filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
    }

    .node-label {
      font-size: 0.875rem;
      font-weight: 600;
      color: #718096;
      margin-bottom: 4px;
    }

    .rank-node.current .node-label {
      color: #2d3748;
      font-weight: 700;
    }

    .node-points {
      font-size: 0.75rem;
      color: #a0aec0;
    }

    .rank-node.current .node-points {
      color: #4299e1;
      font-weight: 600;
    }

    .progression-bars {
      display: flex;
      gap: 8px;
      height: 8px;
    }

    .progress-segment {
      flex: 1;
      background: #e2e8f0;
      border-radius: 4px;
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #4299e1, #63b3ed);
      border-radius: 4px;
      transition: width 1s ease-out;
    }

    .progress-segment.completed .progress-fill {
      background: linear-gradient(90deg, #48bb78, #68d391);
    }

    .progress-details {
      background: rgba(255, 255, 255, 0.7);
      border-radius: 12px;
      padding: 20px;
      margin: 20px 0;
    }

    .progress-details h4 {
      margin: 0 0 16px 0;
      color: #2d3748;
      font-size: 1.1rem;
    }

    .requirement-bars {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .requirement {
      background: white;
      border-radius: 8px;
      padding: 12px;
    }

    .req-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }

    .req-icon {
      margin-right: 8px;
    }

    .req-status {
      font-weight: 600;
      color: #e53e3e;
    }

    .req-status.completed {
      color: #48bb78;
    }

    .req-bar {
      height: 6px;
      background: #e2e8f0;
      border-radius: 3px;
      overflow: hidden;
    }

    .req-fill {
      height: 100%;
      border-radius: 3px;
      transition: width 0.8s ease-out;
    }

    .req-fill.points {
      background: linear-gradient(90deg, #4299e1, #63b3ed);
    }

    .req-fill.winrate {
      background: linear-gradient(90deg, #9f7aea, #b794f6);
    }

    .victories-needed {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 16px;
      padding: 12px;
      background: #ebf8ff;
      border-radius: 8px;
      color: #2b6cb0;
    }

    .ascension-ready {
      background: linear-gradient(135deg, #c6f6d5, #9ae6b4);
      border-radius: 12px;
      padding: 20px;
      display: flex;
      align-items: center;
      gap: 16px;
      margin: 20px 0;
      border: 2px solid #48bb78;
    }

    .ascension-icon {
      font-size: 2rem;
    }

    .ascension-content h4 {
      margin: 0 0 8px 0;
      color: #22543d;
    }

    .ascension-content p {
      margin: 0 0 8px 0;
      color: #2f855a;
    }

    .ascension-note {
      font-size: 0.875rem;
      color: #38a169;
      font-style: italic;
    }

    .danger-zone {
      background: linear-gradient(135deg, #fed7d7, #feb2b2);
      border-radius: 12px;
      padding: 20px;
      display: flex;
      align-items: center;
      gap: 16px;
      margin: 20px 0;
      border: 2px solid #f56565;
    }

    .danger-icon {
      font-size: 2rem;
    }

    .danger-content h4 {
      margin: 0 0 8px 0;
      color: #742a2a;
    }

    .danger-content p {
      margin: 0;
      color: #c53030;
    }

    .progress-tips {
      background: rgba(255, 255, 255, 0.8);
      border-radius: 12px;
      padding: 20px;
      margin-top: 20px;
    }

    .progress-tips h4 {
      margin: 0 0 16px 0;
      color: #2d3748;
    }

    .tips-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .tip-item {
      padding: 8px 0;
      color: #4a5568;
      border-bottom: 1px solid #e2e8f0;
    }

    .tip-item:last-child {
      border-bottom: none;
    }

    @media (max-width: 768px) {
      .rank-progress-container {
        padding: 16px;
        margin: 12px 0;
      }
      
      .rank-header {
        flex-direction: column;
        gap: 16px;
      }
      
      .rank-nodes {
        flex-wrap: wrap;
        gap: 16px;
      }
      
      .rank-node {
        min-width: 80px;
      }
      
      .node-icon {
        font-size: 1.5rem;
      }
      
      .requirement-bars {
        gap: 12px;
      }
    }
  `]
})
export class RankProgressBarComponent {
  @Input() rangoActual!: TipoRango;
  @Input() puntos!: number;
  @Input() winRate!: number;
  @Input() partidosJugados: number = 0;
  @Input() victorias: number = 0;

  progreso!: ProgresoRango;
  consejos: string[] = [];
  umbralSiguiente: any;
  todosLosRangos: any[] = [];
  segmentosProgreso: any[] = [];

  // Exposer Math para el template
  Math = Math;

  ngOnInit() {
    this.calcularProgreso();
    this.generarSegmentosProgreso();
  }

  ngOnChanges() {
    this.calcularProgreso();
    this.generarSegmentosProgreso();
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
    
    // Preparar información de todos los rangos
    const rangos: TipoRango[] = ['COBRE', 'BRONCE', 'PLATA', 'ORO', 'PLATINO'];
    this.todosLosRangos = rangos.map(rango => obtenerInfoRango(rango));
  }

  private generarSegmentosProgreso() {
    const rangos: TipoRango[] = ['COBRE', 'BRONCE', 'PLATA', 'ORO', 'PLATINO'];
    const currentIndex = rangos.indexOf(this.rangoActual);
    
    this.segmentosProgreso = [];
    
    for (let i = 0; i < rangos.length - 1; i++) {
      const completado = i < currentIndex;
      const actual = i === currentIndex;
      let porcentaje = 0;
      
      if (completado) {
        porcentaje = 100;
      } else if (actual) {
        porcentaje = this.progreso.progresoTotal;
      }
      
      this.segmentosProgreso.push({
        completado,
        actual,
        porcentaje
      });
    }
  }

  obtenerIconoRango(rango: TipoRango): string {
    return obtenerInfoRango(rango).icono;
  }

  obtenerNombreRango(rango: TipoRango): string {
    return obtenerInfoRango(rango).nombre;
  }

  esRangoCompletado(rango: TipoRango): boolean {
    const rangos: TipoRango[] = ['COBRE', 'BRONCE', 'PLATA', 'ORO', 'PLATINO'];
    const currentIndex = rangos.indexOf(this.rangoActual);
    const rangoIndex = rangos.indexOf(rango);
    return rangoIndex < currentIndex;
  }

  esProximoRango(rango: TipoRango): boolean {
    return rango === this.umbralSiguiente?.siguienteRango;
  }
}
