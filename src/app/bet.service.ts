import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BetService {
  constructor(private http: HttpClient) {}

  private readonly backendUrl = 'http://localhost:3000';

  signUp(
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ): Observable<any> {
    const url = `${this.backendUrl}/auth/signup`;
    const body = {
      name,
      email,
      password,
      confirmPassword,
    };

    return this.http.post(url, body);
  }

  signIn(email: string, password: string): Observable<any> {
    const url = `${this.backendUrl}/auth/signin`;
    const body = {
      email,
      password,
    };

    return this.http.post(url, body);
  }

  testingToken(): Observable<any> {
    const signUpUrl = `${this.backendUrl}/bets`;
    const body = {
      time: '2023-11-26T22:01:17.400Z',
      description: 'Test',
    };

    return this.http.post(signUpUrl, body);
  }

  createBet(time: string, description?: string): Observable<any> {
    const url = `${this.backendUrl}/bets`;
    const body = {
      time,
      description,
    };

    return this.http.post(url, body);
  }

  updateBet(
    betId: number,
    time: string,
    description?: string
  ): Observable<any> {
    const url = `${this.backendUrl}/bets/${betId}`;
    const body = {
      time,
      description,
    };

    return this.http.patch(url, body);
  }

  hasBetToday(): Observable<boolean> {
    const url = `${this.backendUrl}/bets/hasBetToday`;
    return this.http.get<boolean>(url);
  }

  getTodaysBet(): Observable<any> {
    const url = `${this.backendUrl}/bets/today`;
    return this.http.get(url);
  }
}
