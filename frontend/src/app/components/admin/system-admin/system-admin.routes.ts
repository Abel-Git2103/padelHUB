// Rutas específicas para Admin de Sistema
import { Routes } from '@angular/router';

export const systemAdminRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./system-admin-dashboard/system-admin-dashboard.component').then(m => m.SystemAdminDashboardComponent)
  },
  {
    path: 'clubs',
    loadComponent: () => import('./system-admin-clubs/system-admin-clubs.component').then(m => m.SystemAdminClubsComponent)
  },
  {
    path: 'users',
    loadComponent: () => import('./system-admin-users/system-admin-users.component').then(m => m.SystemAdminUsersComponent)
  },
  {
    path: 'analytics',
    loadComponent: () => import('./system-admin-analytics/system-admin-analytics.component').then(m => m.SystemAdminAnalyticsComponent)
  },
  {
    path: 'settings',
    loadComponent: () => import('./system-admin-settings/system-admin-settings.component').then(m => m.SystemAdminSettingsComponent)
  },
  {
    path: 'rankings',
    loadComponent: () => import('./system-admin-rankings/system-admin-rankings.component').then(m => m.SystemAdminRankingsComponent)
  }
];
