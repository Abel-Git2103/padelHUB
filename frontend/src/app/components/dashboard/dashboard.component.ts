import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ServicioAutenticacion } from '../../services/auth.service';
import { Usuario } from '../../models/user.model';
import { obtenerInfoRango } from '../../models/rango.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  usuario = signal<Usuario | null>(null);
  obtenerInfoRango = obtenerInfoRango; // Hacer disponible en la plantilla

  constructor(
    private servicioAuth: ServicioAutenticacion,
    private enrutador: Router
  ) {}

  ngOnInit() {
    // Obtener usuario actual del signal
    const usuarioActual = this.servicioAuth.usuarioActual();
    this.usuario.set(usuarioActual);
    
    // Suscribirse a cambios del usuario solo si es diferente
    this.servicioAuth.usuarioActual$.subscribe(usuario => {
      if (this.usuario() !== usuario) {
        this.usuario.set(usuario);
      }
    });
  }

  obtenerIniciales(): string {
    const usuario = this.usuario();
    if (!usuario) return 'U';
    
    const apellido = usuario.apellidos || usuario.nombre.split(' ')[1] || '';
    return `${usuario.nombre.charAt(0)}${apellido.charAt(0) || usuario.nombre.charAt(1)}`.toUpperCase();
  }

  obtenerPrimerNombre(): string {
    const usuario = this.usuario();
    if (!usuario) return 'Usuario';
    
    // Si el nombre tiene espacios, tomar solo el primer nombre
    const primerNombre = usuario.nombre.split(' ')[0];
    
    // Si es muy largo, truncar
    if (primerNombre.length > 15) {
      return primerNombre.substring(0, 15) + '...';
    }
    
    return primerNombre;
  }

  obtenerColorRango(): string {
    const usuario = this.usuario();
    if (!usuario?.rangoActual) return '#666';
    
    const infoRango = obtenerInfoRango(usuario.rangoActual);
    return infoRango.color;
  }

  calcularPorcentajeVictoria(): number {
    const usuario = this.usuario();
    if (!usuario) {
      return 0;
    }
    
    // TODO: Implementar estadísticas reales cuando estén disponibles en el backend
    // Por ahora retornamos un valor por defecto
    return 0;
  }

  navegarA(ruta: string) {
    this.enrutador.navigate([ruta]);
  }

  cerrarSesion() {
    this.servicioAuth.cerrarSesion();
  }
}
