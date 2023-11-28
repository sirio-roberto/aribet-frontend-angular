import { Component, OnInit } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';
import { BetService } from './bet.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HomeComponent,
    RouterModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  resultTime: string = '';

  constructor(
    protected authService: AuthService,
    private betService: BetService
  ) {
    this.getResult();
  }

  updateResult() {
    if (this.resultTime) {
      this.betService.updateResult(this.resultTime).subscribe({
        next: (data) => console.log(data),
        error: (err) => console.error(err),
      });
    }
  }

  getResult() {
    this.betService.getTodaysResult().subscribe({
      next: (data) => (this.resultTime = data[0]?.finalTime),
      error: (err) => console.error(err),
    });
  }
}
