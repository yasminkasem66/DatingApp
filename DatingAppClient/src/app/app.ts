import { Component, OnInit, signal } from '@angular/core';
import { Users } from './services/users';
import { Member } from './models/member';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
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
