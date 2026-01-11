import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../../feature/auth/services/auth';

@Component({
  selector: 'app-navbar',
  imports: [],
  standalone:true,
  templateUrl: './navbar.html',
    styleUrl: './navbar.css',
  })
export class Navbar {
  router= inject(Router);
  authService = inject(Auth);

  logout() {
     this.authService.logout();
  }
  
  logIn() {
    this.router.navigateByUrl('/login');
  }
}
