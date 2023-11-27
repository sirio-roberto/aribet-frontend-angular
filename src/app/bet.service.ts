import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BetService {
  constructor(private http: HttpClient) {}

  private readonly backendUrl = 'http://localhost:3000';

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

  testingToken(): Observable<any> {
    const signUpUrl = `${this.backendUrl}/bets`;
    const body = {
      time: '2023-11-26T22:01:17.400Z',
      description: 'Test',
    };

    return this.http.post(signUpUrl, body);
  }
}
