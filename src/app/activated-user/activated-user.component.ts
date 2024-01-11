import { Component } from '@angular/core';
import { LicenseService } from '../license.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activated-user',
  templateUrl: './activated-user.component.html',
  styleUrls: ['./activated-user.component.css']
})
export class ActivatedUserComponent {
  details: any[] = [];

  constructor(private licenseService: LicenseService, private router: Router) {}

  ngOnInit(): void {
    this.licenseService.getactiavtedUser().subscribe(
      (data: any[]) => {
        console.log("Hi activated user", data);
        this.details = data.sort((a, b) => {
          // Assuming date format is MM/DD/YYYY
          const dateA = new Date(a.expiryDate).getTime();
          const dateB = new Date(b.expiryDate).getTime();
          return dateA - dateB; // Sort in ascending order of expiration date
        });
        console.log(this.details + "activated user")
      });
  }
}
