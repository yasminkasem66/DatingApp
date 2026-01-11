import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  router = inject(Router);
  currentYear = new Date().getFullYear();

  // Wire these to your router or modals as needed
  onRegister(): void {
    this.router.navigate(['/register']);
    console.log('Register clicked');
  }

  onLearnMore(): void {
    // e.g., this.router.navigate(['/about']);
    console.log('Learn more clicked');
  }
}
