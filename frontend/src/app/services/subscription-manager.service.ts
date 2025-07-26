import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionManagerService {
  
  /**
   * Crea un observable que se completará automáticamente cuando se complete destroySubject
   * @param source Observable fuente
   * @param destroySubject Subject que controla cuándo cancelar la suscripción
   * @returns Observable que se completa automáticamente
   */
  manageSubscription<T>(source: Observable<T>, destroySubject: Subject<void>): Observable<T> {
    return source.pipe(takeUntil(destroySubject));
  }

  /**
   * Maneja múltiples suscripciones y las cancela cuando se destruye el componente
   * @param subscriptions Array de suscripciones a manejar
   * @param destroySubject Subject que se dispara en ngOnDestroy
   */
  addSubscriptions(subscriptions: Subscription[], destroySubject: Subject<void>): void {
    destroySubject.subscribe(() => {
      subscriptions.forEach(sub => {
        if (sub && !sub.closed) {
          sub.unsubscribe();
          console.log('🔄 Suscripción cerrada');
        }
      });
    });
  }

  /**
   * Crea un Subject que se puede usar para manejar la destrucción de suscripciones
   * @returns Subject para manejar destrucción
   */
  createDestroySubject(): Subject<void> {
    return new Subject<void>();
  }
}
