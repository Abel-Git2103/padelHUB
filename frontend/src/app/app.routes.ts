import { Routes } from '@angular/router';
import { GuardAutenticacion } from './guards/auth.guard';

export const routes: Routes = [
  { 
    path: '', 
    redirectTo: '/tablero', 
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
    path: 'tablero',
    loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [GuardAutenticacion]
  },
  {
    path: 'perfil',
    loadComponent: () => import('./components/profile/profile.component').then(m => m.ComponentePerfil),
    canActivate: [GuardAutenticacion]
  },
  {
    path: 'clubes',
    loadComponent: () => import('./components/clubs/clubs.component').then(m => m.ComponenteClubes),
    canActivate: [GuardAutenticacion]
  },
  {
    path: 'rankings',
    loadComponent: () => import('./components/rankings/rankings.component').then(m => m.ComponenteRankings),
    canActivate: [GuardAutenticacion]
  },
  { 
    path: '**', 
    redirectTo: '/tablero' 
  }
];
