import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminBaseComponent } from '../../shared/admin-base.component';

@Component({
  selector: 'app-system-admin-analytics',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="system-admin-page">
      <div class="page-header">
        <h1>Analytics Avanzado</h1>
        <p>Estadísticas y métricas globales de la plataforma</p>
      </div>
      
      <div class="coming-soon">
        <div class="coming-soon-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"></polyline>
          </svg>
        </div>
        <h2>En Desarrollo</h2>
        <p>Sistema completo de analytics con métricas avanzadas.</p>
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
export class SystemAdminAnalyticsComponent extends AdminBaseComponent {
  protected onInit(): void {}
  protected onDestroy(): void {}
}
