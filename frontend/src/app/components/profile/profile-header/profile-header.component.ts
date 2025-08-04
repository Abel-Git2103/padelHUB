import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="profile-header">
      <!-- Avatar y botón de edición -->
      <div class="avatar-section">
        <div class="avatar-container">
          <img 
            [src]="usuario.imagenPerfil || '/assets/images/default-avatar.png'" 
            [alt]="usuario.nombreCompleto"
            class="avatar">
          
          <!-- Botón de editar avatar (solo si es el propio perfil) -->
          <button 
            *ngIf="isOwnProfile"
            class="edit-avatar-btn"
            (click)="triggerFileInput()"
            title="Cambiar foto de perfil">
            📸
          </button>
        </div>
        
        <!-- Input file oculto -->
        <input 
          #fileInput
          type="file" 
          accept="image/*"
          (change)="onFileSelected($event)"
          style="display: none;">
      </div>

      <!-- Información del usuario -->
      <div class="user-info">
        <div class="user-details">
          <h1 class="user-name">{{ usuario.nombreCompleto }}</h1>
          
          <div class="user-meta">
            <div class="meta-item">
              <span class="icon">🎾</span>
              <span class="text">{{ usuario.rangoActual }}</span>
            </div>
            
            <div class="meta-item">
              <span class="icon">🏟️</span>
              <span class="text">{{ usuario.club.nombre }}</span>
            </div>
            
            <div class="meta-item" *ngIf="usuario.telefono">
              <span class="icon">📱</span>
              <span class="text">{{ usuario.telefono }}</span>
            </div>
            
            <div class="meta-item">
              <span class="icon">📧</span>
              <span class="text">{{ usuario.email }}</span>
            </div>
          </div>
        </div>

        <!-- Botón de editar perfil -->
        <button 
          *ngIf="isOwnProfile"
          class="edit-profile-btn"
          (click)="editProfile()">
          ✏️ Editar
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./profile-header.component.scss']
})
export class ProfileHeaderComponent {
  @Input() usuario: any;
  @Input() isOwnProfile: boolean = false;
  
  @Output() onEditProfile = new EventEmitter<void>();
  @Output() onAvatarChange = new EventEmitter<File>();

  triggerFileInput(): void {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    fileInput?.click();
  }

  editProfile(): void {
    this.onEditProfile.emit();
  }

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    
    if (file) {
      // Validar tipo de archivo
      if (!file.type.startsWith('image/')) {
        alert('Por favor selecciona un archivo de imagen válido.');
        return;
      }
      
      // Validar tamaño (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('La imagen no puede ser mayor a 5MB.');
        return;
      }
      
      this.onAvatarChange.emit(file);
    }
  }
}
