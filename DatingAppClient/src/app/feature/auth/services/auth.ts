import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginRequest } from '../models/login-request';
import { Router } from '@angular/router';
import { LoginResponse } from '../models/login-response';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private router = inject(Router);
  private http = inject(HttpClient);

  private readonly baseUrl = 'https://localhost:5001';
  loggedIn = signal(false);
  currentUser = signal<LoginResponse | null>(null);

  login(payload: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/api/account/login`, payload).pipe(
      tap((res: LoginResponse) => {
        if (res) {
          this.currentUser.set(res);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.loggedIn.set(false);
    this.currentUser.set(null);
    this.router.navigateByUrl('/login');
  }
}
