import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminBaseComponent } from '../../shared/admin-base.component';

@Component({
  selector: 'app-system-admin-settings',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="system-admin-page">
      <div class="page-header">
        <h1>Configuración del Sistema</h1>
        <p>Gestión de configuraciones globales de la plataforma</p>
      </div>
      
      <div class="settings-grid">
        <div class="setting-card">
          <h3>General</h3>
          <div class="setting-item">
            <label>Nombre de la plataforma</label>
            <input type="text" value="PadelHUB" disabled>
          </div>
          <div class="setting-item">
            <label>Modo mantenimiento</label>
            <input type="checkbox">
          </div>
        </div>
        
        <div class="setting-card">
          <h3>Seguridad</h3>
          <div class="setting-item">
            <label>Expiración de sesión (minutos)</label>
            <input type="number" value="60" disabled>
          </div>
          <div class="setting-item">
            <label>Activar 2FA obligatorio</label>
            <input type="checkbox">
          </div>
        </div>
        
        <div class="setting-card">
          <h3>Notificaciones</h3>
          <div class="setting-item">
            <label>Email de administración</label>
            <input type="email" value="admin@padelhub.com" disabled>
          </div>
          <div class="setting-item">
            <label>Notificaciones push</label>
            <input type="checkbox" checked>
          </div>
        </div>
        
        <div class="setting-card">
          <h3>Base de Datos</h3>
          <div class="setting-item">
            <label>Backup automático</label>
            <input type="checkbox" checked>
          </div>
          <div class="setting-item">
            <label>Frecuencia backup (horas)</label>
            <input type="number" value="24" disabled>
          </div>
        </div>
      </div>
      
      <div class="actions">
        <button class="btn btn-secondary">Cancelar</button>
        <button class="btn btn-primary">Guardar Cambios</button>
      </div>
    </div>
  `,
  styles: [`
    .system-admin-page { padding: 0; }
    .page-header { margin-bottom: 32px; }
    .page-header h1 { font-size: 32px; font-weight: 700; color: #1e293b; margin: 0 0 8px 0; }
    .page-header p { font-size: 16px; color: #64748b; margin: 0; }
    .settings-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; margin-bottom: 32px; }
    .setting-card { background: white; border-radius: 16px; padding: 24px; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); }
    .setting-card h3 { font-size: 20px; font-weight: 600; color: #1e293b; margin: 0 0 16px 0; }
    .setting-item { margin-bottom: 16px; }
    .setting-item:last-child { margin-bottom: 0; }
    .setting-item label { display: block; font-size: 14px; font-weight: 500; color: #374151; margin-bottom: 6px; }
    .setting-item input[type="text"], .setting-item input[type="email"], .setting-item input[type="number"] { width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px; }
    .setting-item input[type="checkbox"] { width: 16px; height: 16px; margin: 0; }
    .actions { display: flex; gap: 12px; justify-content: flex-end; }
    .btn { padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: 500; border: none; cursor: pointer; transition: all 0.2s; }
    .btn-primary { background: #0ea5e9; color: white; }
    .btn-primary:hover { background: #0284c7; }
    .btn-secondary { background: #f8fafc; color: #64748b; border: 1px solid #e2e8f0; }
    .btn-secondary:hover { background: #f1f5f9; }
  `]
})
export class SystemAdminSettingsComponent extends AdminBaseComponent {
  protected onInit(): void {}
  protected onDestroy(): void {}
}
