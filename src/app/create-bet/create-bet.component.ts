import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { BetService } from '../bet.service';

@Component({
  selector: 'app-create-bet',
  standalone: true,
  imports: [
    [
      CommonModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatCardModule,
    ],
  ],
  templateUrl: './create-bet.component.html',
  styleUrls: ['./create-bet.component.css'],
})
export class CreateBetComponent {
  applyForm = new FormGroup({
    time: new FormControl(''),
    description: new FormControl(''),
  });

  constructor(
    private betService: BetService,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService
  ) {}

  create() {
    if (!this.applyForm.value.time) {
      this.showSnackBarError('Please fill in all required fields');
    } else {
      try {
        this.betService
          .createBet(
            this.applyForm.value.time ?? '',
            this.applyForm.value.description ?? ''
          )
          .subscribe({
            next: (data) => {
              console.log(data);
              this.router.navigate(['/']);
            },
            error: () => this.showSnackBarError('Unknown error'),
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
