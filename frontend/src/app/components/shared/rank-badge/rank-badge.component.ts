import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rank-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="rank-badge-simple" [ngClass]="'size-' + size">
      <span class="emoji-icon">{{ getRankEmoji() }}</span>
    </div>
  `,
  styles: [`
    .rank-badge-simple {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .emoji-icon {
      font-size: 3rem;
      line-height: 1;
      transition: transform 0.2s ease;
    }

    .rank-badge-simple:hover .emoji-icon {
      transform: scale(1.1);
    }

    /* Tamaños */
    .rank-badge-simple.size-small .emoji-icon {
      font-size: 2.5rem;
    }

    .rank-badge-simple.size-large .emoji-icon {
      font-size: 3.5rem;
    }
  `]
})
export class RankBadgeComponent {
  @Input() rank: string = 'BRONCE';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';

  getRankEmoji(): string {
    const emojis = {
      'PLATINO': '💎',
      'ORO': '🥇',
      'PLATA': '🥈',
      'BRONCE': '🥉',
      'COBRE': '🟫'
    };
    return emojis[this.rank as keyof typeof emojis] || '🥉';
  }
}
