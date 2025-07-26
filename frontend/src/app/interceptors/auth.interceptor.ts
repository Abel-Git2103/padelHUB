import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServicioAutenticacion } from '../services/auth.service';

@Injectable()
export class InterceptorAutenticacion implements HttpInterceptor {

  constructor(private servicioAuth: ServicioAutenticacion) {}

  intercept(solicitud: HttpRequest<any>, siguiente: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.servicioAuth.obtenerToken();
    
    if (token) {
      const solicitudConToken = solicitud.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return siguiente.handle(solicitudConToken);
    }
    
    return siguiente.handle(solicitud);
  }
}
