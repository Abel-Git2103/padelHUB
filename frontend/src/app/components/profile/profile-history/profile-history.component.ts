import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchHistory } from '../../../models/player-stats.model';

@Component({
  selector: 'app-profile-history',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="profile-history">
      <div class="history-section">
        <h2 class="section-title">Historial de partidos</h2>
        
        <div class="matches-list" *ngIf="historialPartidos.length > 0; else noMatches">
          <div 
            *ngFor="let partido of historialPartidos; trackBy: trackByMatchId"
            class="match-card"
            [class]="'match-' + partido.resultado">
            
            <!-- Header del partido -->
            <div class="match-header">
              <div class="match-date-time">
                <span class="date">{{ formatDateLong(partido.fecha) }}</span>
                <span class="time">{{ formatTime(partido.fecha) }}</span>
              </div>
              <div class="match-location">Winner Sports Reus</div>
            </div>

            <!-- Contenido del partido -->
            <div class="match-content">
              <!-- Equipo 1 -->
              <div class="team-section team-1">
                <div class="team-players">
                  <div class="player">
                    <div class="player-avatar">{{ getPlayerInitials(partido.jugadores.equipo1.jugador1) }}</div>
                    <div class="player-name">{{ partido.jugadores.equipo1.jugador1 }}</div>
                  </div>
                  <div class="player">
                    <div class="player-avatar">{{ getPlayerInitials(partido.jugadores.equipo1.jugador2) }}</div>
                    <div class="player-name">{{ partido.jugadores.equipo1.jugador2 }}</div>
                  </div>
                </div>
              </div>

              <!-- Sets -->
              <div class="sets-section">
                <div class="sets-container">
                  <div class="set-result" 
                       *ngFor="let set of getSetsArray(partido.sets); let i = index"
                       [class]="'set-' + (i + 1)">
                    <span class="set-label">Set {{ i + 1 }}</span>
                    <span class="set-score" [class]="getSetWinnerClass(set, partido.resultado)">{{ set }}</span>
                  </div>
                </div>
              </div>

              <!-- Equipo 2 -->
              <div class="team-section team-2">
                <div class="team-players">
                  <div class="player">
                    <div class="player-avatar">{{ getPlayerInitials(partido.jugadores.equipo2.jugador1) }}</div>
                    <div class="player-name">{{ partido.jugadores.equipo2.jugador1 }}</div>
                  </div>
                  <div class="player">
                    <div class="player-avatar">{{ getPlayerInitials(partido.jugadores.equipo2.jugador2) }}</div>
                    <div class="player-name">{{ partido.jugadores.equipo2.jugador2 }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ng-template #noMatches>
          <div class="no-matches">
            <div class="no-matches-icon">🎾</div>
            <h3>No hay partidos registrados</h3>
            <p>Los partidos aparecerán aquí una vez que comiences a jugar.</p>
          </div>
        </ng-template>

        <!-- Botón cargar más -->
        <div class="load-more-section" *ngIf="historialPartidos.length > 0">
          <button 
            class="load-more-btn"
            (click)="loadMore()"
            [disabled]="isLoading">
            <span *ngIf="!isLoading">📄 VER HISTORIAL COMPLETO</span>
            <span *ngIf="isLoading">⏳ Cargando...</span>
          </button>
        </div>
      </div>

      <!-- Estadísticas rápidas del historial -->
      <div class="history-stats-section">
        <h3 class="section-title">Resumen de Historial</h3>
        
        <div class="quick-stats">
          <div class="quick-stat victories">
            <div class="stat-icon">🏆</div>
            <div class="stat-content">
              <div class="stat-value">{{ getVictoriesCount() }}</div>
              <div class="stat-label">Victorias</div>
            </div>
          </div>

          <div class="quick-stat defeats">
            <div class="stat-icon">❌</div>
            <div class="stat-content">
              <div class="stat-value">{{ getDefeatsCount() }}</div>
              <div class="stat-label">Derrotas</div>
            </div>
          </div>

          <div class="quick-stat draws">
            <div class="stat-icon">🤝</div>
            <div class="stat-content">
              <div class="stat-value">{{ getDrawsCount() }}</div>
              <div class="stat-label">Empates</div>
            </div>
          </div>

          <div class="quick-stat total">
            <div class="stat-icon">📊</div>
            <div class="stat-content">
              <div class="stat-value">{{ historialPartidos.length || 0 }}</div>
              <div class="stat-label">Total mostrado</div>
            </div>
          </div>
        </div>

        <!-- Últimos resultados (racha) -->
        <div class="recent-streak">
          <h4 class="streak-title">Últimos 5 resultados</h4>
          <div class="streak-indicators">
            <div 
              *ngFor="let partido of getRecentMatches(); trackBy: trackByMatchId"
              class="streak-dot"
              [class]="'dot-' + partido.resultado"
              [title]="getResultLabel(partido.resultado) + ' - ' + formatDate(partido.fecha)">
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./profile-history.component.scss']
})
export class ProfileHistoryComponent {
  @Input() historialPartidos: MatchHistory[] = [];
  @Input() usuarioId!: string;
  
  @Output() onLoadMore = new EventEmitter<void>();

  isLoading = false;

  trackByMatchId(index: number, match: MatchHistory): string {
    return match.id;
  }

  getResultLabel(resultado: 'victoria' | 'derrota' | 'empate'): string {
    const labels = {
      'victoria': 'Victoria',
      'derrota': 'Derrota',
      'empate': 'Empate'
    };
    return labels[resultado];
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  formatDateShort(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short'
    });
  }

  formatDateLong(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

  formatTime(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getPlayerInitials(playerName: string): string {
    if (!playerName) return '';
    const names = playerName.split(' ');
    if (names.length >= 2) {
      return (names[0][0] + names[1][0]).toUpperCase();
    }
    return playerName[0]?.toUpperCase() || '';
  }

  getResultIcon(resultado: 'victoria' | 'derrota' | 'empate'): string {
    const icons = {
      'victoria': 'fas fa-trophy',
      'derrota': 'fas fa-times',
      'empate': 'fas fa-handshake'
    };
    return icons[resultado];
  }

  getSetsArray(sets: { set1: string; set2: string; set3?: string }): string[] {
    const setsArray = [sets.set1, sets.set2];
    if (sets.set3) {
      setsArray.push(sets.set3);
    }
    return setsArray;
  }

  getSetWinnerClass(setScore: string, matchResult: 'victoria' | 'derrota' | 'empate'): string {
    if (matchResult === 'empate') return 'tie';
    
    // Analizar el score del set (formato: "6-4", "7-5", etc.)
    const scores = setScore.split('-');
    if (scores.length === 2) {
      const score1 = parseInt(scores[0]);
      const score2 = parseInt(scores[1]);
      
      // Si ganamos el set
      if (score1 > score2) {
        return 'won';
      } 
      // Si perdemos el set
      else if (score2 > score1) {
        return 'lost';
      }
      // Si es empate en el set
      else {
        return 'tie';
      }
    }
    
    return 'won'; // Por defecto
  }

  getVictoriesCount(): number {
    return this.historialPartidos?.filter(p => p.resultado === 'victoria').length || 0;
  }

  getDefeatsCount(): number {
    return this.historialPartidos?.filter(p => p.resultado === 'derrota').length || 0;
  }

  getDrawsCount(): number {
    return this.historialPartidos?.filter(p => p.resultado === 'empate').length || 0;
  }

  getRecentMatches(): MatchHistory[] {
    return this.historialPartidos?.slice(0, 5) || [];
  }

  loadMore(): void {
    this.isLoading = true;
    this.onLoadMore.emit();
    
    // Simular tiempo de carga
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }
}
