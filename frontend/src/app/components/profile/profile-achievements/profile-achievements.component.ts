import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Achievement } from '../../../models/player-stats.model';

@Component({
  selector: 'app-profile-achievements',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="profile-achievements">
      <!-- Logros Desbloqueados -->
      <div class="achievements-section unlocked" *ngIf="getUnlockedAchievements().length > 0">
        <h2 class="section-title">
          <span class="title-icon">🏆</span>
          Logros Desbloqueados
        </h2>
        
        <div class="achievements-grid">
          <div 
            *ngFor="let logro of getUnlockedAchievements(); trackBy: trackByAchievementId"
            class="achievement-card unlocked-card">
            
            <div class="achievement-icon">{{ logro.icono }}</div>
            
            <div class="achievement-content">
              <h3 class="achievement-name">{{ logro.nombre }}</h3>
              <p class="achievement-description">{{ logro.descripcion }}</p>
              
              <div class="achievement-date" *ngIf="logro.fechaConseguido">
                <span class="date-icon">🗓️</span>
                <span class="date-text">Conseguido: {{ formatDate(logro.fechaConseguido) }}</span>
              </div>
            </div>

            <div class="achievement-badge">
              <span class="badge-icon">✅</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Logros Próximos a Conseguir -->
      <div class="achievements-section locked" *ngIf="getLockedAchievements().length > 0">
        <h2 class="section-title">
          <span class="title-icon">🎯</span>
          Logros Próximos a Conseguir
        </h2>
        
        <div class="achievements-grid">
          <div 
            *ngFor="let logro of getLockedAchievements(); trackBy: trackByAchievementId"
            class="achievement-card locked-card">
            
            <div class="achievement-icon locked">{{ logro.icono }}</div>
            
            <div class="achievement-content">
              <h3 class="achievement-name">{{ logro.nombre }}</h3>
              <p class="achievement-description">{{ logro.descripcion }}</p>
              
              <div class="achievement-progress" *ngIf="logro.progreso">
                <div class="progress-label">
                  <span class="progress-icon">📊</span>
                  <span class="progress-text">Progreso:</span>
                </div>
                <div class="progress-info">
                  {{ logro.progreso.actual }} {{ logro.progreso.unidad }} 
                  <span *ngIf="logro.progreso.total > 0">/ {{ logro.progreso.total }}</span>
                </div>
                
                <!-- Barra de progreso -->
                <div class="progress-bar" *ngIf="logro.progreso.total > 0">
                  <div 
                    class="progress-fill" 
                    [style.width.%]="getProgressPercentage(logro.progreso)">
                  </div>
                </div>
              </div>
            </div>

            <div class="achievement-badge">
              <span class="badge-icon">🔒</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Estadísticas de Logros -->
      <div class="achievements-stats-section">
        <h2 class="section-title">
          <span class="title-icon">📈</span>
          Estadísticas de Logros
        </h2>
        
        <div class="stats-grid">
          <div class="stat-card unlocked">
            <div class="stat-icon">🏅</div>
            <div class="stat-content">
              <div class="stat-value">{{ getUnlockedAchievements().length }}</div>
              <div class="stat-label">Logros desbloqueados</div>
            </div>
          </div>

          <div class="stat-card total">
            <div class="stat-icon">🎖️</div>
            <div class="stat-content">
              <div class="stat-value">{{ logros.length }}</div>
              <div class="stat-label">Total de logros</div>
            </div>
          </div>

          <div class="stat-card progress">
            <div class="stat-icon">📊</div>
            <div class="stat-content">
              <div class="stat-value">{{ getCompletionPercentage() }}%</div>
              <div class="stat-label">Progreso general</div>
            </div>
          </div>

          <div class="stat-card next" *ngIf="getNextAchievement()">
            <div class="stat-icon">🎯</div>
            <div class="stat-content">
              <div class="stat-value">{{ getNextAchievement()?.nombre }}</div>
              <div class="stat-label">Siguiente objetivo</div>
            </div>
          </div>
        </div>

        <!-- Progreso general -->
        <div class="overall-progress">
          <div class="progress-header">
            <span class="progress-label">Progreso de Completación</span>
            <span class="progress-percentage">{{ getCompletionPercentage() }}%</span>
          </div>
          <div class="progress-bar-container">
            <div 
              class="progress-bar-fill" 
              [style.width.%]="getCompletionPercentage()">
            </div>
          </div>
          <div class="progress-footer">
            <span>{{ getUnlockedAchievements().length }} de {{ logros.length }} logros completados</span>
          </div>
        </div>
      </div>

      <!-- Estado vacío -->
      <div class="empty-state" *ngIf="logros.length === 0">
        <div class="empty-icon">🏆</div>
        <h3>No hay logros disponibles</h3>
        <p>Los logros aparecerán aquí cuando estén configurados en el sistema.</p>
      </div>
    </div>
  `,
  styleUrls: ['./profile-achievements.component.scss']
})
export class ProfileAchievementsComponent {
  @Input() logros: Achievement[] = [];

  trackByAchievementId(index: number, achievement: Achievement): string {
    return achievement.id;
  }

  getUnlockedAchievements(): Achievement[] {
    return this.logros.filter(logro => logro.desbloqueado);
  }

  getLockedAchievements(): Achievement[] {
    return this.logros.filter(logro => !logro.desbloqueado);
  }

  getCompletionPercentage(): number {
    if (this.logros.length === 0) return 0;
    return Math.round((this.getUnlockedAchievements().length / this.logros.length) * 100);
  }

  getNextAchievement(): Achievement | null {
    const locked = this.getLockedAchievements();
    // Priorizar logros con progreso
    const withProgress = locked.filter(l => l.progreso && l.progreso.actual > 0);
    if (withProgress.length > 0) {
      return withProgress[0];
    }
    return locked.length > 0 ? locked[0] : null;
  }

  getProgressPercentage(progreso: { actual: number; total: number; unidad: string }): number {
    if (progreso.total <= 0) return 0;
    return Math.min(100, (progreso.actual / progreso.total) * 100);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
}
