import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ServicioAutenticacion } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuardAutenticacion implements CanActivate {

  constructor(
    private servicioAuth: ServicioAutenticacion,
    private enrutador: Router
  ) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.servicioAuth.estaAutenticado()) {
      return true;
    } else {
      this.enrutador.navigate(['/iniciar-sesion']);
      return false;
    }
  }
}
