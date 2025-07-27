import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminBaseComponent } from '../../shared/admin-base.component';

@Component({
  selector: 'app-system-admin-clubs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="system-admin-page">
      <div class="page-header">
        <h1>Gestión Global de Clubes</h1>
        <p>Administra todos los clubes de la plataforma PadelHUB</p>
      </div>
      
      <div class="coming-soon">
        <div class="coming-soon-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
        </div>
        <h2>En Desarrollo</h2>
        <p>Este módulo de gestión global de clubes estará disponible pronto.</p>
        <p>Incluirá funciones para crear, editar, suspender y gestionar todos los clubes de la plataforma.</p>
      </div>
    </div>
  `,
  styles: [`
    .system-admin-page {
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
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
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
      margin: 0 0 8px 0;
      max-width: 500px;
    }
  `]
})
export class SystemAdminClubsComponent extends AdminBaseComponent {
  
  protected onInit(): void {
    // Verificar permisos
    if (!this.esAdminSistema()) {
      this.navegarA('/admin/club/dashboard');
    }
  }

  protected onDestroy(): void {
    // Cleanup
  }
}
