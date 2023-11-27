import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BetService } from '../bet.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  providers: [BetService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private housingService: BetService) {}

  testingToken() {
    this.housingService
      .testingToken()
      .subscribe({ complete: console.log, error: console.error });
  }
}
