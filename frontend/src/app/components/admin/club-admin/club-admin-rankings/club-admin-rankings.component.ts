import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminBaseComponent } from '../../shared/admin-base.component';

@Component({
  selector: 'app-club-admin-rankings',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="club-admin-page">
      <div class="page-header">
        <h1>Rankings del Club</h1>
        <p>Clasificaciones y estadísticas de los miembros</p>
      </div>
      
      <div class="rankings-container">
        <div class="ranking-filters">
          <select>
            <option>Todos los rangos</option>
            <option>Principiante</option>
            <option>Intermedio</option>
            <option>Avanzado</option>
            <option>Profesional</option>
          </select>
          <select>
            <option>Último mes</option>
            <option>Últimos 3 meses</option>
            <option>Último año</option>
            <option>Histórico</option>
          </select>
        </div>
        
        <div class="ranking-table">
          <div class="table-header">
            <div class="col-position">#</div>
            <div class="col-player">Jugador</div>
            <div class="col-games">Partidos</div>
            <div class="col-wins">Victorias</div>
            <div class="col-winrate">% Victorias</div>
            <div class="col-rank">Rango</div>
          </div>
          
          <div class="table-row" *ngFor="let jugador of jugadores(); let i = index">
            <div class="col-position">{{ i + 1 }}</div>
            <div class="col-player">
              <div class="player-info">
                <div class="player-avatar">{{ jugador.nombre.charAt(0) }}</div>
                <div class="player-details">
                  <span class="player-name">{{ jugador.nombre }}</span>
                  <span class="player-email">{{ jugador.email }}</span>
                </div>
              </div>
            </div>
            <div class="col-games">{{ jugador.partidos }}</div>
            <div class="col-wins">{{ jugador.victorias }}</div>
            <div class="col-winrate">{{ jugador.porcentajeVictorias }}%</div>
            <div class="col-rank">
              <span class="rank-badge" [class]="'rank-' + jugador.rango.toLowerCase()">
                {{ jugador.rango }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .club-admin-page { padding: 0; }
    .page-header { margin-bottom: 32px; }
    .page-header h1 { font-size: 32px; font-weight: 700; color: #1e293b; margin: 0 0 8px 0; }
    .page-header p { font-size: 16px; color: #64748b; margin: 0; }
    .rankings-container { background: white; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); overflow: hidden; }
    .ranking-filters { display: flex; gap: 16px; padding: 20px; border-bottom: 1px solid #f1f5f9; }
    .ranking-filters select { padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px; }
    .ranking-table { display: table; width: 100%; }
    .table-header { display: table-row; background: #f8fafc; font-weight: 600; color: #374151; }
    .table-header > div { display: table-cell; padding: 16px 20px; font-size: 14px; text-align: left; border-bottom: 1px solid #e5e7eb; }
    .table-row { display: table-row; }
    .table-row:hover { background: #f9fafb; }
    .table-row > div { display: table-cell; padding: 16px 20px; border-bottom: 1px solid #f1f5f9; vertical-align: middle; }
    .col-position { width: 60px; font-weight: 600; color: #374151; }
    .col-player { width: 300px; }
    .col-games, .col-wins { width: 100px; text-align: center; }
    .col-winrate { width: 120px; text-align: center; }
    .col-rank { width: 120px; text-align: center; }
    .player-info { display: flex; align-items: center; gap: 12px; }
    .player-avatar { width: 40px; height: 40px; border-radius: 50%; background: #e0e7ff; display: flex; align-items: center; justify-content: center; font-weight: 600; color: #3730a3; }
    .player-details { display: flex; flex-direction: column; }
    .player-name { font-weight: 500; color: #1e293b; }
    .player-email { font-size: 12px; color: #64748b; }
    .rank-badge { padding: 4px 8px; border-radius: 12px; font-size: 12px; font-weight: 500; }
    .rank-badge.rank-principiante { background: #e0f2fe; color: #0369a1; }
    .rank-badge.rank-intermedio { background: #f0fdf4; color: #059669; }
    .rank-badge.rank-avanzado { background: #fef3c7; color: #d97706; }
    .rank-badge.rank-profesional { background: #fce7f3; color: #be185d; }
  `]
})
export class ClubAdminRankingsComponent extends AdminBaseComponent {
  jugadores = signal([
    { nombre: 'Carlos Rodríguez', email: 'carlos@email.com', partidos: 28, victorias: 22, porcentajeVictorias: 78.6, rango: 'Avanzado' },
    { nombre: 'Ana Martín', email: 'ana@email.com', partidos: 25, victorias: 19, porcentajeVictorias: 76.0, rango: 'Avanzado' },
    { nombre: 'Juan Pérez', email: 'juan@email.com', partidos: 32, victorias: 23, porcentajeVictorias: 71.9, rango: 'Intermedio' },
    { nombre: 'María García', email: 'maria@email.com', partidos: 22, victorias: 15, porcentajeVictorias: 68.2, rango: 'Intermedio' },
    { nombre: 'David López', email: 'david@email.com', partidos: 18, victorias: 12, porcentajeVictorias: 66.7, rango: 'Intermedio' },
    { nombre: 'Laura Sánchez', email: 'laura@email.com', partidos: 15, victorias: 9, porcentajeVictorias: 60.0, rango: 'Principiante' },
    { nombre: 'Pedro Ruiz', email: 'pedro@email.com', partidos: 12, victorias: 7, porcentajeVictorias: 58.3, rango: 'Principiante' },
    { nombre: 'Carmen Díaz', email: 'carmen@email.com', partidos: 20, victorias: 11, porcentajeVictorias: 55.0, rango: 'Principiante' }
  ]);

  protected onInit(): void {}
  protected onDestroy(): void {}
}
