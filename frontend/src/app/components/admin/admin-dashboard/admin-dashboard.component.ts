import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ServicioAutenticacion } from '../../../services/auth.service';
import { Usuario } from '../../../models/user.model';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  usuario = signal<Usuario | null>(null);
  estadisticas = signal({
    totalUsuarios: 0,
    totalClubes: 0,
    partidosHoy: 0,
    usuariosActivos: 0
  });

  constructor(
    private servicioAuth: ServicioAutenticacion,
    private enrutador: Router
  ) {}

  ngOnInit() {
    const usuarioActual = this.servicioAuth.usuarioActual();
    this.usuario.set(usuarioActual);
    
    // Cargar estadísticas (simuladas por ahora)
    this.cargarEstadisticas();
  }

  private cargarEstadisticas() {
    // TODO: Implementar llamadas reales al backend
    this.estadisticas.set({
      totalUsuarios: 1250,
      totalClubes: 45,
      partidosHoy: 23,
      usuariosActivos: 89
    });
  }

  navegarA(ruta: string) {
    this.enrutador.navigate([ruta]);
  }
}
