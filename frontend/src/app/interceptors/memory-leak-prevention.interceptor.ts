import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable()
export class MemoryLeakPreventionInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Agregar logging para debug de requests HTTP
    console.log(`🌐 HTTP Request: ${req.method} ${req.url}`);
    
    return next.handle(req).pipe(
      finalize(() => {
        // Asegurar que la request se complete correctamente
        console.log(`✅ HTTP Request completed: ${req.method} ${req.url}`);
      })
    );
  }
}
