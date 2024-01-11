import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { License } from './license/license.model';
// import { UserSoftware } from './UserSoftware';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url:string = 'http://localhost:3434/api/login/authenticate';
  check(userName:string,password:string):Observable<Boolean>{
    const c = {userName,password};
    return this.http.post<Boolean>(this.url,c);
  }
  constructor(public http:HttpClient) { }
  
  
}
