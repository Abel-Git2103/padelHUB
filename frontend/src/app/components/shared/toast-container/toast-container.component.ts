import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, Toast } from '../../../services/toast.service';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container">
      @for (toast of toasts(); track toast.id) {
        <div 
          class="toast"
          [class]="'toast-' + toast.type"
          [@slideIn]>
          
          <div class="toast-icon">
            @switch (toast.type) {
              @case ('success') { <span>✅</span> }
              @case ('error') { <span>❌</span> }
              @case ('warning') { <span>⚠️</span> }
              @case ('info') { <span>ℹ️</span> }
            }
          </div>
          
          <div class="toast-content">
            <span class="toast-message">{{ toast.message }}</span>
            @if (toast.action) {
              <button 
                class="toast-action"
                (click)="handleAction(toast)">
                {{ toast.action.label }}
              </button>
            }
          </div>
          
          <button 
            class="toast-close"
            (click)="closeToast(toast.id)">
            ×
          </button>
        </div>
      }
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 10000;
      display: flex;
      flex-direction: column;
      gap: 12px;
      max-width: 400px;
    }

    .toast {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      backdrop-filter: blur(10px);
      border: 1px solid transparent;
      animation: slideIn 0.3s ease-out;
      max-width: 100%;
      word-wrap: break-word;
    }

    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    .toast-success {
      background: rgba(34, 197, 94, 0.95);
      color: white;
      border-color: rgba(34, 197, 94, 0.3);
    }

    .toast-error {
      background: rgba(239, 68, 68, 0.95);
      color: white;
      border-color: rgba(239, 68, 68, 0.3);
    }

    .toast-warning {
      background: rgba(245, 158, 11, 0.95);
      color: white;
      border-color: rgba(245, 158, 11, 0.3);
    }

    .toast-info {
      background: rgba(59, 130, 246, 0.95);
      color: white;
      border-color: rgba(59, 130, 246, 0.3);
    }

    .toast-icon {
      font-size: 18px;
      flex-shrink: 0;
    }

    .toast-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .toast-message {
      font-size: 14px;
      font-weight: 500;
      line-height: 1.4;
    }

    .toast-action {
      background: rgba(255, 255, 255, 0.2);
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.3);
      padding: 6px 12px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      align-self: flex-start;
    }

    .toast-action:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: translateY(-1px);
    }

    .toast-close {
      background: none;
      border: none;
      color: rgba(255, 255, 255, 0.8);
      font-size: 20px;
      font-weight: bold;
      cursor: pointer;
      padding: 0;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transition: all 0.2s ease;
      flex-shrink: 0;
    }

    .toast-close:hover {
      background: rgba(255, 255, 255, 0.2);
      color: white;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .toast-container {
        top: 10px;
        right: 10px;
        left: 10px;
        max-width: none;
      }
      
      .toast {
        padding: 12px;
      }
      
      .toast-message {
        font-size: 13px;
      }
    }
  `]
})
export class ToastContainerComponent {
  toasts = computed(() => this.toastService.getToasts());

  constructor(private toastService: ToastService) {}

  closeToast(id: string): void {
    this.toastService.removeToast(id);
  }

  handleAction(toast: Toast): void {
    if (toast.action) {
      toast.action.handler();
      this.closeToast(toast.id);
    }
  }
}
