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
    
    // Manejo seguro del localStorage
    try {
      this.token.set(this.obtenerDeStorage('token_acceso') || '');
      this.datosUsuario.set(this.obtenerDeStorage('datos_usuario') || '');
    } catch (error) {
      this.agregarLog(`⚠️ Error al acceder al localStorage: ${error}`);
      this.token.set('Error al acceder');
      this.datosUsuario.set('Error al acceder');
    }
  }

  // Método auxiliar para acceso seguro al storage
  private obtenerDeStorage(clave: string): string | null {
    try {
      return localStorage.getItem(clave) || sessionStorage.getItem(clave);
    } catch (error) {
      console.error(`Error al acceder al storage para la clave ${clave}:`, error);
      return null;
    }
  }

  // Método auxiliar para escritura segura al storage
  private guardarEnStorage(clave: string, valor: string, recordarme: boolean = true): boolean {
    try {
      const storage = recordarme ? localStorage : sessionStorage;
      storage.setItem(clave, valor);
      return true;
    } catch (error) {
      console.error(`Error al guardar en storage para la clave ${clave}:`, error);
      return false;
    }
  }

  // Método auxiliar para limpiar storage de forma segura
  private limpiarStorageSeguro(): void {
    try {
      localStorage.clear();
      sessionStorage.clear();
      this.agregarLog('🗑️ Storage limpiado exitosamente');
    } catch (error) {
      this.agregarLog(`⚠️ Error al limpiar storage: ${error}`);
    }
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
          const tokenGuardado = this.obtenerDeStorage('token_acceso');
          const datosGuardados = this.obtenerDeStorage('datos_usuario');
          
          if (tokenGuardado && datosGuardados) {
            this.agregarLog('✅ localStorage confirmado - abriendo nueva pestaña...');
            try {
              const nuevaVentana = window.open('/admin', '_blank');
              if (nuevaVentana) {
                this.agregarLog('🆕 Nueva pestaña abierta - navegando a /admin (redirigirá a system/dashboard)');
              } else {
                this.agregarLog('⚠️ No se pudo abrir nueva pestaña (popup bloqueado?)');
              }
            } catch (error) {
              this.agregarLog(`❌ Error al abrir nueva pestaña: ${error}`);
            }
          } else {
            this.agregarLog('❌ Error: localStorage no se actualizó correctamente');
            this.agregarLog(`   Token: ${tokenGuardado ? 'OK' : 'FALTA'}`);
            this.agregarLog(`   Datos: ${datosGuardados ? 'OK' : 'FALTA'}`);
          }
        }, 300);
      },
      error: (error) => {
        this.agregarLog(`❌ Error en login Admin Sistema: ${error.message || error}`);
        console.error('Error completo:', error);
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
          const tokenGuardado = this.obtenerDeStorage('token_acceso');
          const datosGuardados = this.obtenerDeStorage('datos_usuario');
          
          if (tokenGuardado && datosGuardados) {
            this.agregarLog('✅ localStorage confirmado - abriendo nueva pestaña...');
            try {
              const nuevaVentana = window.open('/admin', '_blank');
              if (nuevaVentana) {
                this.agregarLog('🆕 Nueva pestaña abierta - navegando a /admin (redirigirá a club/dashboard)');
              } else {
                this.agregarLog('⚠️ No se pudo abrir nueva pestaña (popup bloqueado?)');
              }
            } catch (error) {
              this.agregarLog(`❌ Error al abrir nueva pestaña: ${error}`);
            }
          } else {
            this.agregarLog('❌ Error: localStorage no se actualizó correctamente');
            this.agregarLog(`   Token: ${tokenGuardado ? 'OK' : 'FALTA'}`);
            this.agregarLog(`   Datos: ${datosGuardados ? 'OK' : 'FALTA'}`);
          }
        }, 300);
      },
      error: (error) => {
        this.agregarLog(`❌ Error en login Admin Club: ${error.message || error}`);
        console.error('Error completo:', error);
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
          const tokenGuardado = this.obtenerDeStorage('token_acceso');
          const datosGuardados = this.obtenerDeStorage('datos_usuario');
          
          if (tokenGuardado && datosGuardados) {
            this.agregarLog('✅ localStorage confirmado - abriendo nueva pestaña...');
            try {
              // Abrir nueva pestaña directamente al dashboard de jugador
              const nuevaVentana = window.open('/jugador/tablero', '_blank');
              if (nuevaVentana) {
                this.agregarLog('🆕 Nueva pestaña abierta - navegando directo a /jugador/tablero');
              } else {
                this.agregarLog('⚠️ No se pudo abrir nueva pestaña (popup bloqueado?)');
              }
            } catch (error) {
              this.agregarLog(`❌ Error al abrir nueva pestaña: ${error}`);
            }
          } else {
            this.agregarLog('❌ Error: localStorage no se actualizó correctamente');
            this.agregarLog(`   Token: ${tokenGuardado ? 'OK' : 'FALTA'}`);
            this.agregarLog(`   Datos: ${datosGuardados ? 'OK' : 'FALTA'}`);
          }
        }, 300);
      },
      error: (error) => {
        this.agregarLog(`❌ Error en login jugador: ${error.message || error}`);
        console.error('Error completo:', error);
      }
    });
  }

  limpiarStorage() {
    try {
      localStorage.clear();
      sessionStorage.clear();
      this.agregarLog('🗑️ LocalStorage y SessionStorage limpiados completamente');
    } catch (error) {
      const mensaje = error instanceof Error ? error.message : String(error);
      this.agregarLog(`⚠️ Error al limpiar storage: ${mensaje}`);
    }
    
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
    const tokenStorage = this.obtenerDeStorage('token_acceso');
    const datosStorage = this.obtenerDeStorage('datos_usuario');
    
    const estado = {
      estaAutenticado: this.servicioAuth.estaAutenticado(),
      usuario: usuario,
      localStorage: {
        token: tokenStorage,
        datosUsuario: datosStorage ? JSON.parse(datosStorage) : null
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
