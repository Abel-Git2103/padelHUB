import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { PlayerProfileService } from '../../services/player-profile.service';
import { ServicioAutenticacion } from '../../services/auth.service';
import { PlayerProfile } from '../../models/player-stats.model';
import { Usuario } from '../../models/user.model';
import { ProfileHistoryComponent } from './profile-history/profile-history.component';
import { RankBadgeComponent } from '../shared/rank-badge/rank-badge.component';
import { CompactRankProgressComponent } from '../shared/compact-rank-progress/compact-rank-progress.component';
import { IllustratedRankBarComponent } from '../shared/illustrated-rank-bar/illustrated-rank-bar.component';
import { TipoRango } from '../../models/rango.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ProfileHistoryComponent, RankBadgeComponent, IllustratedRankBarComponent],
  template: `
    <div class="profile-container" *ngIf="playerProfile">
      <div class="profile-header">
        <!-- Información básica del jugador -->
        <div class="player-basic-info">
          <div class="player-details">
            <div class="player-avatar">
              <div class="avatar-placeholder">
                {{ getPlayerInitials(playerProfile.usuario.nombreCompleto) }}
              </div>
            </div>

            <h1>{{ playerProfile.usuario.nombreCompleto }}</h1>

            <!-- Layout con rango a la izquierda y datos a la derecha -->
            <div class="player-info-layout">
              <!-- Sección del rango -->
              <div class="rank-section">
                <app-rank-badge
                  [rank]="playerProfile.usuario.rangoActual"
                  size="small"
                >
                </app-rank-badge>
              </div>

              <!-- Línea separadora -->
              <div class="separator-line"></div>

              <!-- Información del jugador en línea -->
              <div class="player-info-section">
                <div class="info-inline">
                  <span class="info-text">
                    Club:
                    <span class="info-value">{{
                      playerProfile.usuario.club.nombre
                    }}</span>
                  </span>
                  <span class="info-text">
                    Posición de juego:
                    <span class="info-value">{{ getPlayerPosition() }}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Navegación por pestañas -->
        <!-- <div class="tabs-navigation">
          <button
            *ngFor="let tab of tabs"
            [class]="'tab-btn ' + (activeTab === tab.id ? 'active' : '')"
            (click)="setActiveTab(tab.id)"
          >
            <i [class]="tab.icon"></i>
            <span>{{ tab.label }}</span>
          </button>
        </div> -->
      </div>

      <!-- Contenido de las pestañas -->
      <div class="tab-content">
        <!-- Estadísticas -->
        <div *ngIf="activeTab === 'stats'" class="stats-tab">
          <!-- Estadísticas temporada actual -->
          <div class="season-stats">
            <h2>Temporada 1</h2>
            <div class="season-stats-grid">
              <div class="season-stat-item total-matches">
                <span class="season-stat-value">{{ getTotalMatches() }}</span>
                <span class="season-stat-label">Partidos</span>
              </div>
              <div class="season-stat-divider"></div>
              <div class="season-stat-item victories">
                <span class="season-stat-value">{{
                  playerProfile.estadisticas.victorias
                }}</span>
                <span class="season-stat-label">Victorias</span>
              </div>
              <div class="season-stat-divider"></div>
              <div class="season-stat-item draws">
                <span class="season-stat-value">{{
                  playerProfile.estadisticas.empates
                }}</span>
                <span class="season-stat-label">Empates</span>
              </div>
              <div class="season-stat-divider"></div>
              <div class="season-stat-item defeats">
                <span class="season-stat-value">{{
                  playerProfile.estadisticas.derrotas
                }}</span>
                <span class="season-stat-label">Derrotas</span>
              </div>
            </div>
            
            <!-- Separador horizontal -->
            <div class="horizontal-separator"></div>
            
            <!-- Barra de progreso de ranking ilustrativa -->
            <app-illustrated-rank-bar
              [rangoActual]="playerProfile.usuario.rangoActual"
              [puntos]="getCurrentPoints()"
              [winRate]="getEfficiencyPercentage()"
              [partidosJugados]="getTotalMatches()"
              [victorias]="playerProfile.estadisticas.victorias">
            </app-illustrated-rank-bar>
          </div>

          <!-- Estadísticas temporada actual -->
          <div class="season-stats">
            <h2>Estadísticas temporada actual</h2>
            <div class="season-stats-grid">
              <div class="season-stat-item position">
                <span class="season-stat-value">{{ getCurrentPosition() }}</span>
                <span class="season-stat-label">Posición actual</span>
              </div>
              <div class="season-stat-divider"></div>
              
              <div class="season-stat-item points">
                <span class="season-stat-value">{{ getCurrentPoints() }}</span>
                <span class="season-stat-label">Puntos actuales</span>
              </div>
              <div class="season-stat-divider"></div>
              
              <div class="season-stat-item points-gained">
                <span class="season-stat-value gained">+{{ getPointsGained() }}</span>
                <span class="season-stat-label">Puntos ganados</span>
              </div>
              <div class="season-stat-divider"></div>
              
              <div class="season-stat-item points-lost">
                <span class="season-stat-value lost">-{{ getPointsLost() }}</span>
                <span class="season-stat-label">Puntos perdidos</span>
              </div>
            </div>
            
            <!-- Separador horizontal -->
            <div class="horizontal-separator"></div>
            
            <!-- Eficacia -->
            <div class="efficiency-section">
              <div class="efficiency-display">
                <div class="efficiency-circle" [style.--progress-deg]="getEfficiencyPercentage() * 3.6 + 'deg'">
                  <span class="efficiency-percentage">{{ getEfficiencyPercentage() }}%</span>
                </div>
                <span class="efficiency-label">Eficacia</span>
              </div>
            </div>
          </div>

          <!-- Rankings -->
          <div class="rankings">
            <h2>Rankings</h2>
            <div class="ranking-grid">
              <div class="ranking-item">
                <span class="ranking-label">🏟️ Ranking Club:</span>
                <span class="ranking-value"
                  >#{{ playerProfile.estadisticas.rankingClub.posicion }} de
                  {{ playerProfile.estadisticas.rankingClub.total }}</span
                >
              </div>
              <div class="ranking-item">
                <span class="ranking-label">🌎 Ranking Global:</span>
                <span class="ranking-value"
                  >#{{ playerProfile.estadisticas.rankingGlobal.posicion }} de
                  {{
                    (
                      playerProfile.estadisticas.rankingGlobal.total / 1000
                    ).toFixed(1)
                  }}K</span
                >
              </div>
            </div>
          </div>
        </div>

        <!-- Historial -->
        <div *ngIf="activeTab === 'history'" class="history-tab">
          <app-profile-history
            [historialPartidos]="playerProfile.historialPartidos"
            [usuarioId]="playerProfile.usuario.id"
            (onLoadMore)="loadMoreMatches()"
          >
          </app-profile-history>
        </div>

        <!-- Logros -->
        <div *ngIf="activeTab === 'achievements'" class="achievements-tab">
          <h2>Logros</h2>
          <div class="achievements-grid">
            <div
              *ngFor="let logro of playerProfile.logros"
              class="achievement-card"
              [class]="logro.desbloqueado ? 'unlocked' : 'locked'"
            >
              <div class="achievement-icon">{{ logro.icono }}</div>
              <h3>{{ logro.nombre }}</h3>
              <p>{{ logro.descripcion }}</p>
              <div
                *ngIf="logro.desbloqueado && logro.fechaConseguido"
                class="achievement-date"
              >
                Conseguido: {{ formatDate(logro.fechaConseguido) }}
              </div>
              <div
                *ngIf="!logro.desbloqueado && logro.progreso"
                class="achievement-progress"
              >
                {{ logro.progreso.actual }}/{{ logro.progreso.total }}
                {{ logro.progreso.unidad }}
              </div>
            </div>
          </div>
        </div>

        <!-- Configuración -->
        <div *ngIf="activeTab === 'settings'" class="settings-tab">
          <h2>Configuración</h2>
          <p>Panel de configuración del perfil (en desarrollo)</p>
        </div>
      </div>
    </div>

    <!-- Loading state -->
    <div class="loading-container" *ngIf="isLoading">
      <div class="loading-spinner"></div>
      <p>Cargando perfil...</p>
    </div>

    <!-- Error state -->
    <div class="error-container" *ngIf="error">
      <h2>Error al cargar el perfil</h2>
      <p>{{ error }}</p>
      <button class="retry-btn" (click)="loadPlayerProfile()">
        Reintentar
      </button>
    </div>
  `,
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  playerProfile: PlayerProfile | null = null;
  activeTab: 'stats' | 'history' | 'achievements' | 'settings' = 'stats';
  isLoading = true;
  error: string | null = null;
  isOwnProfile = false;

  private userId: string | null = null;
  private currentUserId: string | null = null;

  tabs = [
    { id: 'stats' as const, label: 'Estadísticas', icon: 'fas fa-chart-line' },
    { id: 'history' as const, label: 'Historial', icon: 'fas fa-history' },
    { id: 'achievements' as const, label: 'Logros', icon: 'fas fa-trophy' },
    { id: 'settings' as const, label: 'Configuración', icon: 'fas fa-cog' },
  ];

  constructor(
    private playerProfileService: PlayerProfileService,
    private authService: ServicioAutenticacion,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    // Obtener el usuario actual
    this.authService.usuarioActual$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user: Usuario | null) => {
        this.currentUserId = user?.id || null;
        this.checkIfOwnProfile();
      });

    // Obtener el ID del usuario del perfil desde la ruta
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.userId = params['id'] || this.currentUserId;
      this.checkIfOwnProfile();
      this.loadPlayerProfile();
    });

    // Obtener pestaña activa de query params
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((queryParams) => {
        if (queryParams['tab'] && this.isValidTab(queryParams['tab'])) {
          this.activeTab = queryParams['tab'];
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private checkIfOwnProfile(): void {
    this.isOwnProfile = this.userId === this.currentUserId;
  }

  private isValidTab(tab: string): boolean {
    return ['stats', 'history', 'achievements', 'settings'].includes(tab);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }

  loadPlayerProfile(): void {
    if (!this.userId) {
      this.error = 'ID de usuario no válido';
      this.isLoading = false;
      return;
    }

    this.isLoading = true;
    this.error = null;

    // Para desarrollo, usar datos mock
    setTimeout(() => {
      this.playerProfile = this.playerProfileService.getMockPlayerProfile();
      this.isLoading = false;
    }, 1000);

    // Código para producción (comentado por ahora)
    /*
    this.playerProfileService.getPlayerProfile(this.userId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (profile) => {
          this.playerProfile = profile;
          this.playerProfileService.updateLocalPlayerProfile(profile);
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading player profile:', error);
          this.error = 'No se pudo cargar el perfil del jugador';
          this.isLoading = false;
        }
      });
    */
  }

  setActiveTab(tab: 'stats' | 'history' | 'achievements' | 'settings'): void {
    this.activeTab = tab;
  }

  loadMoreMatches(): void {
    // Implementar carga de más partidos
    console.log('Cargando más partidos...');
  }

  getPlayerInitials(fullName: string): string {
    return fullName
      .split(' ')
      .map((name) => name.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  }

  getPlayerPosition(): string {
    if (this.playerProfile?.usuario.posicionJuego) {
      const posiciones = {
        DRIVE: 'Drive',
        REVES: 'Revés',
        AMBIDIESTRO: 'Ambidiestro',
      };
      return posiciones[this.playerProfile.usuario.posicionJuego];
    }
    return 'Drive'; // Valor por defecto
  }

  getTotalMatches(): number {
    if (this.playerProfile?.estadisticas) {
      return (
        this.playerProfile.estadisticas.victorias +
        this.playerProfile.estadisticas.empates +
        this.playerProfile.estadisticas.derrotas
      );
    }
    return 0;
  }

  getRankProgress(): number {
    // Simulación de progreso basado en efectividad
    // En producción, esto vendría del backend con la lógica real de ranking
    if (this.playerProfile?.estadisticas?.efectividad) {
      const efectividad = this.playerProfile.estadisticas.efectividad;
      // Convertir efectividad a progreso (0-100%)
      return Math.min(Math.round(efectividad), 100);
    }
    return 0;
  }

  getRankStatus(): string {
    const progress = this.getRankProgress();
    const totalMatches = this.getTotalMatches();
    
    if (totalMatches < 10) {
      return 'Necesitas más partidos para evaluar ranking';
    }
    
    if (progress >= 75) {
      return 'En camino al ascenso - ¡Sigue así!';
    } else if (progress >= 50) {
      return 'Mantén tu posición actual';
    } else if (progress >= 25) {
      return 'Riesgo de descenso - Mejora tu juego';
    } else {
      return 'Alto riesgo de descenso';
    }
  }

  getCurrentPosition(): number {
    // Simulación de posición actual basada en ranking del club
    if (this.playerProfile?.estadisticas?.rankingClub?.posicion) {
      return this.playerProfile.estadisticas.rankingClub.posicion;
    }
    return 3; // Valor por defecto
  }

  getCurrentPoints(): number {
    // Simulación de puntos actuales
    // En producción, esto vendría del backend
    const basePoints = 200;
    const victories = this.playerProfile?.estadisticas?.victorias || 0;
    const defeats = this.playerProfile?.estadisticas?.derrotas || 0;
    
    return basePoints + (victories * 10) - (defeats * 5);
  }

  getPointsGained(): number {
    // Simulación de puntos ganados
    const victories = this.playerProfile?.estadisticas?.victorias || 0;
    return victories * 20; // 20 puntos por victoria (ejemplo)
  }

  getPointsLost(): number {
    // Simulación de puntos perdidos
    const defeats = this.playerProfile?.estadisticas?.derrotas || 0;
    return defeats * 10; // 10 puntos por derrota (ejemplo)
  }

  getEfficiencyPercentage(): number {
    if (this.playerProfile?.estadisticas?.efectividad) {
      return Math.round(this.playerProfile.estadisticas.efectividad);
    }
    return 60; // Valor por defecto
  }
}
