import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type SkeletonType = 'text' | 'card' | 'circle' | 'rectangle' | 'list' | 'profile';

@Component({
  selector: 'app-skeleton-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Text skeleton -->
    <div *ngIf="type === 'text'" class="skeleton skeleton-text" [style.width]="width" [style.height]="height"></div>
    
    <!-- Card skeleton -->
    <div *ngIf="type === 'card'" class="skeleton skeleton-card" [style.width]="width" [style.height]="height">
      <div class="skeleton-header"></div>
      <div class="skeleton-body">
        <div class="skeleton-line skeleton-line-75"></div>
        <div class="skeleton-line skeleton-line-50"></div>
        <div class="skeleton-line skeleton-line-90"></div>
      </div>
    </div>
    
    <!-- Circle skeleton -->
    <div *ngIf="type === 'circle'" class="skeleton skeleton-circle" [style.width]="width" [style.height]="height"></div>
    
    <!-- Rectangle skeleton -->
    <div *ngIf="type === 'rectangle'" class="skeleton skeleton-rectangle" [style.width]="width" [style.height]="height"></div>
    
    <!-- List skeleton -->
    <div *ngIf="type === 'list'" class="skeleton-list" [style.width]="width">
      <div *ngFor="let item of listItems" class="skeleton-list-item">
        <div class="skeleton skeleton-circle skeleton-avatar"></div>
        <div class="skeleton-content">
          <div class="skeleton skeleton-line skeleton-line-60"></div>
          <div class="skeleton skeleton-line skeleton-line-40"></div>
        </div>
      </div>
    </div>
    
    <!-- Profile skeleton -->
    <div *ngIf="type === 'profile'" class="skeleton-profile" [style.width]="width">
      <div class="skeleton-profile-header">
        <div class="skeleton skeleton-circle skeleton-profile-avatar"></div>
        <div class="skeleton-profile-info">
          <div class="skeleton skeleton-line skeleton-line-75"></div>
          <div class="skeleton skeleton-line skeleton-line-50"></div>
        </div>
      </div>
      <div class="skeleton-profile-stats">
        <div *ngFor="let stat of profileStats" class="skeleton-stat">
          <div class="skeleton skeleton-line skeleton-line-100"></div>
          <div class="skeleton skeleton-line skeleton-line-60"></div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./skeleton-loader.component.scss']
})
export class SkeletonLoaderComponent {
  @Input() type: SkeletonType = 'text';
  @Input() width: string = '100%';
  @Input() height: string = '1rem';
  @Input() count: number = 1;
  @Input() animated: boolean = true;

  get listItems() {
    return Array(this.count || 3).fill(0);
  }

  get profileStats() {
    return Array(4).fill(0);
  }
}
