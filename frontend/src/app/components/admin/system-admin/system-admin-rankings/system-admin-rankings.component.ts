import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminBaseComponent } from '../../shared/admin-base.component';

@Component({
  selector: 'app-system-admin-rankings',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="system-admin-page">
      <div class="page-header">
        <h1>Rankings Globales</h1>
        <p>Sistema de clasificaciones general de la plataforma</p>
      </div>
      
      <div class="rankings-overview">
        <div class="ranking-stats">
          <div class="stat-card">
            <div class="stat-icon">🏆</div>
            <div class="stat-content">
              <h3>{{ totalJugadores() }}</h3>
              <p>Jugadores Activos</p>
            </div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon">🏅</div>
            <div class="stat-content">
              <h3>{{ clubesActivos() }}</h3>
              <p>Clubes Participantes</p>
            </div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon">⚡</div>
            <div class="stat-content">
              <h3>{{ partidosHoy() }}</h3>
              <p>Partidos Hoy</p>
            </div>
          </div>
        </div>
        
        <div class="ranking-filters">
          <select class="filter-select">
            <option>Ranking Nacional</option>
            <option>Ranking Regional</option>
            <option>Por Clubes</option>
            <option>Por Categorías</option>
          </select>
          
          <select class="filter-select">
            <option>Último mes</option>
            <option>Últimos 3 meses</option>
            <option>Último año</option>
            <option>Histórico</option>
          </select>
        </div>
      </div>
      
      <div class="rankings-table">
        <div class="table-header">
          <div class="col-position">#</div>
          <div class="col-player">Jugador</div>
          <div class="col-club">Club</div>
          <div class="col-points">Puntos</div>
          <div class="col-games">Partidos</div>
          <div class="col-winrate">% Victoria</div>
          <div class="col-trend">Tendencia</div>
        </div>
        
        <div class="table-row" *ngFor="let jugador of topJugadores(); let i = index">
          <div class="col-position">
            <span class="position-number" [class]="getPositionClass(i + 1)">{{ i + 1 }}</span>
          </div>
          <div class="col-player">
            <div class="player-info">
              <div class="player-avatar">{{ jugador.nombre.charAt(0) }}</div>
              <div class="player-details">
                <span class="player-name">{{ jugador.nombre }}</span>
                <span class="player-category">{{ jugador.categoria }}</span>
              </div>
            </div>
          </div>
          <div class="col-club">
            <span class="club-name">{{ jugador.club }}</span>
          </div>
          <div class="col-points">
            <span class="points">{{ jugador.puntos }}</span>
          </div>
          <div class="col-games">{{ jugador.partidos }}</div>
          <div class="col-winrate">{{ jugador.porcentajeVictorias }}%</div>
          <div class="col-trend">
            <span class="trend" [class]="jugador.tendencia.toLowerCase()">
              {{ getTrendIcon(jugador.tendencia) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .system-admin-page { padding: 0; }
    .page-header { margin-bottom: 32px; }
    .page-header h1 { font-size: 32px; font-weight: 700; color: #1e293b; margin: 0 0 8px 0; }
    .page-header p { font-size: 16px; color: #64748b; margin: 0; }
    .rankings-overview { margin-bottom: 32px; }
    .ranking-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 24px; }
    .stat-card { background: white; border-radius: 16px; padding: 20px; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); display: flex; align-items: center; gap: 16px; }
    .stat-icon { width: 48px; height: 48px; border-radius: 12px; background: #f0f9ff; display: flex; align-items: center; justify-content: center; font-size: 20px; }
    .stat-content h3 { font-size: 24px; font-weight: 700; color: #1e293b; margin: 0 0 4px 0; }
    .stat-content p { font-size: 14px; color: #64748b; margin: 0; }
    .ranking-filters { display: flex; gap: 16px; }
    .filter-select { padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px; min-width: 150px; }
    .rankings-table { background: white; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); overflow: hidden; }
    .table-header { display: grid; grid-template-columns: 60px 1fr 150px 100px 100px 100px 80px; background: #f8fafc; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb; }
    .table-header > div { padding: 16px 12px; font-size: 14px; text-align: left; }
    .table-row { display: grid; grid-template-columns: 60px 1fr 150px 100px 100px 100px 80px; border-bottom: 1px solid #f1f5f9; }
    .table-row:hover { background: #f9fafb; }
    .table-row > div { padding: 16px 12px; display: flex; align-items: center; }
    .position-number { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; }
    .position-number.top-1 { background: #ffd700; color: #92400e; }
    .position-number.top-2 { background: #c0c0c0; color: #374151; }
    .position-number.top-3 { background: #cd7f32; color: #92400e; }
    .position-number.other { background: #f1f5f9; color: #64748b; }
    .player-info { display: flex; align-items: center; gap: 12px; }
    .player-avatar { width: 40px; height: 40px; border-radius: 50%; background: #e0e7ff; display: flex; align-items: center; justify-content: center; font-weight: 600; color: #3730a3; }
    .player-details { display: flex; flex-direction: column; }
    .player-name { font-weight: 500; color: #1e293b; }
    .player-category { font-size: 12px; color: #64748b; }
    .club-name { color: #1e293b; }
    .points { font-weight: 600; color: #059669; }
    .trend { width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; }
    .trend.subiendo { background: #d1fae5; color: #059669; }
    .trend.bajando { background: #fef2f2; color: #dc2626; }
    .trend.estable { background: #f1f5f9; color: #64748b; }
  `]
})
export class SystemAdminRankingsComponent extends AdminBaseComponent {
  totalJugadores = signal(1247);
  clubesActivos = signal(45);
  partidosHoy = signal(127);
  
  topJugadores = signal([
    { nombre: 'Carlos Rodríguez', categoria: 'Profesional', club: 'Club Pádel Madrid', puntos: 2845, partidos: 32, porcentajeVictorias: 87.5, tendencia: 'Subiendo' },
    { nombre: 'Ana Martínez', categoria: 'Avanzado', club: 'Valencia Pádel Club', puntos: 2720, partidos: 28, porcentajeVictorias: 85.7, tendencia: 'Subiendo' },
    { nombre: 'Miguel López', categoria: 'Profesional', club: 'Barcelona Pádel', puntos: 2680, partidos: 35, porcentajeVictorias: 82.9, tendencia: 'Estable' },
    { nombre: 'Laura García', categoria: 'Avanzado', club: 'Sevilla Sports', puntos: 2540, partidos: 24, porcentajeVictorias: 79.2, tendencia: 'Subiendo' },
    { nombre: 'David Ruiz', categoria: 'Intermedio', club: 'Club Deportivo Cádiz', puntos: 2420, partidos: 41, porcentajeVictorias: 73.2, tendencia: 'Bajando' },
    { nombre: 'Carmen Díaz', categoria: 'Avanzado', club: 'Málaga Pádel Center', puntos: 2380, partidos: 29, porcentajeVictorias: 75.9, tendencia: 'Estable' },
    { nombre: 'Pedro Sánchez', categoria: 'Intermedio', club: 'Granada Sports Club', puntos: 2250, partidos: 33, porcentajeVictorias: 69.7, tendencia: 'Subiendo' },
    { nombre: 'María González', categoria: 'Principiante', club: 'Almería Pádel', puntos: 2180, partidos: 26, porcentajeVictorias: 65.4, tendencia: 'Subiendo' }
  ]);

  protected onInit(): void {}
  protected onDestroy(): void {}

  getPositionClass(position: number): string {
    if (position === 1) return 'top-1';
    if (position === 2) return 'top-2';
    if (position === 3) return 'top-3';
    return 'other';
  }

  getTrendIcon(tendencia: string): string {
    switch (tendencia.toLowerCase()) {
      case 'subiendo': return '↗';
      case 'bajando': return '↘';
      case 'estable': return '→';
      default: return '→';
    }
  }
}
