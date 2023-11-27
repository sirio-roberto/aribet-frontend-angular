import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { BetService } from '../bet.service';
import { Bet } from '../interface/bet.interface';

@Component({
  selector: 'app-bet-list',
  standalone: true,
  imports: [
    [
      CommonModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatCardModule,
      MatTableModule,
    ],
  ],
  templateUrl: './bet-list.component.html',
  styleUrls: ['./bet-list.component.css'],
})
export class BetListComponent {
  displayedColumns: string[] = ['userId', 'time', 'description'];
  dataSource: Bet[] = [];

  constructor(
    private betService: BetService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getAllTodaysBets();
  }

  getAllTodaysBets() {
    this.betService.getAllTodaysBets().subscribe({
      next: (data: any[]) => {
        this.dataSource = data.map((bet) => ({
          id: bet.id,
          time: this.getFormattedTime(bet.time),
          description: bet.description,
          userId: bet.userId,
          resultId: bet.resultId,
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
