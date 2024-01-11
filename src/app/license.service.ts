// license.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { License } from './license/license.model';
import { UserSoftware } from './UserSoftware';
import { Details } from './Details';

@Injectable({
  providedIn: 'root'
})
export class LicenseService {

  // GetLicenses
	private apiUrl = 'http://localhost:3434/api/licenses';

  constructor(private http: HttpClient) { }

  getAllLicenses(): Observable<License[]> {
    return this.http.get<License[]>(`${this.apiUrl}/getlicense`);
  }

  addLicense(newLicense: License): Observable<License> {
    return this.http.post<License>(`${this.apiUrl}/addlicense`, newLicense);
  }

  editLicense(updatedLicense: License): Observable<License> {
    return this.http.put<License>(`${this.apiUrl}/editlicense/${updatedLicense.id}`, updatedLicense);
  }

  updateLicense(license: License): Observable<License> {
    return this.http.put<License>(this.apiUrl+'/updatelicense', license);
  }
  deleteLicense(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deletelicense/${id}`);
  }

  getLicenseById(licenseId: number): Observable<License> {
    return this.http.get<License>(`${this.apiUrl}/getlicense/${licenseId}`);
  }
    // dashboard card
  getSoftwaresCount() {
    return this.http.get(this.apiUrl+'/getSoftwaresCount')
	   }
    //dashboard card 
     getDevicesCount() {
    return this.http.get(this.apiUrl+'/getDevicesCount')
  }

  

  



  //RequestLicense
  baseurl: string = 'http://localhost:3434/api/request';
  user:any;
  
  // Modify the function to accept licenses and username as parameters
  getPurchaseDetails(licenses: License, username: string): Observable<any> {
    console.log(licenses);
    this.user = new UserSoftware(licenses.id,licenses.name,licenses.description,licenses.vendorName,licenses.cost,licenses.validity,
      licenses.category,username);
    // const data = { licenses, username };
   // Send a POST request to your server with the data
  
    return this.http.post(this.baseurl+'/create', this.user);
  }
  
  //getalluserrequest
  getAllrequestSoftware(): Observable<any> {
    return this.http.get(this.baseurl+`/activateuser`,this.user);
  }
  //adminactivate user
  useractivation(details:Details):Observable<any>{
    return this.http.put(this.baseurl+'/updatedetails',details);
  }
  //activatedusers
  getactiavtedUser():Observable<any>{
    return this.http.get(this.baseurl+'/activateduser')
  }
  // renewalusers
  renewUserLicense(id:number,username:string):Observable<any>{
    const body={id,username}
    return this.http.put(this.baseurl+'/renewal',body);
  }
  //deleteusers
  declineLicense(id: number, username: string):Observable<any> {
    return this.http.delete(`${this.baseurl}/delete/${id}/${username}`);
  }
  // linechart
  getSoftwareCount() {
    console.log("chart works");
    return this.http.get(this.baseurl+'/getSoftwareCount');  }
  
  // generatelicensekey mail
  generateOtp(username:string){
    console.log("htttt from licensse service" + username);
    console.log(typeof(username));
    // const body={username}
    const body={
      "mail":username
    }
    return this.http.post('http://localhost:3434/api/request/sendEmail',body);
  }
  //activated usercount
  getactivatedUserCount () {
    return this.http.get(this.baseurl+'/getActivatedUserCount');
  }
  // unactivated user count
  getUnactivatedUserCount() {
	  return this.http.get(this.baseurl+'/getUnactivatedUserCount');
  }
  
  

}
