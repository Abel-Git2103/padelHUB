import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { ServicioAutenticacion } from '../../services/auth.service';
import { Usuario } from '../../models/user.model';
import { obtenerInfoRango } from '../../models/rango.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mobile-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './mobile-layout.component.html',
  styleUrl: './mobile-layout.component.scss'
})
export class MobileLayoutComponent implements OnInit, OnDestroy {
  usuario = signal<Usuario | null>(null);
  rutaActiva = signal<string>('');
  obtenerInfoRango = obtenerInfoRango;
  
  private subscripcionUsuario?: Subscription;

  constructor(
    private servicioAuth: ServicioAutenticacion,
    private enrutador: Router
  ) {}

  ngOnInit() {
    const usuarioActual = this.servicioAuth.usuarioActual();
    this.usuario.set(usuarioActual);
    
    // Solo suscribirse una vez para evitar múltiples actualizaciones
    this.subscripcionUsuario = this.servicioAuth.usuarioActual$.subscribe(usuario => {
      if (usuario !== this.usuario()) {
        this.usuario.set(usuario);
      }
    });

    // Detectar ruta activa solo una vez
    this.rutaActiva.set(this.enrutador.url);
  }

  ngOnDestroy() {
    // Limpiar suscripciones para evitar memory leaks
    if (this.subscripcionUsuario) {
      this.subscripcionUsuario.unsubscribe();
    }
  }

  obtenerIniciales(): string {
    const usuario = this.usuario();
    if (!usuario) return 'U';
    
    const apellido = usuario.apellidos || usuario.nombre.split(' ')[1] || '';
    return `${usuario.nombre.charAt(0)}${apellido.charAt(0) || usuario.nombre.charAt(1)}`.toUpperCase();
  }

  navegarA(ruta: string) {
    this.rutaActiva.set(ruta);
    this.enrutador.navigate([ruta]);
  }

  cerrarSesion() {
    this.servicioAuth.cerrarSesion();
  }

  esRutaActiva(ruta: string): boolean {
    return this.rutaActiva().includes(ruta);
  }
}
