import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { License } from './license/license.model';

@Injectable({
  providedIn: 'root'
})
export class ViewlicenseUserService {
  private apiUrl = 'http://localhost:3434/api/licenses';

  constructor(private http: HttpClient) { }

  getAllLicenses(): Observable<License[]> {
    return this.http.get<License[]>(`${this.apiUrl}/getlicense`);
  }

 }
