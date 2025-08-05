import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  action?: {
    label: string;
    handler: () => void;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toasts = signal<Toast[]>([]);
  private nextId = 1;

  // Getter público para acceder a los toasts
  public getToasts = this.toasts.asReadonly();

  private addToast(toast: Omit<Toast, 'id'>): void {
    const newToast: Toast = {
      ...toast,
      id: `toast-${this.nextId++}`,
      duration: toast.duration ?? 5000
    };

    this.toasts.update(toasts => [...toasts, newToast]);

    // Auto-remove toast después de la duración especificada
    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        this.removeToast(newToast.id);
      }, newToast.duration);
    }
  }

  removeToast(id: string): void {
    this.toasts.update(toasts => toasts.filter(t => t.id !== id));
  }

  success(message: string, duration?: number): void {
    this.addToast({
      message,
      type: 'success',
      duration
    });
  }

  error(message: string, duration?: number): void {
    this.addToast({
      message,
      type: 'error',
      duration: duration ?? 8000 // Error toasts duran más
    });
  }

  warning(message: string, duration?: number): void {
    this.addToast({
      message,
      type: 'warning',
      duration
    });
  }

  info(message: string, duration?: number): void {
    this.addToast({
      message,
      type: 'info',
      duration
    });
  }

  // Toast con acción personalizada
  withAction(message: string, type: Toast['type'], actionLabel: string, actionHandler: () => void, duration?: number): void {
    this.addToast({
      message,
      type,
      duration: duration ?? 10000, // Toasts con acción duran más
      action: {
        label: actionLabel,
        handler: actionHandler
      }
    });
  }

  // Limpiar todos los toasts
  clear(): void {
    this.toasts.set([]);
  }
}
