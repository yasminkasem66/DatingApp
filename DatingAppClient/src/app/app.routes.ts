import { Routes } from '@angular/router';
// import { Login } from './feature/auth/login/login';
import { MainLayout } from './layout/main-layout/main-layout';
// import { AuthLayout } from './layout/auth-layout/auth-layout';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./feature/auth/components/login/login').then((m) => m.Login),
  },

  // 🔒 Protected app
  {
    path: '',
    component: MainLayout,
    // canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./feature/dashboard/members/members').then((m) => m.Members),
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./feature/dashboard/dashboard/dashboard').then((m) => m.Dashboard),
      },
    ],
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: '**', redirectTo: 'login' },
];

// 🔓 Public routes (NO layout)
//   {
//     path: 'login',
//     component: AuthLayout,
//     children: [
//       {
//         path: '',
//         loadComponent: () => import('./feature/auth/login/login').then((m) => m.Login),
//       },
//     ],
//   },
