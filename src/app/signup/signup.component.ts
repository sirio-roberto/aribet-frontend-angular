import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BetService } from '../bet.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  hidePass = true;

  applyForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });

  constructor(
    private housingService: BetService,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService
  ) {}

  async signUp() {
    if (
      !this.applyForm.value.name ||
      !this.applyForm.value.email ||
      !this.applyForm.value.password ||
      !this.applyForm.value.confirmPassword
    ) {
      this.showSnackBarError('Please fill in all required fields');
    } else if (
      this.applyForm.value.password.length < 6 ||
      this.applyForm.value.confirmPassword.length < 6
    ) {
      this.showSnackBarError('Passwords should have at least 6 characters');
    } else if (
      this.applyForm.value.password !== this.applyForm.value.confirmPassword
    ) {
      this.showSnackBarError('Passwords do not match');
    } else {
      const backendResponse: any = await this.housingService.signUp(
        this.applyForm.value.name ?? '',
        this.applyForm.value.email ?? '',
        this.applyForm.value.password ?? '',
        this.applyForm.value.confirmPassword ?? ''
      );

      if (backendResponse.access_token) {
        this.authService.setToken(backendResponse.access_token);
        this.router.navigate(['/']);
      } else if (JSON.stringify(backendResponse).includes('email')) {
        this.showSnackBarError(
          'This email was already taken. Please use a different email'
        );
      } else {
        this.showSnackBarError('Unknown error');
      }
    }
  }

  showSnackBarError(message: string) {
    this.snackBar.open(message, 'X', {
      panelClass: 'custom-snackbar',
      verticalPosition: 'top',
    });
  }
}
