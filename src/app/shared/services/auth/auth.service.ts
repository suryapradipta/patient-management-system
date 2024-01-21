import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth } from '../../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/v1/users';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<{ token: string }> {
    const authData = { username: username, password: password };
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, authData);
  }

  getCurrentUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/current-user`);
  }

  getCurrentUserJson(): Auth | null {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logOut(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }
}
