import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminBaseComponent } from '../../shared/admin-base.component';

@Component({
  selector: 'app-system-admin-users',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="system-admin-page">
      <div class="page-header">
        <h1>Gestión Global de Usuarios</h1>
        <p>Administra todos los usuarios de la plataforma PadelHUB</p>
      </div>
      
      <div class="coming-soon">
        <div class="coming-soon-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        </div>
        <h2>En Desarrollo</h2>
        <p>Este módulo de gestión global de usuarios estará disponible pronto.</p>
      </div>
    </div>
  `,
  styles: [`
    .system-admin-page { padding: 0; }
    .page-header { margin-bottom: 32px; }
    .page-header h1 { font-size: 32px; font-weight: 700; color: #1e293b; margin: 0 0 8px 0; }
    .page-header p { font-size: 16px; color: #64748b; margin: 0; }
    .coming-soon { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 80px 20px; text-align: center; background: white; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); }
    .coming-soon-icon { margin-bottom: 24px; color: #64748b; }
    .coming-soon h2 { font-size: 24px; font-weight: 600; color: #1e293b; margin: 0 0 12px 0; }
    .coming-soon p { font-size: 16px; color: #64748b; margin: 0; }
  `]
})
export class SystemAdminUsersComponent extends AdminBaseComponent {
  protected onInit(): void {}
  protected onDestroy(): void {}
}
