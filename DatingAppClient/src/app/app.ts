import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Users } from './services/users';
import { Member } from './models/member';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  members=signal<Member[]>([]);
  loading =signal<boolean>(false);

  constructor(private membersService: Users) {}

  ngOnInit(): void {
    this.loadMembers();
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
