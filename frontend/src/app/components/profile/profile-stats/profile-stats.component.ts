import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerStats, PlayerHistoricalStats } from '../../../models/player-stats.model';

@Component({
  selector: 'app-profile-stats',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="profile-stats" *ngIf="estadisticas">
      <!-- Estadísticas Temporada Actual -->
      <div class="stats-section">
        <h2 class="section-title">Estadísticas Temporada Actual</h2>
        
        <div class="stats-grid">
          <div class="stat-card victories">
            <div class="stat-icon">🏆</div>
            <div class="stat-content">
              <div class="stat-value">{{ estadisticas.victorias }}</div>
              <div class="stat-label">Victorias</div>
            </div>
          </div>

          <div class="stat-card draws">
            <div class="stat-icon">🤝</div>
            <div class="stat-content">
              <div class="stat-value">{{ estadisticas.empates }}</div>
              <div class="stat-label">Empates</div>
            </div>
          </div>

          <div class="stat-card defeats">
            <div class="stat-icon">❌</div>
            <div class="stat-content">
              <div class="stat-value">{{ estadisticas.derrotas }}</div>
              <div class="stat-label">Derrotas</div>
            </div>
          </div>

          <div class="stat-card total">
            <div class="stat-icon">📊</div>
            <div class="stat-content">
              <div class="stat-value">{{ estadisticas.totalPartidos }}</div>
              <div class="stat-label">Total partidos</div>
            </div>
          </div>
        </div>

        <!-- Efectividad -->
        <div class="effectiveness-card">
          <div class="effectiveness-header">
            <span class="icon">📈</span>
            <span class="label">% Efectividad</span>
          </div>
          <div class="effectiveness-value">{{ estadisticas.efectividad.toFixed(1) }}%</div>
          <div class="effectiveness-bar">
            <div 
              class="effectiveness-fill" 
              [style.width.%]="estadisticas.efectividad">
            </div>
          </div>
        </div>

        <!-- Racha actual -->
        <div class="streak-card">
          <div class="streak-icon">
            <span *ngIf="estadisticas.rachaActual.tipo === 'victorias'">🔥</span>
            <span *ngIf="estadisticas.rachaActual.tipo === 'derrotas'">❄️</span>
            <span *ngIf="estadisticas.rachaActual.tipo === 'empates'">⚖️</span>
          </div>
          <div class="streak-content">
            <div class="streak-title">Racha actual</div>
            <div class="streak-value">
              {{ estadisticas.rachaActual.cantidad }} 
              {{ getStreakLabel(estadisticas.rachaActual.tipo) }} consecutivas
            </div>
          </div>
        </div>

        <!-- Rankings -->
        <div class="rankings-section">
          <h3 class="subsection-title">Posiciones</h3>
          
          <div class="ranking-cards">
            <div class="ranking-card club">
              <div class="ranking-icon">🏟️</div>
              <div class="ranking-content">
                <div class="ranking-label">Ranking Club</div>
                <div class="ranking-value">
                  #{{ estadisticas.rankingClub.posicion }} de {{ estadisticas.rankingClub.total }}
                </div>
              </div>
            </div>

            <div class="ranking-card global">
              <div class="ranking-icon">🌎</div>
              <div class="ranking-content">
                <div class="ranking-label">Ranking Global</div>
                <div class="ranking-value">
                  #{{ estadisticas.rankingGlobal.posicion }} de {{ (estadisticas.rankingGlobal.total / 1000).toFixed(1) }}K
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Progreso hacia objetivos -->
        <div class="progress-section">
          <h3 class="subsection-title">Progreso</h3>
          
          <div class="progress-items">
            <div class="progress-item">
              <div class="progress-header">
                <span class="icon">🎯</span>
                <span class="label">Para torneo</span>
              </div>
              <div class="progress-value">
                {{ estadisticas.progresoObjetivos.torneoVictoriasRestantes }} victorias más
              </div>
            </div>

            <div class="progress-item">
              <div class="progress-header">
                <span class="icon">📈</span>
                <span class="label">Para ascenso</span>
              </div>
              <div class="progress-value">
                {{ estadisticas.progresoObjetivos.ascensoVictoriasRestantes }} victorias más
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Estadísticas Globales (Histórico) -->
      <div class="stats-section" *ngIf="estadisticasHistoricas">
        <h2 class="section-title">Estadísticas Globales (Histórico)</h2>
        
        <div class="historical-grid">
          <div class="historical-stat">
            <div class="stat-icon">📅</div>
            <div class="stat-content">
              <div class="stat-value">{{ estadisticasHistoricas.temporadasJugadas }}</div>
              <div class="stat-label">Temporadas jugadas</div>
            </div>
          </div>

          <div class="historical-stat">
            <div class="stat-icon">🏆</div>
            <div class="stat-content">
              <div class="stat-value">{{ estadisticasHistoricas.totalVictorias }}</div>
              <div class="stat-label">Total victorias</div>
            </div>
          </div>

          <div class="historical-stat">
            <div class="stat-icon">📊</div>
            <div class="stat-content">
              <div class="stat-value">{{ estadisticasHistoricas.totalPartidos }}</div>
              <div class="stat-label">Total partidos</div>
            </div>
          </div>

          <div class="historical-stat">
            <div class="stat-icon">🎖️</div>
            <div class="stat-content">
              <div class="stat-value">{{ estadisticasHistoricas.ascensosConseguidos }}</div>
              <div class="stat-label">Ascensos conseguidos</div>
            </div>
          </div>

          <div class="historical-stat">
            <div class="stat-icon">🏆</div>
            <div class="stat-content">
              <div class="stat-value">{{ estadisticasHistoricas.torneosGanados }}</div>
              <div class="stat-label">Torneos ganados</div>
            </div>
          </div>
        </div>

        <!-- Por Temporada -->
        <div class="seasons-section">
          <h3 class="subsection-title">Por Temporada</h3>
          
          <div class="seasons-list">
            <div 
              *ngFor="let temporada of estadisticasHistoricas.estadisticasPorTemporada"
              class="season-item"
              [class.current]="temporada.esActual">
              <div class="season-name">{{ temporada.temporada }}</div>
              <div class="season-stats">
                {{ temporada.victorias }}V-{{ temporada.empates }}E-{{ temporada.derrotas }}D
                <span *ngIf="temporada.esActual" class="current-badge">(actual)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./profile-stats.component.scss']
})
export class ProfileStatsComponent {
  @Input() estadisticas!: PlayerStats;
  @Input() estadisticasHistoricas!: PlayerHistoricalStats;

  getStreakLabel(tipo: 'victorias' | 'derrotas' | 'empates'): string {
    const labels = {
      'victorias': 'victorias',
      'derrotas': 'derrotas',
      'empates': 'empates'
    };
    return labels[tipo];
  }
}
