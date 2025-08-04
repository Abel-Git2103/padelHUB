import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlayerSettings } from '../../../models/player-stats.model';

@Component({
  selector: 'app-profile-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="profile-settings">
      <!-- Preferencias -->
      <div class="settings-section">
        <h2 class="section-title">
          <span class="title-icon">⚙️</span>
          Preferencias
        </h2>

        <div class="settings-group">
          <h3 class="group-title">
            <span class="group-icon">🔔</span>
            Notificaciones
          </h3>
          
          <div class="settings-list">
            <div class="setting-item">
              <label class="setting-label">
                <input 
                  type="checkbox" 
                  [(ngModel)]="settings.notificaciones.invitacionesPartidos"
                  (change)="onSettingsChange()">
                <span class="checkmark"></span>
                <span class="label-text">Invitaciones a partidos</span>
              </label>
            </div>

            <div class="setting-item">
              <label class="setting-label">
                <input 
                  type="checkbox" 
                  [(ngModel)]="settings.notificaciones.recordatoriosEventos"
                  (change)="onSettingsChange()">
                <span class="checkmark"></span>
                <span class="label-text">Recordatorios de eventos</span>
              </label>
            </div>

            <div class="setting-item">
              <label class="setting-label">
                <input 
                  type="checkbox" 
                  [(ngModel)]="settings.notificaciones.actualizacionesRanking"
                  (change)="onSettingsChange()">
                <span class="checkmark"></span>
                <span class="label-text">Actualizaciones de ranking</span>
              </label>
            </div>

            <div class="setting-item">
              <label class="setting-label">
                <input 
                  type="checkbox" 
                  [(ngModel)]="settings.notificaciones.promocionesOfertas"
                  (change)="onSettingsChange()">
                <span class="checkmark"></span>
                <span class="label-text">Promociones y ofertas</span>
              </label>
            </div>

            <div class="setting-item">
              <label class="setting-label">
                <input 
                  type="checkbox" 
                  [(ngModel)]="settings.notificaciones.notificacionesChat"
                  (change)="onSettingsChange()">
                <span class="checkmark"></span>
                <span class="label-text">Notificaciones de chat</span>
              </label>
            </div>
          </div>
        </div>

        <div class="settings-group">
          <h3 class="group-title">
            <span class="group-icon">🌐</span>
            Idioma y Región
          </h3>
          
          <div class="settings-list">
            <div class="setting-item">
              <label class="setting-label">
                <span class="label-text">Idioma:</span>
                <select 
                  [(ngModel)]="settings.preferencias.idioma"
                  (change)="onSettingsChange()"
                  class="setting-select">
                  <option value="es">Español</option>
                  <option value="en">Inglés</option>
                  <option value="fr">Francés</option>
                  <option value="pt">Portugués</option>
                </select>
              </label>
            </div>

            <div class="setting-item">
              <label class="setting-label">
                <span class="label-text">Zona horaria:</span>
                <select 
                  [(ngModel)]="settings.preferencias.zonaHoraria"
                  (change)="onSettingsChange()"
                  class="setting-select">
                  <option value="Madrid">Madrid (CET)</option>
                  <option value="London">Londres (GMT)</option>
                  <option value="Paris">París (CET)</option>
                  <option value="Lisbon">Lisboa (WET)</option>
                </select>
              </label>
            </div>

            <div class="setting-item">
              <label class="setting-label">
                <span class="label-text">Formato fecha:</span>
                <select 
                  [(ngModel)]="settings.preferencias.formatoFecha"
                  (change)="onSettingsChange()"
                  class="setting-select">
                  <option value="DD/MM/AAAA">DD/MM/AAAA</option>
                  <option value="MM/DD/AAAA">MM/DD/AAAA</option>
                  <option value="AAAA-MM-DD">AAAA-MM-DD</option>
                </select>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Privacidad -->
      <div class="settings-section">
        <h2 class="section-title">
          <span class="title-icon">🔒</span>
          Privacidad
        </h2>

        <div class="settings-group">
          <h3 class="group-title">
            <span class="group-icon">👁️</span>
            Visibilidad del Perfil
          </h3>
          
          <div class="setting-item">
            <label class="setting-label">
              <span class="label-text">Perfil visible para:</span>
            </label>
            <div class="radio-group">
              <label class="radio-label">
                <input 
                  type="radio" 
                  name="perfilVisible" 
                  value="todos"
                  [(ngModel)]="settings.privacidad.perfilVisible"
                  (change)="onSettingsChange()">
                <span class="radio-checkmark"></span>
                <span class="radio-text">Todos los usuarios</span>
              </label>
              <label class="radio-label">
                <input 
                  type="radio" 
                  name="perfilVisible" 
                  value="club"
                  [(ngModel)]="settings.privacidad.perfilVisible"
                  (change)="onSettingsChange()">
                <span class="radio-checkmark"></span>
                <span class="radio-text">Solo miembros de mi club</span>
              </label>
              <label class="radio-label">
                <input 
                  type="radio" 
                  name="perfilVisible" 
                  value="contactos"
                  [(ngModel)]="settings.privacidad.perfilVisible"
                  (change)="onSettingsChange()">
                <span class="radio-checkmark"></span>
                <span class="radio-text">Solo mis contactos</span>
              </label>
            </div>
          </div>
        </div>

        <div class="settings-group">
          <h3 class="group-title">
            <span class="group-icon">📊</span>
            Estadísticas Visibles
          </h3>
          
          <div class="settings-list">
            <div class="setting-item">
              <label class="setting-label">
                <input 
                  type="checkbox" 
                  [(ngModel)]="settings.privacidad.estadisticasVisibles.ranking"
                  (change)="onSettingsChange()">
                <span class="checkmark"></span>
                <span class="label-text">Ranking y posición</span>
              </label>
            </div>

            <div class="setting-item">
              <label class="setting-label">
                <input 
                  type="checkbox" 
                  [(ngModel)]="settings.privacidad.estadisticasVisibles.historial"
                  (change)="onSettingsChange()">
                <span class="checkmark"></span>
                <span class="label-text">Historial de partidos</span>
              </label>
            </div>

            <div class="setting-item">
              <label class="setting-label">
                <input 
                  type="checkbox" 
                  [(ngModel)]="settings.privacidad.estadisticasVisibles.contacto"
                  (change)="onSettingsChange()">
                <span class="checkmark"></span>
                <span class="label-text">Detalles de contacto</span>
              </label>
            </div>
          </div>
        </div>

        <div class="settings-group">
          <h3 class="group-title">
            <span class="group-icon">💬</span>
            Mensajes
          </h3>
          
          <div class="setting-item">
            <label class="setting-label">
              <span class="label-text">Permitir mensajes de:</span>
            </label>
            <div class="radio-group">
              <label class="radio-label">
                <input 
                  type="radio" 
                  name="mensajesDesde" 
                  value="todos"
                  [(ngModel)]="settings.privacidad.mensajesDesde"
                  (change)="onSettingsChange()">
                <span class="radio-checkmark"></span>
                <span class="radio-text">Cualquier usuario</span>
              </label>
              <label class="radio-label">
                <input 
                  type="radio" 
                  name="mensajesDesde" 
                  value="club"
                  [(ngModel)]="settings.privacidad.mensajesDesde"
                  (change)="onSettingsChange()">
                <span class="radio-checkmark"></span>
                <span class="radio-text">Solo mi club</span>
              </label>
              <label class="radio-label">
                <input 
                  type="radio" 
                  name="mensajesDesde" 
                  value="contactos"
                  [(ngModel)]="settings.privacidad.mensajesDesde"
                  (change)="onSettingsChange()">
                <span class="radio-checkmark"></span>
                <span class="radio-text">Solo contactos</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Cuenta -->
      <div class="settings-section">
        <h2 class="section-title">
          <span class="title-icon">👤</span>
          Cuenta
        </h2>

        <div class="settings-group">
          <div class="account-actions">
            <button class="account-btn primary" (click)="changePassword()">
              <span class="btn-icon">🔒</span>
              <span class="btn-text">Cambiar contraseña</span>
            </button>

            <button class="account-btn primary" (click)="changeEmail()">
              <span class="btn-icon">📧</span>
              <span class="btn-text">Cambiar email</span>
            </button>

            <button class="account-btn primary" (click)="verifyPhone()">
              <span class="btn-icon">📱</span>
              <span class="btn-text">Verificar teléfono</span>
            </button>

            <button class="account-btn secondary" (click)="requestClubChange()">
              <span class="btn-icon">🏟️</span>
              <span class="btn-text">Solicitar cambio de club</span>
            </button>
          </div>
        </div>

        <div class="settings-group danger-zone">
          <h3 class="group-title danger">
            <span class="group-icon">⚠️</span>
            Zona de Peligro
          </h3>
          
          <div class="danger-actions">
            <button class="account-btn warning" (click)="deactivateAccount()">
              <span class="btn-icon">⚠️</span>
              <span class="btn-text">Desactivar cuenta</span>
            </button>

            <button class="account-btn danger" (click)="deleteAccount()">
              <span class="btn-icon">🗑️</span>
              <span class="btn-text">Eliminar cuenta</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Botón guardar -->
      <div class="save-section">
        <button 
          class="save-btn"
          (click)="saveSettings()"
          [disabled]="!hasChanges || isSaving">
          <span *ngIf="!isSaving" class="save-icon">💾</span>
          <span *ngIf="isSaving" class="save-icon">⏳</span>
          <span class="save-text">
            {{ isSaving ? 'Guardando...' : 'GUARDAR CAMBIOS' }}
          </span>
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit {
  @Input() usuarioId!: string;
  
  @Output() onSettingsUpdate = new EventEmitter<PlayerSettings>();

  settings: PlayerSettings = {
    notificaciones: {
      invitacionesPartidos: true,
      recordatoriosEventos: true,
      actualizacionesRanking: true,
      promocionesOfertas: true,
      notificacionesChat: false
    },
    privacidad: {
      perfilVisible: 'todos',
      estadisticasVisibles: {
        ranking: true,
        historial: true,
        contacto: false
      },
      mensajesDesde: 'todos'
    },
    preferencias: {
      idioma: 'es',
      zonaHoraria: 'Madrid',
      formatoFecha: 'DD/MM/AAAA'
    }
  };

  originalSettings: PlayerSettings = { ...this.settings };
  hasChanges = false;
  isSaving = false;

  ngOnInit(): void {
    // Guardar configuración original para detectar cambios
    this.originalSettings = JSON.parse(JSON.stringify(this.settings));
  }

  onSettingsChange(): void {
    this.hasChanges = JSON.stringify(this.settings) !== JSON.stringify(this.originalSettings);
  }

  saveSettings(): void {
    if (!this.hasChanges || this.isSaving) return;

    this.isSaving = true;
    
    // Simular guardado
    setTimeout(() => {
      this.onSettingsUpdate.emit(this.settings);
      this.originalSettings = JSON.parse(JSON.stringify(this.settings));
      this.hasChanges = false;
      this.isSaving = false;
    }, 1000);
  }

  // Acciones de cuenta
  changePassword(): void {
    // TODO: Implementar modal de cambio de contraseña
    console.log('Cambiar contraseña');
  }

  changeEmail(): void {
    // TODO: Implementar modal de cambio de email
    console.log('Cambiar email');
  }

  verifyPhone(): void {
    // TODO: Implementar modal de verificación de teléfono
    console.log('Verificar teléfono');
  }

  requestClubChange(): void {
    // TODO: Implementar modal de solicitud de cambio de club
    console.log('Solicitar cambio de club');
  }

  deactivateAccount(): void {
    // TODO: Implementar confirmación de desactivación
    if (confirm('¿Estás seguro de que quieres desactivar tu cuenta?')) {
      console.log('Desactivar cuenta');
    }
  }

  deleteAccount(): void {
    // TODO: Implementar confirmación de eliminación
    if (confirm('¿Estás seguro de que quieres eliminar permanentemente tu cuenta? Esta acción no se puede deshacer.')) {
      console.log('Eliminar cuenta');
    }
  }
}
