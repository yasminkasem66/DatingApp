import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from '../../models/login-request';
import { Auth } from '../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private authService = inject(Auth);

  loginForm!: FormGroup;
  showPassword = false;
  isSubmitting = false;

  ngOnInit(): void {
    console.log('initialize login component');
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false],
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  login(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const payload: LoginRequest = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.isSubmitting = true;

    this.authService.login(payload).subscribe({
      next: (res) => {
        console.log('Login success', res);

        if (this.loginForm.value.rememberMe) {
          localStorage.setItem('token', res.token);
        } else {
          sessionStorage.setItem('token', res.token);
        }
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        console.error('Login failed', err);
      },
      complete: () => {
        this.isSubmitting = false;
      },
    });
  }

  // routeToLogin() {
  //   this.router.navigateByUrl('/');
  //   console.log('login');
  // }
}
