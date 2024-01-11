import { Component,OnInit } from '@angular/core';
import { LicenseService } from 'src/app/license.service';
import { License } from '../license/license.model';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-viewlicense-user',
  templateUrl: './viewlicense-user.component.html',
  styleUrls: ['./viewlicense-user.component.css']
})
export class ViewlicenseUserComponent implements OnInit{
  
  licenses: License[] = []; // Array to store all licenses
  username :string='';
  filterCategory: string = 'All'; // Default filter
  constructor(private licenseService: LicenseService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    // Fetch all licenses from the database
    this.licenseService.getAllLicenses().subscribe(
      (licenses: License[]) => {
        this.licenses = licenses;
      },
      (error: any) => {
        console.error('Error fetching license details:', error);
      }
    );
    
  }
  clickedLicenses: { [licenseId: number]: boolean } = {};
  // Function to handle purchasing software

purchaseSoftware(licenses: License, username: any): void {
  this.route.paramMap.subscribe(params => {
    username = params.get('uname');
    this.clickedLicenses[licenses.id] = true;

    Swal.fire({
      title: 'Confirm Request',
      text: `Request ${licenses.id} for ${username}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        // User clicked 'Yes,' proceed with the purchase logic
        this.licenseService.getPurchaseDetails(licenses, username).subscribe(
          (response) => {
            console.log('Request response:', response);
            // Handle success response
          },
          (error) => {
            if (error.status === 409) {
              // License already requested
              Swal.fire('License Requested', 'You have already requested this license', 'info');
            } else {
              // Handle other errors
              Swal.fire('Error', 'An error occurred while purchasing software', 'error');
            }
          }
        );
      }
    });
  });
}
filterLicensesByCategory(): License[] {
  if (this.filterCategory === 'All') {
    return this.licenses;
  } else {
    return this.licenses.filter((license) => license.category === this.filterCategory);
  }
}

}
