import { Component, OnInit, OnDestroy, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
import { TipoRango } from '../../models/rango.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ProfileHistoryComponent, RankBadgeComponent],
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
                  [rank]="getActualRank()"
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

        <!-- Navegación por pestañas - Estilo moderno con chips -->
        <div class="modern-tabs-navigation">
          <div class="tabs-container">
            <button
              *ngFor="let tab of tabs"
              [class]="'modern-tab-btn ' + (activeTab === tab.id ? 'active' : '')"
              (click)="setActiveTab(tab.id)"
            >
              <span class="tab-icon">{{ getTabIcon(tab.id) }}</span>
              <span class="tab-label">{{ tab.label }}</span>
              <span class="tab-indicator" *ngIf="activeTab === tab.id"></span>
            </button>
          </div>
        </div>
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
            
            <!-- Estadísticas adicionales de temporada -->
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
            
            <!-- Barra de progreso con zonas de riesgo -->
            <div class="rank-progress-section">
              <div class="rank-status-header">
                <h3>Estado del Ranking</h3>
              </div>
              
              <!-- Barra de progreso principal -->
              <div class="progress-bar-container">
                <!-- Badge del rango inferior (izquierda) -->
                <div class="rank-badge-left">
                  <app-rank-badge
                    [rank]="getLowerRank()"
                    size="small"
                  ></app-rank-badge>
                </div>
                
                <!-- Zona de descenso -->
                <div class="progress-zone danger" [style.width.%]="getDemotionZoneWidth()">
                  <span class="zone-label">🔻 Riesgo</span>
                </div>
                
                <!-- Zona segura hasta el final -->
                <div class="progress-zone safe" [style.width.%]="getSafeZoneWidth()">
                  <span class="zone-label">✅ Progreso hacia ascenso</span>
                </div>
                
                <!-- Relleno de progreso que cubre toda la barra -->
                <div class="progress-fill" [style.width.%]="getProgressFillPercentage()"></div>
                
                <!-- Badge del rango superior (derecha) -->
                <div class="rank-badge-right">
                  <app-rank-badge
                    [rank]="getUpperRank()"
                    size="small"
                  ></app-rank-badge>
                </div>

                <!-- Marcadores de límites -->
                <div class="limit-markers">
                  <!-- Límite de descenso -->
                  <div class="limit-marker demotion-limit" [style.left.%]="getDemotionThresholdPercentage()">
                    <div class="marker-line"></div>
                    <div class="marker-label">Descenso</div>
                  </div>
                </div>
              </div>
              
              <!-- Información detallada -->
              <div class="progress-details">
                <div class="detail-item">
                  <span class="detail-label">Para ascender:</span>
                  <span class="detail-value promotion">+{{ getPointsToPromotion() }} puntos</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Para descender:</span>
                  <span class="detail-value demotion">-{{ getPointsToDescend() }} puntos</span>
                </div>
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
                <span class="efficiency-label">Eficacia últimos 5 partidos</span>
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
  // Eliminado Subject manual; usamos takeUntilDestroyed en pipes

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

  private destroyRef = inject(DestroyRef);

  constructor(
    private playerProfileService: PlayerProfileService,
    private authService: ServicioAutenticacion,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    // Obtener el usuario actual
    this.authService.usuarioActual$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((user: Usuario | null) => {
        this.currentUserId = user?.id || null;
        this.checkIfOwnProfile();
      });

    // Obtener el ID del usuario del perfil desde la ruta
  this.route.params.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      this.userId = params['id'] || this.currentUserId;
      this.checkIfOwnProfile();
      this.loadPlayerProfile();
    });

    // Obtener pestaña activa de query params
    this.route.queryParams
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((queryParams) => {
        if (queryParams['tab'] && this.isValidTab(queryParams['tab'])) {
          this.activeTab = queryParams['tab'];
        }
      });
  }

  ngOnDestroy(): void {
    // Limpieza automática gestionada por takeUntilDestroyed
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
    // Para testing: devolver 121 puntos (por encima del umbral de ascenso a ORO)
    // PLATA necesita 120 puntos para ascender a ORO
    // 121 puntos = ya debería estar en ORO (ascenso automático)
    return 121;
    
    // Código original comentado para referencia
    /*
    // Simulación de puntos actuales
    // En producción, esto vendría del backend
    // Ajustado para rango PLATA con nuevos umbrales (80-119 puntos)
    const basePoints = 45; // Base dentro del rango PLATA
    const victories = this.playerProfile?.estadisticas?.victorias || 0;
    const defeats = this.playerProfile?.estadisticas?.derrotas || 0;
    
    // Fórmula ajustada para mantener puntos en rango PLATA
    const calculatedPoints = basePoints + (victories * 1) - (defeats * 0.5);
    
    // Asegurar que los puntos estén dentro del rango PLATA (35-69)
    return Math.max(35, Math.min(69, calculatedPoints));
    */
  }

  // Método para calcular el rango actual basado en los puntos (ascenso automático)
  getActualRank(): string {
    const currentPoints = this.getCurrentPoints();
    
    // Umbrales de ascenso - Valores actualizados
    if (currentPoints >= 150) return 'PLATINO';
    if (currentPoints >= 120) return 'ORO';
    if (currentPoints >= 80) return 'PLATA';
    if (currentPoints >= 50) return 'BRONCE';
    return 'COBRE';
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
    // Calcular eficacia basada en los últimos 5 partidos
    if (this.playerProfile?.historialPartidos && this.playerProfile.historialPartidos.length > 0) {
      // Obtener los últimos 5 partidos
      const last5Matches = this.playerProfile.historialPartidos
        .slice(0, 5) // Tomar los primeros 5 (ya están ordenados por fecha más reciente)
        .filter(partido => partido.resultado !== undefined); // Solo partidos con resultado
      
      if (last5Matches.length === 0) return 60; // Valor por defecto si no hay partidos
      
      let victorias = 0;
      const totalPartidos = last5Matches.length;
      
      // Contar victorias en los últimos partidos
      last5Matches.forEach(partido => {
        // Verificar si el resultado fue victoria para el jugador
        if (partido.resultado === 'victoria') {
          victorias++;
        }
      });
      
      // Calcular eficacia: (victorias / total) * 100
      const eficacia = Math.round((victorias / totalPartidos) * 100);
      
      console.log('Debug Eficacia últimos 5 partidos:', {
        totalPartidos: totalPartidos,
        victorias: victorias,
        eficacia: eficacia + '%',
        partidos: last5Matches.map(p => ({
          fecha: p.fecha,
          resultado: p.resultado,
          sets: `${p.sets.set1}${p.sets.set2 ? ', ' + p.sets.set2 : ''}${p.sets.set3 ? ', ' + p.sets.set3 : ''}`
        }))
      });
      
      return eficacia;
    }
    
    return 60; // Valor por defecto si no hay historial
  }

  getTabIcon(tabId: 'stats' | 'history' | 'achievements' | 'settings'): string {
    const icons = {
      'stats': '📊',
      'history': '📋',
      'achievements': '🏆',
      'settings': '⚙️'
    };
    return icons[tabId];
  }

  // Métodos para la nueva barra de progreso con zonas
  getRankName(): string {
    const rankNames = {
      'COBRE': 'Cobre',
      'BRONCE': 'Bronce', 
      'PLATA': 'Plata',
      'ORO': 'Oro',
      'PLATINO': 'Platino'
    };
    return rankNames[this.playerProfile?.usuario.rangoActual || 'PLATA'];
  }

  getDemotionZoneWidth(): number {
    // Zona visual de descenso más pequeña y fija para mejor visualización
    return 20; // 20% fijo para zona de descenso visual
  }

  getSafeZoneWidth(): number {
    // La zona segura ocupa el resto del espacio después de la zona de descenso
    return 80; // 80% para zona segura (100% - 20% de zona de descenso)
  }

  getPromotionZoneWidth(): number {
    // Ya no hay zona de ascenso específica
    return 0;
  }

  getCurrentPositionPercentage(): number {
    // Usar la misma lógica que la marca: degradación como 0%, ascenso como 100%
    const currentPoints = this.getCurrentPoints();
    const currentRank = this.getActualRank(); // Usar rango calculado automáticamente
    
    // Umbrales de degradación - Valores actualizados (0% de referencia)
    const demotionThresholds: { [key: string]: number } = {
      'BRONCE': 44,   // 0% para BRONCE
      'PLATA': 74,    // 0% para PLATA  
      'ORO': 114,     // 0% para ORO
      'PLATINO': 114  // 0% para PLATINO
    };
    
    // Umbrales de ascenso - Valores actualizados (100% de referencia)
    const promotionThresholds: { [key: string]: number } = {
      'BRONCE': 80,   // 100% para BRONCE
      'PLATA': 120,   // 100% para PLATA
      'ORO': 150,     // 100% para ORO
      'PLATINO': 150  // 100% para PLATINO
    };
    
    const demotionThreshold = demotionThresholds[currentRank];
    const promotionThreshold = promotionThresholds[currentRank];
    
    if (!demotionThreshold || !promotionThreshold) return 0;
    
    // Rango total: desde degradación (0%) hasta ascenso (100%)
    const totalRange = promotionThreshold - demotionThreshold;
    
    // Regla de tres: (currentPoints - demotionThreshold) / totalRange * 100
    const percentage = ((currentPoints - demotionThreshold) / totalRange) * 100;
    return Math.max(0, Math.min(100, percentage));
  }

  getProgressFillPercentage(): number {
    // Usar la misma lógica que la marca: degradación como 0%, ascenso como 100%
    const currentPoints = this.getCurrentPoints();
    const currentRank = this.getActualRank(); // Usar rango calculado automáticamente
    
    // Umbrales de degradación - Valores actualizados (0% de referencia)
    const demotionThresholds: { [key: string]: number } = {
      'BRONCE': 44,   // 0% para BRONCE
      'PLATA': 74,    // 0% para PLATA  
      'ORO': 114,     // 0% para ORO
      'PLATINO': 114  // 0% para PLATINO
    };
    
    // Umbrales de ascenso - Valores actualizados (100% de referencia)
    const promotionThresholds: { [key: string]: number } = {
      'BRONCE': 80,   // 100% para BRONCE
      'PLATA': 120,   // 100% para PLATA
      'ORO': 150,     // 100% para ORO
      'PLATINO': 150  // 100% para PLATINO
    };
    
    const demotionThreshold = demotionThresholds[currentRank];
    const promotionThreshold = promotionThresholds[currentRank];
    
    if (!demotionThreshold || !promotionThreshold) return 0;
    
    // Rango total: desde degradación (0%) hasta ascenso (100%)
    const totalRange = promotionThreshold - demotionThreshold;
    
    // Regla de tres: (currentPoints - demotionThreshold) / totalRange * 100
    const percentage = ((currentPoints - demotionThreshold) / totalRange) * 100;
    const result = Math.max(0, Math.min(100, percentage));
    
    console.log('Debug Progress Fill (ascenso automático):', {
      currentPoints,
      actualRank: currentRank,
      demotionThreshold: demotionThreshold + ' (0%)',
      promotionThreshold: promotionThreshold + ' (100%)',
      totalRange: totalRange + ' puntos',
      percentage: percentage.toFixed(2) + '%',
      result: result.toFixed(2) + '%'
    });
    
    return result;
  }

  getDemotionThresholdPercentage(): number {
    // La marca aparece 6 puntos por encima del umbral de degradación
    const currentRank = this.getActualRank(); // Usar rango calculado automáticamente
    
    // Umbrales de degradación - Valores actualizados (0% de referencia)
    const demotionThresholds: { [key: string]: number } = {
      'BRONCE': 44,   // 0% para BRONCE
      'PLATA': 74,    // 0% para PLATA  
      'ORO': 114,     // 0% para ORO
      'PLATINO': 114  // 0% para PLATINO
    };
    
    // Umbrales de ascenso - Valores actualizados (100% de referencia)
    const promotionThresholds: { [key: string]: number } = {
      'BRONCE': 80,   // 100% para BRONCE
      'PLATA': 120,   // 100% para PLATA
      'ORO': 150,     // 100% para ORO
      'PLATINO': 150  // 100% para PLATINO
    };
    
    const demotionThreshold = demotionThresholds[currentRank];
    const promotionThreshold = promotionThresholds[currentRank];
    
    if (!demotionThreshold || !promotionThreshold) return 0;
    
    // Calcular posición de la marca: umbral de degradación + 6 puntos
    const markPosition = demotionThreshold + 6;
    
    // Rango total: desde degradación (0%) hasta ascenso (100%)
    const totalRange = promotionThreshold - demotionThreshold;
    
    // Regla de tres: (markPosition - demotionThreshold) / totalRange * 100
    const percentage = ((markPosition - demotionThreshold) / totalRange) * 100;
    const result = Math.max(0, Math.min(100, percentage));
    
    console.log('Debug Demotion Mark (ascenso automático):', {
      actualRank: currentRank,
      demotionThreshold: demotionThreshold + ' (0%)',
      promotionThreshold: promotionThreshold + ' (100%)',
      markPosition: markPosition + ' puntos',
      totalRange: totalRange + ' puntos',
      percentage: percentage.toFixed(1) + '%',
      result: result.toFixed(1) + '%'
    });
    
    return result;
  }

  getPointsToPromotion(): number {
    const currentPoints = this.getCurrentPoints();
    const currentRank = this.getActualRank(); // Usar rango calculado automáticamente
    
    // Umbrales de ascenso según documento - Valores actualizados
    const promotionThresholds: { [key: string]: number } = {
      'BRONCE': 80,   // Para ascender a PLATA
      'PLATA': 120,   // Para ascender a ORO
      'ORO': 150      // Para ascender a PLATINO
    };
    
    const threshold = promotionThresholds[currentRank];
    return threshold ? Math.max(0, threshold - currentPoints) : 0;
  }

  getPointsAboveDemotion(): number {
    const currentPoints = this.getCurrentPoints();
    const currentRank = this.getActualRank(); // Usar rango calculado automáticamente
    
    // Umbrales de degradación según documento - Valores actualizados
    const demotionThresholds: { [key: string]: number } = {
      'BRONCE': 44,   // Descender a COBRE
      'PLATA': 74,    // Descender a BRONCE
      'ORO': 114,     // Descender a PLATA
      'PLATINO': 114  // Descender a ORO
    };
    
    const threshold = demotionThresholds[currentRank];
    return threshold ? Math.max(0, currentPoints - threshold) : 0;
  }

  getPointsToDescend(): number {
    const currentPoints = this.getCurrentPoints();
    const currentRank = this.getActualRank(); // Usar rango calculado automáticamente
    
    // Umbrales de degradación según documento - Valores actualizados
    const demotionThresholds: { [key: string]: number } = {
      'BRONCE': 44,   // Descender a COBRE
      'PLATA': 74,    // Descender a BRONCE
      'ORO': 114,     // Descender a PLATA
      'PLATINO': 114  // Descender a ORO
    };
    
    const threshold = demotionThresholds[currentRank];
    if (!threshold) return 0;
    
    // Calcular cuántos puntos necesita perder para descender
    const pointsToLose = currentPoints - threshold;
    return Math.max(0, pointsToLose + 1); // +1 para estar por debajo del umbral
  }

  getTrendClass(): string {
    const victories = this.playerProfile?.estadisticas?.victorias || 0;
    const defeats = this.playerProfile?.estadisticas?.derrotas || 0;
    
    if (victories > defeats * 1.5) return 'trending-up';
    if (defeats > victories * 1.5) return 'trending-down';
    return 'trending-stable';
  }

  getTrendText(): string {
    const trendClass = this.getTrendClass();
    const trends: { [key: string]: string } = {
      'trending-up': '📈 Ascendente',
      'trending-down': '📉 Descendente', 
      'trending-stable': '➡️ Estable'
    };
    return trends[trendClass] || '➡️ Estable';
  }

  // Métodos para los badges de rangos adyacentes
  getLowerRank(): TipoRango {
    const currentRank = this.getActualRank(); // Usar rango calculado automáticamente
    const rankOrder: TipoRango[] = ['COBRE', 'BRONCE', 'PLATA', 'ORO', 'PLATINO'];
    const currentIndex = rankOrder.indexOf(currentRank as TipoRango);
    
    if (currentIndex > 0) {
      return rankOrder[currentIndex - 1];
    }
    return 'COBRE'; // Si ya está en el rango más bajo, mostrar COBRE
  }

  getUpperRank(): TipoRango {
    const currentRank = this.getActualRank(); // Usar rango calculado automáticamente
    const rankOrder: TipoRango[] = ['COBRE', 'BRONCE', 'PLATA', 'ORO', 'PLATINO'];
    const currentIndex = rankOrder.indexOf(currentRank as TipoRango);
    
    if (currentIndex < rankOrder.length - 1) {
      return rankOrder[currentIndex + 1];
    }
    return 'PLATINO'; // Si ya está en el rango más alto, mostrar PLATINO
  }

  getLowerRankName(): string {
    const currentRank = this.playerProfile?.usuario.rangoActual || 'PLATA';
    const rankOrder = ['COBRE', 'BRONCE', 'PLATA', 'ORO', 'PLATINO'];
    const currentIndex = rankOrder.indexOf(currentRank);
    
    if (currentIndex > 0) {
      const lowerRank = rankOrder[currentIndex - 1];
      const rankNames: { [key: string]: string } = {
        'COBRE': 'Cobre',
        'BRONCE': 'Bronce', 
        'PLATA': 'Plata',
        'ORO': 'Oro',
        'PLATINO': 'Platino'
      };
      return rankNames[lowerRank];
    }
    return 'Min'; // Si ya está en el rango más bajo
  }

  getUpperRankName(): string {
    const currentRank = this.playerProfile?.usuario.rangoActual || 'PLATA';
    const rankOrder = ['COBRE', 'BRONCE', 'PLATA', 'ORO', 'PLATINO'];
    const currentIndex = rankOrder.indexOf(currentRank);
    
    if (currentIndex < rankOrder.length - 1) {
      const upperRank = rankOrder[currentIndex + 1];
      const rankNames: { [key: string]: string } = {
        'COBRE': 'Cobre',
        'BRONCE': 'Bronce', 
        'PLATA': 'Plata',
        'ORO': 'Oro',
        'PLATINO': 'Platino'
      };
      return rankNames[upperRank];
    }
    return 'Max'; // Si ya está en el rango más alto
  }

  getLowerRankMaxPoints(): string {
    const currentRank = this.playerProfile?.usuario.rangoActual || 'PLATA';
    const rankThresholds: { [key: string]: number } = {
      'BRONCE': 29,   // Máximo de COBRE (BRONCE empieza en 30)
      'PLATA': 49,    // Máximo de BRONCE (PLATA empieza en 50)  
      'ORO': 69,      // Máximo de PLATA (ORO empieza en 70)
      'PLATINO': 89   // Máximo de ORO (PLATINO empieza en 90)
    };
    
    const maxPoints = rankThresholds[currentRank];
    return maxPoints ? `${maxPoints}` : '0';
  }

  getUpperRankMinPoints(): string {
    const currentRank = this.playerProfile?.usuario.rangoActual || 'PLATA';
    const rankThresholds: { [key: string]: number } = {
      'COBRE': 30,    // Mínimo de BRONCE
      'BRONCE': 50,   // Mínimo de PLATA
      'PLATA': 70,    // Mínimo de ORO
      'ORO': 90       // Mínimo de PLATINO
    };
    
    const minPoints = rankThresholds[currentRank];
    return minPoints ? `${minPoints}` : '∞';
  }
}
