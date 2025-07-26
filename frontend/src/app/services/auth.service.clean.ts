import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Usuario, RespuestaAutenticacion, SolicitudLogin, SolicitudRegistro } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ServicioAutenticacion {
  private readonly URL_API = 'http://localhost:3000/api';
  private sujetoUsuarioActual = new BehaviorSubject<Usuario | null>(null);
  public usuarioActual$ = this.sujetoUsuarioActual.asObservable();
  
  // Signals para el estado de autenticación
  public estaAutenticado = signal(false);
  public usuarioActual = signal<Usuario | null>(null);

  constructor(
    private http: HttpClient,
    private enrutador: Router
  ) {
    // Restaurar estado de autenticación al inicializar
    this.cargarEstadoAlmacenado();
  }

  private cargarEstadoAlmacenado(): void {
    const token = localStorage.getItem('token_acceso');
    const datosUsuario = localStorage.getItem('datos_usuario');
    
    if (token && datosUsuario) {
      try {
        const usuario = JSON.parse(datosUsuario);
        this.actualizarEstadoUsuario(usuario, true);
        console.log('✅ Estado de autenticación restaurado:', usuario.rol);
      } catch (error) {
        console.error('❌ Error al cargar estado almacenado:', error);
        this.limpiarEstado();
      }
    }
  }

  private actualizarEstadoUsuario(usuario: Usuario | null, estaAutenticado: boolean): void {
    this.usuarioActual.set(usuario);
    this.sujetoUsuarioActual.next(usuario);
    this.estaAutenticado.set(estaAutenticado);
  }

  private limpiarEstado(): void {
    localStorage.removeItem('token_acceso');
    localStorage.removeItem('datos_usuario');
    this.actualizarEstadoUsuario(null, false);
  }

  iniciarSesion(credenciales: SolicitudLogin): Observable<RespuestaAutenticacion> {
    return this.http.post<RespuestaAutenticacion>(`${this.URL_API}/auth/login`, credenciales)
      .pipe(
        tap(respuesta => {
          // Almacenar datos
          localStorage.setItem('token_acceso', respuesta.accessToken);
          localStorage.setItem('datos_usuario', JSON.stringify(respuesta.user));
          
          // Actualizar estado
          this.actualizarEstadoUsuario(respuesta.user, true);
          
          console.log('✅ Login exitoso. Usuario autenticado:', respuesta.user.rol);
        }),
        catchError((error: any) => {
          console.error('❌ Error en login:', error);
          return throwError(error);
        })
      );
  }

  registrarse(datosUsuario: SolicitudRegistro): Observable<RespuestaAutenticacion> {
    return this.http.post<RespuestaAutenticacion>(`${this.URL_API}/auth/register`, datosUsuario)
      .pipe(
        tap(respuesta => {
          localStorage.setItem('token_acceso', respuesta.accessToken);
          localStorage.setItem('datos_usuario', JSON.stringify(respuesta.user));
          this.actualizarEstadoUsuario(respuesta.user, true);
        }),
        catchError((error: any) => {
          return throwError(error);
        })
      );
  }

  cerrarSesion(): void {
    this.limpiarEstado();
    this.enrutador.navigate(['/iniciar-sesion'], { replaceUrl: true });
    console.log('✅ Sesión cerrada');
  }

  // Método de prueba para simular login (solo para desarrollo)
  loginPrueba(esAdmin: boolean = false): void {
    const usuarioPrueba: Usuario = {
      id: '1',
      email: esAdmin ? 'admin@test.com' : 'user@test.com',
      nombre: esAdmin ? 'Admin' : 'Usuario',
      nombreCompleto: esAdmin ? 'Administrador Test' : 'Usuario Test',
      apellidos: 'Test',
      rol: esAdmin ? 'admin' : 'user',
      rangoActual: 'BRONCE',
      imagenPerfil: undefined,
      idClub: undefined,
      estaActivo: true,
      emailVerificado: true,
      fechaCreacion: new Date().toISOString(),
      ultimaActividad: new Date().toISOString()
    };

    localStorage.setItem('token_acceso', 'fake-jwt-token-for-testing');
    localStorage.setItem('datos_usuario', JSON.stringify(usuarioPrueba));
    this.actualizarEstadoUsuario(usuarioPrueba, true);
    
    console.log('✅ Login de prueba exitoso:', usuarioPrueba.rol);
  }

  // Métodos de utilidad
  obtenerToken(): string | null {
    return localStorage.getItem('token_acceso');
  }

  obtenerPerfilUsuario(): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.URL_API}/usuarios/perfil`);
  }

  esAdmin(): boolean {
    const usuario = this.usuarioActual();
    return usuario?.rol === 'admin';
  }

  esJugador(): boolean {
    const usuario = this.usuarioActual();
    return usuario?.rol === 'user' || usuario?.rol === 'jugador';
  }

  limpiarEstadoCompleto(): void {
    localStorage.clear();
    this.actualizarEstadoUsuario(null, false);
    console.log('🧹 Estado completamente limpiado');
  }
}
