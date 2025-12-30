import { Component, inject, OnInit, signal } from '@angular/core';
import { Users } from './services/users';
import { Member } from './models/member';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from "@angular/router";
import { Auth } from './feature/auth/services/auth';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  membersService = inject(Users);
  authService = inject(Auth);
  members=signal<Member[]>([]);
  loading =signal<boolean>(false);


  ngOnInit(): void {
    this.loadMembers();
    this.setCurrentUser();
  }

  setCurrentUser(){
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (!currentUser) return;
    this.authService.currentUser.set(currentUser);
  }

  loadMembers() {
    this.loading.set(true);
    this.membersService.getMembers().subscribe({
      next: (res) => {
        this.loading.set(false);
        this.members.set(res);
      },
      error: () => {
       this.loading.set(false);
      }
    });
  }

}
