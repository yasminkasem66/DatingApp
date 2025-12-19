import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Member } from '../../../models/member';
import { Users } from '../../../services/users';

@Component({
  selector: 'app-members',
  imports: [CommonModule],
  templateUrl: './members.html',
  styleUrl: './members.css',
})
export class Members {
  members = signal<Member[]>([]);
  loading = signal<boolean>(false);

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
      },
    });
  }
}
