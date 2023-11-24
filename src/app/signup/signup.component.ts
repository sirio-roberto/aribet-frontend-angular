import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housinglocation';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  housingLocation: HousingLocation | undefined;
  applyForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });

  constructor(
    private route: ActivatedRoute,
    private housingService: HousingService
  ) {
    // const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
    const housingLocationId = 1;
    this.housingService
      .getHousingLocationById(housingLocationId)
      .then((hl) => (this.housingLocation = hl));
  }

  signUp() {
    this.housingService.signUp(
      this.applyForm.value.name ?? '',
      this.applyForm.value.email ?? '',
      this.applyForm.value.password ?? '',
      this.applyForm.value.confirmPassword ?? ''
    );
  }
}
