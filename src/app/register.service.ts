// register.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private baseUrl = 'http://localhost:3434/api/register'; // Replace with your Spring Boot backend URL

  constructor(private http: HttpClient) {}

  createRegister(registerData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, registerData);
  }
}
