import { Component } from '@angular/core';
import { LicenseService } from '../license.service';
import { Details } from '../Details';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-activateuser',
  templateUrl: './activateuser.component.html',
  styleUrls: ['./activateuser.component.css']
})
export class ActivateuserComponent {
  details: Details[] = [];
  showActivated: boolean = false; 
  constructor(private licenseService: LicenseService, private router: Router) {}

  ngOnInit(): void {
    this.licenseService.getAllrequestSoftware().subscribe(
      (data: Details[]) => {
        this.details = data;
        console.log(this.details);
      }
    );
    this.refreshData();
  }


  activateUser(detail: Details) {
    // Use SweetAlert to confirm user activation
    Swal.fire({
      title: 'Activate User',
      text: 'Are you sure you want to activate this user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, activate!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.licenseService.useractivation(detail).subscribe(
          (response) => {
            console.log('User activation', response);
  
            // Show success message with SweetAlert
            Swal.fire('Success', 'User activated successfully!', 'success');
  
            // Toggle the showActivated flag to reload the data
            this.showActivated = !this.showActivated;
            this.refreshData();
            this.router.navigate(['/activateduser']);
          },
          (error) => {
            // Show error message with SweetAlert
            Swal.fire('Error', 'Failed to activate user', 'error');
            console.error('Error user activation:', error);
          }
        );
        // Generate OTP
        this.licenseService.generateOtp(detail.username).subscribe();
      }
    });
  }
  

  refreshData() {
    this.licenseService.getAllrequestSoftware().subscribe((data: Details[]) => {
      this.details = this.showActivated ? data.filter(d => d.status) : data.filter(d => !d.status);
      console.log(this.details);
    });
  }
  
  toggleShowActivated() {
    this.showActivated = !this.showActivated;
    this.refreshData();
  }
}
