import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Tab {
  id: 'stats' | 'history' | 'achievements' | 'settings';
  label: string;
  icon: string;
  visible: boolean;
}

@Component({
  selector: 'app-profile-tabs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="profile-tabs">
      <div class="tabs-container">
        <button 
          *ngFor="let tab of tabs"
          [class]="'tab-button ' + (activeTab === tab.id ? 'active' : '')"
          (click)="selectTab(tab.id)"
          [disabled]="!tab.visible"
          [title]="tab.label">
          <span class="tab-icon">{{ tab.icon }}</span>
          <span class="tab-label">{{ tab.label }}</span>
        </button>
      </div>
      
      <!-- Indicador de tab activa -->
      <div class="tab-indicator" [style.transform]="'translateX(' + getIndicatorPosition() + ')'"></div>
    </div>
  `,
  styleUrls: ['./profile-tabs.component.scss']
})
export class ProfileTabsComponent {
  @Input() activeTab: 'stats' | 'history' | 'achievements' | 'settings' = 'stats';
  @Input() isOwnProfile: boolean = false;
  
  @Output() onTabChange = new EventEmitter<'stats' | 'history' | 'achievements' | 'settings'>();

  tabs: Tab[] = [
    {
      id: 'stats',
      label: 'STATS',
      icon: '📊',
      visible: true
    },
    {
      id: 'history',
      label: 'HIST',
      icon: '📈',
      visible: true
    },
    {
      id: 'achievements',
      label: 'TROFEOS',
      icon: '🏆',
      visible: true
    },
    {
      id: 'settings',
      label: 'CONFIG',
      icon: '⚙️',
      visible: this.isOwnProfile
    }
  ];

  ngOnInit(): void {
    // Actualizar visibilidad de la pestaña de configuración
    this.tabs = this.tabs.map(tab => ({
      ...tab,
      visible: tab.id === 'settings' ? this.isOwnProfile : true
    }));
  }

  selectTab(tabId: 'stats' | 'history' | 'achievements' | 'settings'): void {
    const tab = this.tabs.find(t => t.id === tabId);
    if (tab && tab.visible) {
      this.onTabChange.emit(tabId);
    }
  }

  getIndicatorPosition(): string {
    const visibleTabs = this.tabs.filter(tab => tab.visible);
    const activeIndex = visibleTabs.findIndex(tab => tab.id === this.activeTab);
    const tabWidth = 100 / visibleTabs.length;
    return `${activeIndex * tabWidth}%`;
  }

  getTabWidth(): string {
    const visibleTabs = this.tabs.filter(tab => tab.visible);
    return `${100 / visibleTabs.length}%`;
  }
}
