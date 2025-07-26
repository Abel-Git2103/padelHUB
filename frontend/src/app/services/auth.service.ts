import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
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
    // Verificar si hay un token guardado al inicializar
    this.verificarTokenAlmacenado();
  }

  private verificarTokenAlmacenado(): void {
    const token = localStorage.getItem('token_acceso');
    const datosUsuario = localStorage.getItem('datos_usuario');
    
    if (token && datosUsuario) {
      try {
        const usuario = JSON.parse(datosUsuario);
        this.usuarioActual.set(usuario);
        this.sujetoUsuarioActual.next(usuario);
        this.estaAutenticado.set(true);
      } catch (error) {
        console.error('Error al analizar datos de usuario almacenados:', error);
        this.cerrarSesion();
      }
    }
  }

  iniciarSesion(credenciales: SolicitudLogin): Observable<RespuestaAutenticacion> {
    return this.http.post<RespuestaAutenticacion>(`${this.URL_API}/auth/login`, credenciales)
      .pipe(
        tap(respuesta => {
          localStorage.setItem('token_acceso', respuesta.token_acceso);
          localStorage.setItem('datos_usuario', JSON.stringify(respuesta.usuario));
          this.usuarioActual.set(respuesta.usuario);
          this.sujetoUsuarioActual.next(respuesta.usuario);
          this.estaAutenticado.set(true);
        })
      );
  }

  registrarse(datosUsuario: SolicitudRegistro): Observable<RespuestaAutenticacion> {
    return this.http.post<RespuestaAutenticacion>(`${this.URL_API}/auth/register`, datosUsuario)
      .pipe(
        tap(respuesta => {
          localStorage.setItem('token_acceso', respuesta.token_acceso);
          localStorage.setItem('datos_usuario', JSON.stringify(respuesta.usuario));
          this.usuarioActual.set(respuesta.usuario);
          this.sujetoUsuarioActual.next(respuesta.usuario);
          this.estaAutenticado.set(true);
        })
      );
  }

  cerrarSesion(): void {
    localStorage.removeItem('token_acceso');
    localStorage.removeItem('datos_usuario');
    this.usuarioActual.set(null);
    this.sujetoUsuarioActual.next(null);
    this.estaAutenticado.set(false);
    this.enrutador.navigate(['/iniciar-sesion']);
  }

  obtenerToken(): string | null {
    return localStorage.getItem('token_acceso');
  }

  obtenerPerfilUsuario(): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.URL_API}/usuarios/perfil`);
  }
}
