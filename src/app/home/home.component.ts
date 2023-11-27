import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BetService } from '../bet.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
  ],
  providers: [BetService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  hasBetToday = false;

  constructor(
    private router: Router,
    protected authService: AuthService,
    protected betService: BetService
  ) {}

  ngOnInit(): void {
    this.checkBetStatus();
  }

  checkBetStatus() {
    this.betService
      .hasBetToday()
      .subscribe({ next: (data) => (this.hasBetToday = data) });
  }

  navigateToSignIn() {
    this.router.navigate(['/signin']);
  }
  navigateToSignUp() {
    this.router.navigate(['/signup']);
  }
  navigateToCreateBet() {
    this.router.navigate(['/bets/create']);
  }
  navigateToViewBet() {
    this.router.navigate(['/bets/view']);
  }
  logOut() {
    this.authService.clearToken();
  }
}
