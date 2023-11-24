import { Injectable } from '@angular/core';
import { HousingLocation } from './housinglocation';

@Injectable({
  providedIn: 'root',
})
export class HousingService {
  private readonly baseUrl = 'https://angular.dev/assets/tutorials/common';

  url = 'http://localhost:3000/locations';

  async getAllHousingLocations() {
    const data = await fetch(this.url);
    const housingLocationList: HousingLocation[] = await data.json();
    return housingLocationList.map((hl) => this.fixPhotoLink(hl)) ?? [];
  }

  async getHousingLocationById(
    id: number
  ): Promise<HousingLocation | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    const housingLocation: HousingLocation = await data.json();
    this.fixPhotoLink(housingLocation);
    return housingLocation ?? {};
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
}
