import { Routes } from '@angular/router';
import { GuardAutenticacion } from './guards/auth.guard';
import { GuardRol } from './guards/role.guard';

export const routes: Routes = [
  { 
    path: '', 
    redirectTo: '/iniciar-sesion', 
    pathMatch: 'full' 
  },
  {
    path: 'iniciar-sesion',
    loadComponent: () => import('./components/login/login.component').then(m => m.ComponenteLogin)
  },
  {
    path: 'registrarse',
    loadComponent: () => import('./components/register/register.component').then(m => m.ComponenteRegistro)
  },
  {
    path: 'debug',
    loadComponent: () => import('./components/debug/debug.component').then(m => m.DebugComponent)
  },
  {
    path: 'no-autorizado',
    loadComponent: () => import('./components/shared/unauthorized/unauthorized.component').then(m => m.UnauthorizedComponent)
  },
  
  // Rutas para jugadores con layout móvil
  {
    path: 'jugador',
    loadComponent: () => import('./layouts/mobile-layout/mobile-layout.component').then(m => m.MobileLayoutComponent),
    canActivate: [GuardAutenticacion, GuardRol],
    data: { roles: ['JUGADOR'] },
    children: [
      {
        path: '',
        redirectTo: 'tablero',
        pathMatch: 'full'
      },
      {
        path: 'tablero',
        loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'perfil',
        loadComponent: () => import('./components/profile/profile.component').then(m => m.ComponentePerfil)
      },
      {
        path: 'clubes',
        loadComponent: () => import('./components/clubs/clubs.component').then(m => m.ComponenteClubes)
      },
      {
        path: 'rankings',
        loadComponent: () => import('./components/rankings/rankings.component').then(m => m.ComponenteRankings)
      }
    ]
  },

  // Rutas para administradores con layout de escritorio y redirección automática
  {
    path: 'admin',
    loadComponent: () => import('./layouts/desktop-layout/desktop-layout.component').then(m => m.DesktopLayoutComponent),
    canActivate: [GuardAutenticacion, GuardRol],
    data: { roles: ['ADMIN_SISTEMA', 'ADMIN_CLUB'] },
    children: [
      {
        path: '',
        redirectTo: 'system/dashboard',
        pathMatch: 'full'
      },
      
      // Rutas para Administradores de Sistema
      {
        path: 'system',
        canActivate: [GuardRol],
        data: { roles: ['ADMIN_SISTEMA'] },
        children: [
          {
            path: '',
            redirectTo: 'dashboard',
            pathMatch: 'full'
          },
          {
            path: 'dashboard',
            loadComponent: () => import('./components/admin/system-admin/system-admin-dashboard/system-admin-dashboard.component').then(m => m.SystemAdminDashboardComponent)
          },
          {
            path: 'clubs',
            loadComponent: () => import('./components/admin/system-admin/system-admin-clubs/system-admin-clubs.component').then(m => m.SystemAdminClubsComponent)
          },
          {
            path: 'users',
            loadComponent: () => import('./components/admin/system-admin/system-admin-users/system-admin-users.component').then(m => m.SystemAdminUsersComponent)
          },
          {
            path: 'analytics',
            loadComponent: () => import('./components/admin/system-admin/system-admin-analytics/system-admin-analytics.component').then(m => m.SystemAdminAnalyticsComponent)
          },
          {
            path: 'settings',
            loadComponent: () => import('./components/admin/system-admin/system-admin-settings/system-admin-settings.component').then(m => m.SystemAdminSettingsComponent)
          }
        ]
      },
      
      // Rutas para Administradores de Club
      {
        path: 'club',
        canActivate: [GuardRol],
        data: { roles: ['ADMIN_CLUB'] },
        children: [
          {
            path: '',
            redirectTo: 'dashboard',
            pathMatch: 'full'
          },
          {
            path: 'dashboard',
            loadComponent: () => import('./components/admin/club-admin/club-admin-dashboard/club-admin-dashboard.component').then(m => m.ClubAdminDashboardComponent)
          },
          {
            path: 'members',
            loadComponent: () => import('./components/admin/club-admin/club-admin-members/club-admin-members.component').then(m => m.ClubAdminMembersComponent)
          },
          {
            path: 'tournaments',
            loadComponent: () => import('./components/admin/club-admin/club-admin-tournaments/club-admin-tournaments.component').then(m => m.ClubAdminTournamentsComponent)
          },
          {
            path: 'rankings',
            loadComponent: () => import('./components/admin/club-admin/club-admin-rankings/club-admin-rankings.component').then(m => m.ClubAdminRankingsComponent)
          }
        ]
      },

    ]
  },
  
  { 
    path: '**', 
    redirectTo: '/iniciar-sesion' 
  }
];
