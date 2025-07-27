import { Injectable, signal, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, throwError, Subject } from 'rxjs';
import { tap, catchError, takeUntil } from 'rxjs/operators';
import {
  Usuario,
  RespuestaAutenticacion,
  SolicitudLogin,
  SolicitudRegistro,
} from '../models/user.model';
import { ROLES } from '../models/roles.constants';

@Injectable({
  providedIn: 'root',
})
export class ServicioAutenticacion implements OnDestroy {
  private readonly URL_API = 'http://localhost:3000/api';
  private sujetoUsuarioActual = new BehaviorSubject<Usuario | null>(null);
  public usuarioActual$ = this.sujetoUsuarioActual.asObservable();

  // Subject para manejar la destrucción de suscripciones
  private destroy$ = new Subject<void>();

  // Signals para el estado de autenticación
  public estaAutenticado = signal(false);
  public usuarioActual = signal<Usuario | null>(null);

  constructor(
    private http: HttpClient,
    private enrutador: Router,
  ) {
    // Restaurar estado de autenticación al inicializar
    this.cargarEstadoAlmacenado();
  }

  private cargarEstadoAlmacenado(): void {
    // Verificar primero localStorage, luego sessionStorage
    let token = localStorage.getItem('token_acceso') || sessionStorage.getItem('token_acceso');
    let datosUsuario = localStorage.getItem('datos_usuario') || sessionStorage.getItem('datos_usuario');
    
    const storageUsado = localStorage.getItem('token_acceso') ? 'localStorage' : 'sessionStorage';

    console.log('🔍 Cargando estado desde storage:', {
      token: token ? 'Existe' : 'No existe',
      datosUsuario: datosUsuario ? 'Existe' : 'No existe',
      storageUsado: storageUsado
    });

    if (token && datosUsuario) {
      try {
        const usuario = JSON.parse(datosUsuario);
        console.log('🔍 Usuario parseado del storage:', {
          email: usuario.email,
          rol: usuario.rol,
          rolTipo: typeof usuario.rol,
          storage: storageUsado
        });

        this.actualizarEstadoUsuario(usuario, true);
        console.log('✅ Estado de autenticación restaurado:', usuario.rol);
      } catch (error) {
        console.error('❌ Error al cargar estado almacenado:', error);
        this.limpiarEstado();
      }
    }
  }

  private actualizarEstadoUsuario(
    usuario: Usuario | null,
    estaAutenticado: boolean,
  ): void {
    console.log('🔄 Actualizando estado usuario:', {
      usuario: usuario
        ? {
            email: usuario.email,
            rol: usuario.rol,
            nombre: usuario.nombre,
          }
        : null,
      estaAutenticado,
    });

    this.usuarioActual.set(usuario);
    this.sujetoUsuarioActual.next(usuario);
    this.estaAutenticado.set(estaAutenticado);
  }

  private limpiarEstado(): void {
    // Limpiar ambos storages
    localStorage.removeItem('token_acceso');
    localStorage.removeItem('datos_usuario');
    sessionStorage.removeItem('token_acceso');
    sessionStorage.removeItem('datos_usuario');
    this.actualizarEstadoUsuario(null, false);
    console.log('🧹 Estado de autenticación limpiado de ambos storages');
  }

  iniciarSesion(
    credenciales: SolicitudLogin & { recordarme?: boolean },
    autoNavigate: boolean = true,
  ): Observable<RespuestaAutenticacion> {
    return this.http
      .post<RespuestaAutenticacion>(`${this.URL_API}/auth/login`, {
        email: credenciales.email,
        password: credenciales.password
      })
      .pipe(
        tap((respuesta) => {
          // Usar localStorage o sessionStorage según "recordarme"
          const storage = credenciales.recordarme ? localStorage : sessionStorage;
          
          console.log(`💾 Almacenando datos en ${credenciales.recordarme ? 'localStorage' : 'sessionStorage'}`);
          console.log(`   📝 Recordarme: ${credenciales.recordarme ? 'SÍ' : 'NO'}`);
          
          // Limpiar ambos storages antes de guardar
          localStorage.removeItem('token_acceso');
          localStorage.removeItem('datos_usuario');
          sessionStorage.removeItem('token_acceso'); 
          sessionStorage.removeItem('datos_usuario');
          
          // Guardar en el storage correspondiente
          storage.setItem('token_acceso', respuesta.accessToken);
          storage.setItem('datos_usuario', JSON.stringify(respuesta.user));

          // Actualizar estado
          this.actualizarEstadoUsuario(respuesta.user, true);

          console.log(
            '✅ Login exitoso. Usuario autenticado:',
            respuesta.user.rol,
          );

          // Navegar según el rol del usuario solo si autoNavigate es true
          if (autoNavigate) {
            setTimeout(() => {
              if (respuesta.user.rol === ROLES.ADMIN_SISTEMA || respuesta.user.rol === ROLES.ADMIN_CLUB) {
                this.enrutador.navigate(['/admin'], {
                  replaceUrl: true,
                });
              } else {
                this.enrutador.navigate(['/jugador/tablero'], {
                  replaceUrl: true,
                });
              }
            }, 0);
          }
        }),
        catchError((error: any) => {
          console.error('❌ Error en login:', error);
          return throwError(error);
        }),
      );
  }

  registrarse(
    datosUsuario: SolicitudRegistro,
  ): Observable<RespuestaAutenticacion> {
    return this.http
      .post<RespuestaAutenticacion>(
        `${this.URL_API}/auth/register`,
        datosUsuario,
      )
      .pipe(
        tap((respuesta) => {
          localStorage.setItem('token_acceso', respuesta.accessToken);
          localStorage.setItem('datos_usuario', JSON.stringify(respuesta.user));
          this.actualizarEstadoUsuario(respuesta.user, true);
        }),
        catchError((error: any) => {
          return throwError(error);
        }),
      );
  }

  cerrarSesion(): void {
    this.limpiarEstado();
    this.enrutador.navigate(['/iniciar-sesion'], { replaceUrl: true });
    console.log('✅ Sesión cerrada');
  }

  // Métodos de utilidad
  obtenerToken(): string | null {
    return localStorage.getItem('token_acceso') || sessionStorage.getItem('token_acceso');
  }

  obtenerPerfilUsuario(): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.URL_API}/usuarios/perfil`);
  }

  esAdmin(): boolean {
    const usuario = this.usuarioActual();
    return usuario?.rol === ROLES.ADMIN_SISTEMA || usuario?.rol === ROLES.ADMIN_CLUB;
  }

  esAdminSistema(): boolean {
    const usuario = this.usuarioActual();
    return usuario?.rol === ROLES.ADMIN_SISTEMA;
  }

  esAdminClub(): boolean {
    const usuario = this.usuarioActual();
    return usuario?.rol === ROLES.ADMIN_CLUB;
  }

  esJugador(): boolean {
    const usuario = this.usuarioActual();
    return usuario?.rol === ROLES.JUGADOR;
  }

  limpiarEstadoCompleto(): void {
    localStorage.clear();
    this.actualizarEstadoUsuario(null, false);
    console.log('🧹 Estado completamente limpiado');
  }

  ngOnDestroy(): void {
    // Completar el subject para cerrar todas las suscripciones
    this.destroy$.next();
    this.destroy$.complete();

    // Cerrar el BehaviorSubject
    this.sujetoUsuarioActual.complete();

    console.log('🔄 ServicioAutenticacion destruido - suscripciones cerradas');
  }
}
