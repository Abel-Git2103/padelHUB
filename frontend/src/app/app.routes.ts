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
  
  // Rutas para jugadores con layout móvil
  {
    path: 'jugador',
    loadComponent: () => import('./layouts/mobile-layout/mobile-layout.component').then(m => m.MobileLayoutComponent),
    canActivate: [GuardAutenticacion, GuardRol],
    data: { roles: ['user', 'jugador'] },
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

  // Rutas para administradores con layout de escritorio
  {
    path: 'admin',
    loadComponent: () => import('./layouts/desktop-layout/desktop-layout.component').then(m => m.DesktopLayoutComponent),
    canActivate: [GuardAutenticacion, GuardRol],
    data: { roles: ['admin'] },
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./components/admin/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent)
      },
      {
        path: 'usuarios',
        loadComponent: () => import('./components/admin/admin-users/admin-users.component').then(m => m.AdminUsersComponent)
      },
      {
        path: 'clubes',
        loadComponent: () => import('./components/admin/admin-clubs/admin-clubs.component').then(m => m.AdminClubsComponent)
      },
      {
        path: 'rankings',
        loadComponent: () => import('./components/admin/admin-rankings/admin-rankings.component').then(m => m.AdminRankingsComponent)
      },
      {
        path: 'partidos',
        loadComponent: () => import('./components/admin/admin-matches/admin-matches.component').then(m => m.AdminMatchesComponent)
      },
      {
        path: 'configuracion',
        loadComponent: () => import('./components/admin/admin-settings/admin-settings.component').then(m => m.AdminSettingsComponent)
      }
    ]
  },

  // Rutas de compatibilidad (redirigir a jugador por defecto)
  {
    path: 'tablero',
    redirectTo: '/jugador/tablero',
    pathMatch: 'full'
  },
  {
    path: 'perfil',
    redirectTo: '/jugador/perfil',
    pathMatch: 'full'
  },
  {
    path: 'clubes',
    redirectTo: '/jugador/clubes',
    pathMatch: 'full'
  },
  {
    path: 'rankings',
    redirectTo: '/jugador/rankings',
    pathMatch: 'full'
  },
  
  { 
    path: '**', 
    redirectTo: '/iniciar-sesion' 
  }
];
