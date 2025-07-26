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
    
    // Suscribirse a cambios del usuario
    this.servicioAuth.usuarioActual$.subscribe(usuario => {
      this.usuario.set(usuario);
    });
  }

  obtenerIniciales(): string {
    const usuario = this.usuario();
    if (!usuario) return 'U';
    
    const apellido = usuario.apellido || usuario.nombre.split(' ')[1] || '';
    return `${usuario.nombre.charAt(0)}${apellido.charAt(0) || usuario.nombre.charAt(1)}`.toUpperCase();
  }

  obtenerColorRango(): string {
    const usuario = this.usuario();
    if (!usuario?.rango) return '#666';
    
    const infoRango = obtenerInfoRango(usuario.rango);
    return infoRango.color;
  }

  calcularPorcentajeVictoria(): number {
    const usuario = this.usuario();
    if (!usuario || !usuario.partidosJugados || usuario.partidosJugados === 0) {
      return 0;
    }
    
    const partidosGanados = usuario.partidosGanados || 0;
    const porcentaje = (partidosGanados / usuario.partidosJugados) * 100;
    return Math.round(porcentaje);
  }

  navegarA(ruta: string) {
    this.enrutador.navigate([ruta]);
  }

  cerrarSesion() {
    this.servicioAuth.cerrarSesion();
  }
}
