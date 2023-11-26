import { Injectable } from '@angular/core';
import { HousingLocation } from './housinglocation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HousingService {
  constructor(private http: HttpClient) {}

  private readonly backendUrl = 'http://localhost:3000';
  private readonly baseUrl = 'https://angular.dev/assets/tutorials/common';

  dbJsonUrl = 'http://localhost:3000/locations';

  async getAllHousingLocations() {
    const data = await fetch(this.dbJsonUrl);
    const housingLocationList: HousingLocation[] = await data.json();
    return housingLocationList.map((hl) => this.fixPhotoLink(hl)) ?? [];
  }

  async getHousingLocationById(
    id: number
  ): Promise<HousingLocation | undefined> {
    const data = await fetch(`${this.dbJsonUrl}/${id}`);
    const housingLocation: HousingLocation = await data.json();
    this.fixPhotoLink(housingLocation);
    return housingLocation ?? {};
  }

  async signUp(
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ) {
    const signUpUrl = `${this.backendUrl}/auth/signup`;
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        password,
        confirmPassword,
      }) as BodyInit,
    };
    const data = await fetch(signUpUrl, requestOptions);
    const access_token = await data.json();
    console.log(access_token);
    return access_token;
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(
      `Homes application received: ${JSON.stringify({
        firstName,
        lastName,
        email,
      })}`
    );
  }

  private fixPhotoLink(housingLocation: HousingLocation) {
    housingLocation.photo = housingLocation.photo.replace(
      '${this.baseUrl}',
      this.baseUrl
    );
    return housingLocation;
  }

  testingToken(): Observable<any> {
    const signUpUrl = `${this.backendUrl}/bets`;
    const body = {
      time: '2023-11-26T22:01:17.400Z',
      description: 'Test',
    };

    return this.http.post(signUpUrl, body);
  }
}
