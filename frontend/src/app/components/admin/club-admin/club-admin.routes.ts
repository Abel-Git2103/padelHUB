// Rutas específicas para Admin de Club
import { Routes } from '@angular/router';

export const clubAdminRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./club-admin-dashboard/club-admin-dashboard.component').then(m => m.ClubAdminDashboardComponent)
  },
  {
    path: 'members',
    loadComponent: () => import('./club-admin-members/club-admin-members.component').then(m => m.ClubAdminMembersComponent)
  },
  {
    path: 'tournaments',
    loadComponent: () => import('./club-admin-tournaments/club-admin-tournaments.component').then(m => m.ClubAdminTournamentsComponent)
  },
  {
    path: 'rankings',
    loadComponent: () => import('./club-admin-rankings/club-admin-rankings.component').then(m => m.ClubAdminRankingsComponent)
  }
];
