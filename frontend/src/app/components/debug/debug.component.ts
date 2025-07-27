import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ServicioAutenticacion } from '../../services/auth.service';
import { takeUntil } from 'rxjs';
import { BaseComponent } from '../../shared/base-component';

@Component({
  selector: 'app-debug',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding: 20px; font-family: monospace; background: #f5f5f5; border: 2px solid #333; margin: 20px; border-radius: 8px;">
      <h1>🔧 Panel de Debug - Autenticación</h1>
      
      <div style="margin: 20px 0; padding: 15px; background: #e8f4f8; border-radius: 5px;">
        <h3>Estado Actual</h3>
        <p><strong>Autenticado:</strong> {{ estaAutenticado() ? '✅ Sí' : '❌ No' }}</p>
        <p><strong>Usuario:</strong> {{ usuarioActual()?.email || 'Ninguno' }}</p>
        <p><strong>Rol:</strong> {{ usuarioActual()?.rol || 'Ninguno' }}</p>
        <p><strong>Ruta actual:</strong> {{ rutaActual() }}</p>
      </div>

      <div style="margin: 20px 0; padding: 15px; background: #fff3cd; border-radius: 5px;">
        <h3>localStorage</h3>
        <p><strong>Token:</strong> {{ token() ? 'Existe' : 'No existe' }}</p>
        <p><strong>Datos usuario:</strong> {{ datosUsuario() ? 'Existen' : 'No existen' }}</p>
      </div>

      <div style="margin: 20px 0;">
        <h3>Acciones de Prueba</h3>
        
        <button (click)="loginComoAdminSistema()" style="padding: 10px 15px; margin: 5px; background: #dc3545; color: white; border: none; border-radius: 5px; font-weight: bold;">
          🔧 Login Admin Sistema → Nueva Pestaña
        </button>
        
        <button (click)="loginComoAdminClub()" style="padding: 10px 15px; margin: 5px; background: #fd7e14; color: white; border: none; border-radius: 5px; font-weight: bold;">
          🏟️ Login Admin Club → Nueva Pestaña
        </button>
        
        <button (click)="loginComoJugador()" style="padding: 10px 15px; margin: 5px; background: #4ecdc4; color: white; border: none; border-radius: 5px; font-weight: bold;">
          🏓 Login Jugador → Nueva Pestaña
        </button>
        
        <button (click)="cerrarSesion()" style="padding: 10px 15px; margin: 5px; background: #ffa726; color: white; border: none; border-radius: 5px; font-weight: bold;">
          🚪 Cerrar Sesión
        </button>
        
        <button (click)="limpiarStorage()" style="padding: 10px 15px; margin: 5px; background: #ab47bc; color: white; border: none; border-radius: 5px; font-weight: bold;">
          🗑️ Limpiar Storage
        </button>
        
        <button (click)="mostrarEstadoCompleto()" style="padding: 10px 15px; margin: 5px; background: #795548; color: white; border: none; border-radius: 5px; font-weight: bold;">
          📋 Estado Completo
        </button>
        
        <button (click)="limpiarLogs()" style="padding: 10px 15px; margin: 5px; background: #607d8b; color: white; border: none; border-radius: 5px; font-weight: bold;">
          🧹 Limpiar Logs
        </button>
      </div>

      <div style="margin: 20px 0; padding: 15px; background: #263238; color: white; border-radius: 5px; max-height: 300px; overflow-y: auto;">
        <h3>Logs de Debug</h3>
        <pre style="color: #4fc3f7; font-size: 0.9em;">{{ logs() }}</pre>
      </div>
    </div>
  `
})
export class DebugComponent extends BaseComponent implements OnInit {
  estaAutenticado = signal(false);
  usuarioActual = signal<any>(null);
  rutaActual = signal('');
  token = signal('');
  datosUsuario = signal('');
  logs = signal('');

  constructor(
    private servicioAuth: ServicioAutenticacion,
    private router: Router
  ) {
    super(); // Llamar al constructor de BaseComponent
  }

  ngOnInit() {
    this.actualizarEstado();
    this.agregarLog('DebugComponent inicializado');
    
    // Suscribirse a cambios en la ruta con takeUntil para evitar memory leaks
    this.router.events.pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.rutaActual.set(this.router.url);
    });
  }

  override ngOnDestroy() {
    this.agregarLog('DebugComponent destruido - suscripciones cerradas');
    super.ngOnDestroy(); // Llamar al ngOnDestroy de BaseComponent
  }

  actualizarEstado() {
    this.estaAutenticado.set(this.servicioAuth.estaAutenticado());
    this.usuarioActual.set(this.servicioAuth.usuarioActual());
    this.rutaActual.set(this.router.url);
    this.token.set(localStorage.getItem('token_acceso') || '');
    this.datosUsuario.set(localStorage.getItem('datos_usuario') || '');
  }

  loginComoAdminSistema() {
    this.agregarLog('� Iniciando login como Admin Sistema...');
    
    const credencialesAdminSistema = {
      email: 'admin.sistema@test.com',
      password: 'password123'
    };

    this.servicioAuth.iniciarSesion(credencialesAdminSistema, false).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (respuesta) => {
        this.agregarLog(`✅ Login exitoso como ${respuesta.user.rol}: ${respuesta.user.email}`);
        this.agregarLog('💾 Guardando datos en localStorage (sin navegación automática)...');
        this.actualizarEstado();
        
        setTimeout(() => {
          this.agregarLog('🔍 Verificando localStorage actualizado...');
          const tokenGuardado = localStorage.getItem('token_acceso');
          const datosGuardados = localStorage.getItem('datos_usuario');
          
          if (tokenGuardado && datosGuardados) {
            this.agregarLog('✅ localStorage confirmado - abriendo nueva pestaña...');
            const nuevaVentana = window.open('/admin', '_blank');
            if (nuevaVentana) {
              this.agregarLog('🆕 Nueva pestaña abierta - navegando a /admin (redirigirá a system/dashboard)');
            } else {
              this.agregarLog('⚠️ No se pudo abrir nueva pestaña (popup bloqueado?)');
            }
          } else {
            this.agregarLog('❌ Error: localStorage no se actualizó correctamente');
          }
        }, 300);
      },
      error: (error) => {
        this.agregarLog(`❌ Error en login Admin Sistema: ${error.message}`);
      }
    });
  }

  loginComoAdminClub() {
    this.agregarLog('🏟️ Iniciando login como Admin Club...');
    
    const credencialesAdminClub = {
      email: 'admin.club@test.com',
      password: 'password123'
    };

    this.servicioAuth.iniciarSesion(credencialesAdminClub, false).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (respuesta) => {
        this.agregarLog(`✅ Login exitoso como ${respuesta.user.rol}: ${respuesta.user.email}`);
        this.agregarLog('💾 Guardando datos en localStorage (sin navegación automática)...');
        this.actualizarEstado();
        
        setTimeout(() => {
          this.agregarLog('🔍 Verificando localStorage actualizado...');
          const tokenGuardado = localStorage.getItem('token_acceso');
          const datosGuardados = localStorage.getItem('datos_usuario');
          
          if (tokenGuardado && datosGuardados) {
            this.agregarLog('✅ localStorage confirmado - abriendo nueva pestaña...');
            const nuevaVentana = window.open('/admin', '_blank');
            if (nuevaVentana) {
              this.agregarLog('🆕 Nueva pestaña abierta - navegando a /admin (redirigirá a club/dashboard)');
            } else {
              this.agregarLog('⚠️ No se pudo abrir nueva pestaña (popup bloqueado?)');
            }
          } else {
            this.agregarLog('❌ Error: localStorage no se actualizó correctamente');
          }
        }, 300);
      },
      error: (error) => {
        this.agregarLog(`❌ Error en login Admin Club: ${error.message}`);
      }
    });
  }

  loginComoJugador() {
    this.agregarLog('🏓 Iniciando login como jugador...');
    
    const credencialesJugador = {
      email: 'jugador@test.com',
      password: 'password123'
    };

    this.servicioAuth.iniciarSesion(credencialesJugador, false).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (respuesta) => {
        this.agregarLog(`✅ Login exitoso como ${respuesta.user.rol}: ${respuesta.user.email}`);
        this.agregarLog('💾 Guardando datos en localStorage (sin navegación automática)...');
        this.actualizarEstado();
        
        // Asegurar que localStorage está completamente actualizado antes de abrir pestaña
        setTimeout(() => {
          this.agregarLog('🔍 Verificando localStorage actualizado...');
          const tokenGuardado = localStorage.getItem('token_acceso');
          const datosGuardados = localStorage.getItem('datos_usuario');
          
          if (tokenGuardado && datosGuardados) {
            this.agregarLog('✅ localStorage confirmado - abriendo nueva pestaña...');
            // Abrir nueva pestaña directamente al dashboard de jugador
            const nuevaVentana = window.open('/jugador/tablero', '_blank');
            if (nuevaVentana) {
              this.agregarLog('🆕 Nueva pestaña abierta - navegando directo a /jugador/tablero');
            } else {
              this.agregarLog('⚠️ No se pudo abrir nueva pestaña (popup bloqueado?)');
            }
          } else {
            this.agregarLog('❌ Error: localStorage no se actualizó correctamente');
          }
        }, 300);
      },
      error: (error) => {
        this.agregarLog(`❌ Error en login jugador: ${error.message}`);
      }
    });
  }

  limpiarStorage() {
    localStorage.clear();
    this.agregarLog('🗑️ LocalStorage limpiado completamente');
    
    // Forzar actualización del estado del servicio
    this.servicioAuth.limpiarEstadoCompleto();
    this.actualizarEstado();
    
    this.agregarLog('🔄 Estado del servicio restablecido');
  }

  cerrarSesion() {
    this.agregarLog('🚪 Cerrando sesión...');
    this.servicioAuth.cerrarSesion();
    this.actualizarEstado();
  }

  limpiarLogs() {
    this.logs.set('');
  }

  mostrarEstadoCompleto() {
    const usuario = this.servicioAuth.usuarioActual();
    const estado = {
      estaAutenticado: this.servicioAuth.estaAutenticado(),
      usuario: usuario,
      localStorage: {
        token: localStorage.getItem('token_acceso'),
        datosUsuario: JSON.parse(localStorage.getItem('datos_usuario') || 'null')
      },
      ruta: this.router.url
    };
    
    this.agregarLog('📋 Estado completo del sistema:');
    this.agregarLog(JSON.stringify(estado, null, 2));
  }

  agregarLog(mensaje: string) {
    const timestamp = new Date().toLocaleTimeString();
    const logActual = this.logs();
    this.logs.set(`[${timestamp}] ${mensaje}\n${logActual}`);
  }
}
