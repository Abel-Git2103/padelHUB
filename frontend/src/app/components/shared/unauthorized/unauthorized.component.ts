import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ServicioAutenticacion } from '../../../services/auth.service';
import { ROLES } from '../../../models/roles.constants';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="unauthorized-container">
      <div class="unauthorized-card">
        <div class="error-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
          </svg>
        </div>
        
        <h1>Acceso No Autorizado</h1>
        <p class="error-message">
          No tienes los permisos necesarios para acceder a esta página.
        </p>
        
        <div class="user-info" *ngIf="usuario">
          <p><strong>Usuario:</strong> {{ usuario.email }}</p>
          <p><strong>Rol:</strong> {{ usuario.rol }}</p>
        </div>
        
        <div class="actions">
          <button class="btn btn-primary" (click)="irADashboard()">
            Ir a mi Dashboard
          </button>
          <button class="btn btn-secondary" (click)="cerrarSesion()">
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .unauthorized-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
    }

    .unauthorized-card {
      background: white;
      border-radius: 16px;
      padding: 40px;
      text-align: center;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
      max-width: 500px;
      width: 100%;
    }

    .error-icon {
      color: #e53e3e;
      margin-bottom: 24px;
    }

    h1 {
      color: #2d3748;
      margin: 0 0 16px 0;
      font-size: 28px;
      font-weight: 700;
    }

    .error-message {
      color: #718096;
      margin-bottom: 24px;
      font-size: 16px;
      line-height: 1.5;
    }

    .user-info {
      background: #f7fafc;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 24px;
      text-align: left;
    }

    .user-info p {
      margin: 4px 0;
      color: #4a5568;
    }

    .actions {
      display: flex;
      gap: 12px;
      justify-content: center;
      flex-wrap: wrap;
    }

    .btn {
      padding: 12px 24px;
      border-radius: 8px;
      font-weight: 600;
      text-decoration: none;
      border: none;
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-primary {
      background: #2e7d32;
      color: white;
    }

    .btn-primary:hover {
      background: #1b5e20;
      transform: translateY(-2px);
    }

    .btn-secondary {
      background: #e2e8f0;
      color: #4a5568;
    }

    .btn-secondary:hover {
      background: #cbd5e0;
      transform: translateY(-2px);
    }

    @media (max-width: 480px) {
      .unauthorized-card {
        padding: 24px;
      }
      
      .actions {
        flex-direction: column;
      }
      
      .btn {
        width: 100%;
      }
    }
  `]
})
export class UnauthorizedComponent {
  usuario: any;

  constructor(
    private router: Router,
    private authService: ServicioAutenticacion
  ) {
    this.usuario = this.authService.usuarioActual();
  }

  irADashboard() {
    const usuario = this.authService.usuarioActual();
    
    if (!usuario) {
      this.router.navigate(['/iniciar-sesion']);
      return;
    }

    // Redirigir al dashboard correcto según el rol
    if (usuario.rol === ROLES.ADMIN_SISTEMA) {
      this.router.navigate(['/admin/system/dashboard']);
    } else if (usuario.rol === ROLES.ADMIN_CLUB) {
      this.router.navigate(['/admin/club/dashboard']);
    } else if (usuario.rol === ROLES.JUGADOR) {
      this.router.navigate(['/jugador/tablero']);
    } else {
      this.router.navigate(['/iniciar-sesion']);
    }
  }

  cerrarSesion() {
    this.authService.cerrarSesion();
  }
}
