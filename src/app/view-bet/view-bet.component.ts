import { Component, OnInit } from '@angular/core';
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
  selector: 'app-view-bet',
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
  templateUrl: './view-bet.component.html',
  styleUrls: ['./view-bet.component.css'],
})
export class ViewBetComponent implements OnInit {
  isDisabled: boolean = true;
  betId: number = 0;

  timeControl = new FormControl({ value: '', disabled: this.isDisabled });
  descControl = new FormControl({ value: '', disabled: this.isDisabled });

  applyForm = new FormGroup({
    time: this.timeControl,
    description: this.descControl,
  });

  constructor(
    private betService: BetService,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.betService.getTodaysBet().subscribe({
      next: (data) => {
        this.betId = data.id;
        if (data?.time) {
          const time = data.time.substring(
            data.time.indexOf('T') + 1,
            data.time.lastIndexOf(':')
          );

          this.timeControl.setValue(time);
        }
        if (data?.description) {
          this.descControl.setValue(data.description);
        }
      },
    });
  }

  edit() {
    if (this.isDisabled) {
      this.isDisabled = false;
      this.timeControl.enable();
      this.descControl.enable();
    } else {
      this.isDisabled = true;
      this.timeControl.disable();
      this.descControl.disable();

      if (!this.applyForm.value.time) {
        this.showSnackBarError('Please fill in all required fields');
      } else {
        try {
          this.betService
            .updateBet(
              this.betId,
              this.applyForm.value.time ?? '',
              this.applyForm.value.description ?? ''
            )
            .subscribe({
              error: () => this.showSnackBarError('Unknown error'),
            });
        } catch {}
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
