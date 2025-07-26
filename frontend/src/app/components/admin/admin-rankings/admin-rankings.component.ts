import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-rankings',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="admin-page">
      <div class="page-header">
        <h1>Gestión de Rankings</h1>
        <p>Administra el sistema de clasificaciones y rangos</p>
      </div>
      
      <div class="coming-soon">
        <div class="coming-soon-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"></polyline>
          </svg>
        </div>
        <h2>Próximamente</h2>
        <p>Esta sección está en desarrollo y estará disponible pronto.</p>
      </div>
    </div>
  `,
  styles: [`
    .admin-page {
      padding: 0;
    }
    
    .page-header {
      margin-bottom: 32px;
    }
    
    .page-header h1 {
      font-size: 32px;
      font-weight: 700;
      color: #1e293b;
      margin: 0 0 8px 0;
    }
    
    .page-header p {
      font-size: 16px;
      color: #64748b;
      margin: 0;
    }
    
    .coming-soon {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 80px 20px;
      text-align: center;
      background: white;
      border-radius: 16px;
      border: 1px solid #e2e8f0;
    }
    
    .coming-soon-icon {
      margin-bottom: 24px;
      color: #64748b;
    }
    
    .coming-soon h2 {
      font-size: 24px;
      font-weight: 600;
      color: #1e293b;
      margin: 0 0 12px 0;
    }
    
    .coming-soon p {
      font-size: 16px;
      color: #64748b;
      margin: 0;
    }
  `]
})
export class AdminRankingsComponent {}
