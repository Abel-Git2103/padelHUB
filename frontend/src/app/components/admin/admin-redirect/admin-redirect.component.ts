import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AdminPermissionsService } from '../../../services/admin-permissions.service';
import { ServicioAutenticacion } from '../../../services/auth.service';
import { ROLES } from '../../../models/roles.constants';

@Component({
  selector: 'app-admin-redirect',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="admin-redirect">
      <div class="loading-container">
        <div class="loading-spinner"></div>
        <p>Redirigiendo al panel de administración...</p>
      </div>
    </div>
  `,
  styles: [`
    .admin-redirect {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: #f8fafc;
    }

    .loading-container {
      text-align: center;
      padding: 40px;
      background: white;
      border-radius: 16px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      border: 1px solid #e2e8f0;
    }

    .loading-spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #e2e8f0;
      border-top: 4px solid var(--primary-color);
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 20px;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    p {
      color: #64748b;
      margin: 0;
      font-size: 16px;
    }
  `]
})
export class AdminRedirectComponent implements OnInit, OnDestroy {
  private hasRedirected = false;
  
  private router = inject(Router);
  private authService = inject(ServicioAutenticacion);
  private permissionsService = inject(AdminPermissionsService);

  ngOnInit(): void {
    // Redirección inmediata sin delays ni verificaciones adicionales
    this.redirectToCorrectDashboard();
  }

  ngOnDestroy(): void {
    // Componente destruido
  }

  private redirectToCorrectDashboard(): void {
    // Evitar bucle si ya se ha redirigido
    if (this.hasRedirected) {
      return;
    }

    // Marcar como redirigido ANTES de cualquier lógica
    this.hasRedirected = true;

    const usuario = this.authService.usuarioActual();
    
    if (!usuario) {
      console.log('❌ AdminRedirect: No hay usuario, redirigiendo a login');
      this.router.navigate(['/iniciar-sesion'], { replaceUrl: true });
      return;
    }

    console.log('🔄 AdminRedirect: Redirigiendo según rol:', usuario.rol);

    // Redirección directa sin setTimeout ni verificaciones adicionales
    if (usuario.rol === ROLES.ADMIN_SISTEMA) {
      console.log('   → Admin Sistema: /admin/system/dashboard');
      this.router.navigate(['/admin/system/dashboard'], { replaceUrl: true });
    } else if (usuario.rol === ROLES.ADMIN_CLUB) {
      console.log('   → Admin Club: /admin/club/dashboard');
      this.router.navigate(['/admin/club/dashboard'], { replaceUrl: true });
    } else {
      console.log('   → Rol no admin, redirigiendo a jugador');
      this.router.navigate(['/jugador/tablero'], { replaceUrl: true });
    }
  }
}
