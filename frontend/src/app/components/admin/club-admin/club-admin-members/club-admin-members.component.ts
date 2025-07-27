import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminBaseComponent } from '../../shared/admin-base.component';

@Component({
  selector: 'app-club-admin-members',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="club-admin-page">
      <div class="page-header">
        <div class="header-content">
          <div>
            <h1>Gestión de Miembros</h1>
            <p>Administrar los miembros del club</p>
          </div>
          <button class="btn btn-primary" (click)="mostrarFormularioNuevo()">
            <span class="btn-icon">+</span>
            Nuevo Miembro
          </button>
        </div>
      </div>
      
      <div class="members-container">
        <div class="members-filters">
          <input type="text" placeholder="Buscar miembros..." class="search-input">
          <select class="filter-select">
            <option>Todos los estados</option>
            <option>Activos</option>
            <option>Inactivos</option>
            <option>Suspendidos</option>
          </select>
          <select class="filter-select">
            <option>Todos los rangos</option>
            <option>Principiante</option>
            <option>Intermedio</option>
            <option>Avanzado</option>
            <option>Profesional</option>
          </select>
        </div>
        
        <div class="members-table">
          <div class="table-header">
            <div class="col-member">Miembro</div>
            <div class="col-contact">Contacto</div>
            <div class="col-membership">Membresía</div>
            <div class="col-rank">Rango</div>
            <div class="col-status">Estado</div>
            <div class="col-actions">Acciones</div>
          </div>
          
          <div class="table-row" *ngFor="let miembro of miembros()">
            <div class="col-member">
              <div class="member-info">
                <div class="member-avatar">{{ miembro.nombre.charAt(0) }}</div>
                <div class="member-details">
                  <span class="member-name">{{ miembro.nombre }}</span>
                  <span class="member-joined">Miembro desde {{ miembro.fechaRegistro }}</span>
                </div>
              </div>
            </div>
            <div class="col-contact">
              <div class="contact-info">
                <span class="contact-email">{{ miembro.email }}</span>
                <span class="contact-phone">{{ miembro.telefono }}</span>
              </div>
            </div>
            <div class="col-membership">
              <span class="membership-type">{{ miembro.tipoMembresia }}</span>
              <span class="membership-expires">Expira: {{ miembro.fechaExpiracion }}</span>
            </div>
            <div class="col-rank">
              <span class="rank-badge" [class]="'rank-' + miembro.rango.toLowerCase()">
                {{ miembro.rango }}
              </span>
            </div>
            <div class="col-status">
              <span class="status-badge" [class]="'status-' + miembro.estado.toLowerCase()">
                {{ miembro.estado }}
              </span>
            </div>
            <div class="col-actions">
              <button class="action-btn edit" (click)="editarMiembro(miembro)">
                ✏️
              </button>
              <button class="action-btn delete" (click)="eliminarMiembro(miembro)">
                🗑️
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .club-admin-page { padding: 0; }
    .page-header { margin-bottom: 32px; }
    .header-content { display: flex; justify-content: space-between; align-items: flex-start; }
    .page-header h1 { font-size: 32px; font-weight: 700; color: #1e293b; margin: 0 0 8px 0; }
    .page-header p { font-size: 16px; color: #64748b; margin: 0; }
    .btn { padding: 12px 20px; border-radius: 8px; font-size: 14px; font-weight: 500; border: none; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 8px; }
    .btn-primary { background: #0ea5e9; color: white; }
    .btn-primary:hover { background: #0284c7; }
    .btn-icon { font-size: 16px; }
    .members-container { background: white; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); overflow: hidden; }
    .members-filters { display: flex; gap: 16px; padding: 20px; border-bottom: 1px solid #f1f5f9; }
    .search-input { flex: 1; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px; }
    .filter-select { padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px; min-width: 150px; }
    .members-table { display: table; width: 100%; }
    .table-header { display: table-row; background: #f8fafc; font-weight: 600; color: #374151; }
    .table-header > div { display: table-cell; padding: 16px 20px; font-size: 14px; text-align: left; border-bottom: 1px solid #e5e7eb; }
    .table-row { display: table-row; }
    .table-row:hover { background: #f9fafb; }
    .table-row > div { display: table-cell; padding: 16px 20px; border-bottom: 1px solid #f1f5f9; vertical-align: middle; }
    .col-member { width: 250px; }
    .col-contact { width: 200px; }
    .col-membership { width: 150px; }
    .col-rank { width: 100px; text-align: center; }
    .col-status { width: 100px; text-align: center; }
    .col-actions { width: 100px; text-align: center; }
    .member-info { display: flex; align-items: center; gap: 12px; }
    .member-avatar { width: 40px; height: 40px; border-radius: 50%; background: #e0e7ff; display: flex; align-items: center; justify-content: center; font-weight: 600; color: #3730a3; }
    .member-details { display: flex; flex-direction: column; }
    .member-name { font-weight: 500; color: #1e293b; }
    .member-joined { font-size: 12px; color: #64748b; }
    .contact-info { display: flex; flex-direction: column; }
    .contact-email { color: #1e293b; }
    .contact-phone { font-size: 12px; color: #64748b; }
    .membership-type { color: #1e293b; font-weight: 500; }
    .membership-expires { font-size: 12px; color: #64748b; }
    .rank-badge { padding: 4px 8px; border-radius: 12px; font-size: 12px; font-weight: 500; }
    .rank-badge.rank-principiante { background: #e0f2fe; color: #0369a1; }
    .rank-badge.rank-intermedio { background: #f0fdf4; color: #059669; }
    .rank-badge.rank-avanzado { background: #fef3c7; color: #d97706; }
    .rank-badge.rank-profesional { background: #fce7f3; color: #be185d; }
    .status-badge { padding: 4px 8px; border-radius: 12px; font-size: 12px; font-weight: 500; }
    .status-badge.status-activo { background: #f0fdf4; color: #059669; }
    .status-badge.status-inactivo { background: #fef3c7; color: #d97706; }
    .status-badge.status-suspendido { background: #fef2f2; color: #dc2626; }
    .action-btn { width: 32px; height: 32px; border: none; border-radius: 8px; cursor: pointer; margin: 0 4px; display: inline-flex; align-items: center; justify-content: center; transition: all 0.2s; }
    .action-btn.edit { background: #e0f2fe; }
    .action-btn.edit:hover { background: #bae6fd; }
    .action-btn.delete { background: #fef2f2; }
    .action-btn.delete:hover { background: #fecaca; }
  `]
})
export class ClubAdminMembersComponent extends AdminBaseComponent {
  miembros = signal([
    {
      id: 1,
      nombre: 'Carlos Rodríguez',
      email: 'carlos@email.com',
      telefono: '+34 666 123 456',
      fechaRegistro: '15/01/2024',
      tipoMembresia: 'Premium',
      fechaExpiracion: '15/01/2025',
      rango: 'Avanzado',
      estado: 'Activo'
    },
    {
      id: 2,
      nombre: 'Ana Martín',
      email: 'ana@email.com',
      telefono: '+34 666 789 012',
      fechaRegistro: '03/02/2024',
      tipoMembresia: 'Básica',
      fechaExpiracion: '03/02/2025',
      rango: 'Intermedio',
      estado: 'Activo'
    },
    {
      id: 3,
      nombre: 'Juan Pérez',
      email: 'juan@email.com',
      telefono: '+34 666 345 678',
      fechaRegistro: '20/12/2023',
      tipoMembresia: 'Premium',
      fechaExpiracion: '20/12/2024',
      rango: 'Principiante',
      estado: 'Inactivo'
    }
  ]);

  protected onInit(): void {}
  protected onDestroy(): void {}

  mostrarFormularioNuevo(): void {
    console.log('Mostrar formulario nuevo miembro');
  }

  editarMiembro(miembro: any): void {
    console.log('Editar miembro:', miembro);
  }

  eliminarMiembro(miembro: any): void {
    console.log('Eliminar miembro:', miembro);
  }
}
