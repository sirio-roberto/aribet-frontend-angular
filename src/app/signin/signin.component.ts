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
  selector: 'app-signin',
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
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  applyForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });

  constructor(
    private betService: BetService,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService
  ) {}

  signIn() {
    if (!this.applyForm.value.email || !this.applyForm.value.password) {
      this.showSnackBarError('Please fill in all required fields');
    } else {
      try {
        this.betService
          .signIn(
            this.applyForm.value.email ?? '',
            this.applyForm.value.password ?? ''
          )
          .subscribe({
            next: (data) => {
              this.authService.setToken(data.access_token);
              this.router.navigate(['/']);
            },
            error: (err) => {
              if (err.status >= 400 && err.status < 500) {
                this.showSnackBarError('Wrong email or password');
              } else {
                this.showSnackBarError('Unknown error');
              }
            },
          });
      } catch {}
    }
  }

  showSnackBarError(message: string) {
    this.snackBar.open(message, 'X', {
      panelClass: 'custom-snackbar',
      verticalPosition: 'top',
    });
  }
}
