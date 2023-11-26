import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string | null = null;

  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('access_token', token);
  }

  getToken(): string | null {
    return this.token || localStorage.getItem('access_token');
  }

  clearToken(): void {
    this.token = null;
    localStorage.removeItem('access_token');
  }
}
