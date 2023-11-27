import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { BetService } from '../bet.service';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
  ],
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})
export class ResultComponent {
  displayedColumns: string[] = ['name', 'description', 'time', 'resultTime'];
  dataSource: any[] = [];

  constructor(
    private betService: BetService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getAllTodaysBets();
  }

  getAllTodaysBets() {
    this.betService.getTodaysResult().subscribe({
      next: (data: any[]) => {
        this.dataSource = data.map((winner) => ({
          name: winner.name,
          description: winner.description,
          time: winner.guessedTime,
          resultTime: winner.finalTime,
        }));
      },
      error: (error) => {
        console.error('Error fetching bets', error);
      },
    });
  }

  private getFormattedTime(date: string) {
    return date.substring(date.indexOf('T') + 1, date.lastIndexOf(':'));
  }
}
