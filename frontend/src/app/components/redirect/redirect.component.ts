import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ServicioAutenticacion } from '../../services/auth.service';

@Component({
  selector: 'app-redirect',
  standalone: true,
  template: `
    <div class="redirect-container">
      <div class="loading-spinner">
        <div class="spinner"></div>
      </div>
      <p>Redirigiendo...</p>
    </div>
  `,
  styles: [`
    .redirect-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      background: #f8fafc;
    }
    
    .loading-spinner {
      margin-bottom: 16px;
    }
    
    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #e2e8f0;
      border-top: 4px solid #2E7D32;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    p {
      color: #64748b;
      font-size: 16px;
      margin: 0;
    }
  `]
})
export class RedirectComponent implements OnInit, OnDestroy {
  private redirectTimeout?: number;
  private hasRedirected = false;

  constructor(
    private servicioAuth: ServicioAutenticacion,
    private enrutador: Router
  ) {}

  ngOnInit() {
    // Evitar múltiples redirecciones
    if (!this.hasRedirected) {
      this.redirigirSegunRol();
    }
  }

  ngOnDestroy() {
    if (this.redirectTimeout) {
      clearTimeout(this.redirectTimeout);
    }
  }

  private redirigirSegunRol() {
    const usuario = this.servicioAuth.usuarioActual();
    const rutaActual = this.enrutador.url;
    
    // Evitar bucles infinitos
    if (this.hasRedirected) {
      return;
    }
    
    if (!usuario) {
      this.hasRedirected = true;
      this.enrutador.navigate(['/iniciar-sesion'], { replaceUrl: true });
      return;
    }

    // Determinar la ruta de destino según el rol y la ruta actual
    let rutaDestino = '';
    
    if (usuario.rol === 'admin') {
      if (rutaActual.includes('tablero')) {
        rutaDestino = '/admin/dashboard';
      } else if (rutaActual.includes('perfil')) {
        rutaDestino = '/admin/dashboard';
      } else if (rutaActual.includes('clubes')) {
        rutaDestino = '/admin/clubes';
      } else if (rutaActual.includes('rankings')) {
        rutaDestino = '/admin/rankings';
      } else {
        rutaDestino = '/admin/dashboard';
      }
    } else {
      if (rutaActual.includes('tablero')) {
        rutaDestino = '/jugador/tablero';
      } else if (rutaActual.includes('perfil')) {
        rutaDestino = '/jugador/perfil';
      } else if (rutaActual.includes('clubes')) {
        rutaDestino = '/jugador/clubes';
      } else if (rutaActual.includes('rankings')) {
        rutaDestino = '/jugador/rankings';
      } else {
        rutaDestino = '/jugador/tablero';
      }
    }

    this.hasRedirected = true;
    // Redirigir inmediatamente sin delay para mejorar performance
    this.enrutador.navigate([rutaDestino], { replaceUrl: true });
  }
}
