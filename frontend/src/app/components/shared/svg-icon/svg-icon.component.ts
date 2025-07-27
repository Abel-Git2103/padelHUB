import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export type IconType = 
  | 'clubes' 
  | 'usuarios' 
  | 'ingresos' 
  | 'partidos' 
  | 'analytics' 
  | 'configuracion' 
  | 'rankings'
  | 'actividad'
  | 'suscripcion'
  | 'suspension';

@Component({
  selector: 'app-svg-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="svg-icon" [innerHTML]="getSvgIcon()"></div>
  `,
  styles: [`
    .svg-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    .svg-icon svg {
      width: 100%;
      height: 100%;
    }
  `]
})
export class SvgIconComponent {
  @Input() type: IconType = 'clubes';
  @Input() size: number = 24;
  @Input() color: string = 'currentColor';

  constructor(private sanitizer: DomSanitizer) {}

  getSvgIcon(): SafeHtml {
    const svgString = this.getIconSvg();
    return this.sanitizer.bypassSecurityTrustHtml(svgString);
  }

  private getIconSvg(): string {
    const iconMap: Record<IconType, string> = {
      clubes: `
        <svg width="${this.size}" height="${this.size}" viewBox="0 0 24 24" fill="none" stroke="${this.color}" stroke-width="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
      `,
      usuarios: `
        <svg width="${this.size}" height="${this.size}" viewBox="0 0 24 24" fill="none" stroke="${this.color}" stroke-width="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      `,
      ingresos: `
        <svg width="${this.size}" height="${this.size}" viewBox="0 0 24 24" fill="none" stroke="${this.color}" stroke-width="2">
          <line x1="12" y1="1" x2="12" y2="23"></line>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>
      `,
      partidos: `
        <svg width="${this.size}" height="${this.size}" viewBox="0 0 24 24" fill="none" stroke="${this.color}" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 6v6l4 2"></path>
        </svg>
      `,
      analytics: `
        <svg width="${this.size}" height="${this.size}" viewBox="0 0 24 24" fill="none" stroke="${this.color}" stroke-width="2">
          <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"></polyline>
        </svg>
      `,
      configuracion: `
        <svg width="${this.size}" height="${this.size}" viewBox="0 0 24 24" fill="none" stroke="${this.color}" stroke-width="2">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      `,
      rankings: `
        <svg width="${this.size}" height="${this.size}" viewBox="0 0 24 24" fill="none" stroke="${this.color}" stroke-width="2">
          <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"></polyline>
        </svg>
      `,
      actividad: `
        <svg width="${this.size}" height="${this.size}" viewBox="0 0 24 24" fill="none" stroke="${this.color}" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="16,12 12,8 8,12"></polyline>
          <line x1="12" y1="16" x2="12" y2="8"></line>
        </svg>
      `,
      suscripcion: `
        <svg width="${this.size}" height="${this.size}" viewBox="0 0 24 24" fill="none" stroke="${this.color}" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      `,
      suspension: `
        <svg width="${this.size}" height="${this.size}" viewBox="0 0 24 24" fill="none" stroke="${this.color}" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
        </svg>
      `
    };

    return iconMap[this.type] || iconMap.clubes;
  }
}
