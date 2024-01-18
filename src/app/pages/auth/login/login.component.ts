import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../shared/services";
import {NotificationService} from "../../../shared/services";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder,
              private alert: NotificationService,
              private router: Router,) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
      ],
      password: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(20)],
      ],
    });
  }


  onLogin(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe(
        (response: { token: string }) => {
          localStorage.setItem('token', response.token);
          this.getCurrentUser();
        },
        (error) => {
          console.error('Error during login', error);
          if (error.status === 401 || error.status === 400) {
            this.alert.showErrorMessage(
              error.error.message + '. Please try again.'
            );
          } else if (error.status === 500) {
            this.alert.showErrorMessage(
              'Server error. Please try again later.'
            );
          } else {
            this.alert.showErrorMessage(
              error.error?.message ||
              'An unexpected error occurred. Please try again.'
            );
          }
        }
      );
    }
  }

  private getCurrentUser(): void {
    this.authService.getCurrentUser().subscribe(
      (currentUser) => {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        switch (currentUser.role) {
          case 'administrator':
            this.router.navigate(['/administrator']);
            break;
          case 'patient':
            this.router.navigate(['/']);
            break;
        }
        this.alert.showSuccessMessage('Login successful!');
      },
      (error) => {
        console.error('Error fetching current user:', error);
        if (
          error.status === 401 &&
          error.error.message === 'Token has expired'
        ) {
          this.router.navigate(['/login']);
        }
        this.alert.showErrorMessage(
          error.error?.message ||
          'An unexpected error occurred. Please try again.'
        );
      }
    );
  }




}
