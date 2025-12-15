import { Routes } from '@angular/router';
// import { Login } from './feature/auth/login/login';
import { MainLayout } from './layout/main-layout/main-layout';
// import { AuthLayout } from './layout/auth-layout/auth-layout';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./feature/auth/login/login').then((m) => m.Login),
  },

  // 🔒 Protected app
  //   {
  //     path: '',
  //     component: MainLayout,
  //     canActivate: [authGuard],
  //     children: [
  //       {
  //         path: 'dashboard',
  //         loadComponent: () =>
  //           import('./feature/recruitment/dashboard/dashboard.component').then(
  //             (m) => m.DashboardComponent
  //           ),
  //       },
  //     ],
  //   },

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
