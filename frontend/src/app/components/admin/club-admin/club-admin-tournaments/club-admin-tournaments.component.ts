import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminBaseComponent } from '../../shared/admin-base.component';

@Component({
  selector: 'app-club-admin-tournaments',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="club-admin-page">
      <div class="page-header">
        <div class="header-content">
          <div>
            <h1>Gestión de Torneos</h1>
            <p>Organizar y administrar torneos del club</p>
          </div>
          <button class="btn btn-primary" (click)="crearTorneo()">
            <span class="btn-icon">🏆</span>
            Crear Torneo
          </button>
        </div>
      </div>
      
      <div class="tournaments-grid">
        <div class="tournament-card" *ngFor="let torneo of torneos()" [class]="'status-' + torneo.estado.toLowerCase()">
          <div class="tournament-header">
            <div class="tournament-status">
              <span class="status-badge" [class]="'status-' + torneo.estado.toLowerCase()">
                {{ torneo.estado }}
              </span>
            </div>
            <div class="tournament-actions">
              <button class="action-btn" (click)="editarTorneo(torneo)">⚙️</button>
              <button class="action-btn" (click)="verDetalles(torneo)">👁️</button>
            </div>
          </div>
          
          <div class="tournament-content">
            <h3 class="tournament-title">{{ torneo.nombre }}</h3>
            <p class="tournament-description">{{ torneo.descripcion }}</p>
            
            <div class="tournament-info">
              <div class="info-item">
                <span class="info-label">Fecha:</span>
                <span class="info-value">{{ torneo.fechaInicio }} - {{ torneo.fechaFin }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Participantes:</span>
                <span class="info-value">{{ torneo.participantes }}/{{ torneo.maxParticipantes }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Formato:</span>
                <span class="info-value">{{ torneo.formato }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Premio:</span>
                <span class="info-value">{{ torneo.premio }}</span>
              </div>
            </div>
          </div>
          
          <div class="tournament-progress" *ngIf="torneo.estado === 'En Curso'">
            <div class="progress-bar">
              <div class="progress-fill" [style.width.%]="torneo.progreso"></div>
            </div>
            <span class="progress-text">{{ torneo.progreso }}% completado</span>
          </div>
          
          <div class="tournament-footer">
            <button class="btn btn-secondary btn-sm" (click)="gestionarInscripciones(torneo)">
              Inscripciones
            </button>
            <button class="btn btn-secondary btn-sm" (click)="verResultados(torneo)" *ngIf="torneo.estado !== 'Programado'">
              Resultados
            </button>
          </div>
        </div>
      </div>
      
      <div class="empty-state" *ngIf="torneos().length === 0">
        <div class="empty-icon">🏆</div>
        <h3>No hay torneos</h3>
        <p>Crea tu primer torneo para comenzar a organizar competiciones.</p>
        <button class="btn btn-primary" (click)="crearTorneo()">
          Crear Primer Torneo
        </button>
      </div>
    </div>
  `,
  styles: [`
    .club-admin-page { padding: 0; }
    .page-header { margin-bottom: 32px; }
    .header-content { display: flex; justify-content: space-between; align-items: flex-start; }
    .page-header h1 { font-size: 32px; font-weight: 700; color: #1e293b; margin: 0 0 8px 0; }
    .page-header p { font-size: 16px; color: #64748b; margin: 0; }
    .btn { padding: 12px 20px; border-radius: 8px; font-size: 14px; font-weight: 500; border: none; cursor: pointer; transition: all 0.2s; display: inline-flex; align-items: center; gap: 8px; }
    .btn-primary { background: #0ea5e9; color: white; }
    .btn-primary:hover { background: #0284c7; }
    .btn-secondary { background: #f8fafc; color: #64748b; border: 1px solid #e2e8f0; }
    .btn-secondary:hover { background: #f1f5f9; }
    .btn-sm { padding: 8px 12px; font-size: 12px; }
    .btn-icon { font-size: 16px; }
    .tournaments-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 24px; }
    .tournament-card { background: white; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); overflow: hidden; transition: all 0.2s; }
    .tournament-card:hover { box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1); transform: translateY(-2px); }
    .tournament-card.status-programado { border-left: 4px solid #3b82f6; }
    .tournament-card.status-en-curso { border-left: 4px solid #10b981; }
    .tournament-card.status-finalizado { border-left: 4px solid #64748b; }
    .tournament-card.status-cancelado { border-left: 4px solid #ef4444; }
    .tournament-header { display: flex; justify-content: space-between; align-items: center; padding: 16px 20px 0 20px; }
    .tournament-actions { display: flex; gap: 8px; }
    .action-btn { width: 32px; height: 32px; border: none; border-radius: 8px; cursor: pointer; background: #f8fafc; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
    .action-btn:hover { background: #f1f5f9; }
    .tournament-content { padding: 0 20px 16px 20px; }
    .tournament-title { font-size: 20px; font-weight: 600; color: #1e293b; margin: 12px 0 8px 0; }
    .tournament-description { font-size: 14px; color: #64748b; margin: 0 0 16px 0; }
    .tournament-info { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
    .info-item { display: flex; flex-direction: column; }
    .info-label { font-size: 12px; color: #64748b; margin-bottom: 2px; }
    .info-value { font-size: 14px; color: #1e293b; font-weight: 500; }
    .tournament-progress { padding: 0 20px 16px 20px; }
    .progress-bar { width: 100%; height: 8px; background: #f1f5f9; border-radius: 4px; overflow: hidden; margin-bottom: 8px; }
    .progress-fill { height: 100%; background: #10b981; transition: width 0.3s; }
    .progress-text { font-size: 12px; color: #64748b; }
    .tournament-footer { display: flex; gap: 8px; padding: 16px 20px; border-top: 1px solid #f1f5f9; }
    .status-badge { padding: 4px 8px; border-radius: 12px; font-size: 12px; font-weight: 500; }
    .status-badge.status-programado { background: #dbeafe; color: #1d4ed8; }
    .status-badge.status-en-curso { background: #d1fae5; color: #059669; }
    .status-badge.status-finalizado { background: #f1f5f9; color: #64748b; }
    .status-badge.status-cancelado { background: #fef2f2; color: #dc2626; }
    .empty-state { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 80px 20px; text-align: center; background: white; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); }
    .empty-icon { font-size: 64px; margin-bottom: 16px; }
    .empty-state h3 { font-size: 24px; font-weight: 600; color: #1e293b; margin: 0 0 8px 0; }
    .empty-state p { font-size: 16px; color: #64748b; margin: 0 0 24px 0; }
  `]
})
export class ClubAdminTournamentsComponent extends AdminBaseComponent {
  torneos = signal([
    {
      id: 1,
      nombre: 'Copa Primavera 2024',
      descripcion: 'Torneo de primavera para todas las categorías',
      fechaInicio: '15/04/2024',
      fechaFin: '20/04/2024',
      participantes: 16,
      maxParticipantes: 32,
      formato: 'Eliminación Simple',
      premio: '500€ + Trofeo',
      estado: 'En Curso',
      progreso: 65
    },
    {
      id: 2,
      nombre: 'Torneo Amateur Verano',
      descripcion: 'Competición para jugadores amateur y principiantes',
      fechaInicio: '01/06/2024',
      fechaFin: '15/06/2024',
      participantes: 8,
      maxParticipantes: 24,
      formato: 'Round Robin',
      premio: '300€ + Trofeo',
      estado: 'Programado',
      progreso: 0
    },
    {
      id: 3,
      nombre: 'Masters Club 2024',
      descripcion: 'Torneo para los mejores jugadores del club',
      fechaInicio: '10/03/2024',
      fechaFin: '15/03/2024',
      participantes: 12,
      maxParticipantes: 16,
      formato: 'Eliminación Doble',
      premio: '1000€ + Trofeo',
      estado: 'Finalizado',
      progreso: 100
    }
  ]);

  protected onInit(): void {}
  protected onDestroy(): void {}

  crearTorneo(): void {
    console.log('Crear nuevo torneo');
  }

  editarTorneo(torneo: any): void {
    console.log('Editar torneo:', torneo);
  }

  verDetalles(torneo: any): void {
    console.log('Ver detalles del torneo:', torneo);
  }

  gestionarInscripciones(torneo: any): void {
    console.log('Gestionar inscripciones:', torneo);
  }

  verResultados(torneo: any): void {
    console.log('Ver resultados:', torneo);
  }
}
