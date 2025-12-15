import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [],
  standalone:true,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  router= inject(Router);

  logout() {
     this.router.navigateByUrl('/login');
  }
}
