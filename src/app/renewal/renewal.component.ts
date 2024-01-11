import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LicenseService } from '../license.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-renewal',
  templateUrl: './renewal.component.html',
  styleUrls: ['./renewal.component.css']
})
export class RenewalComponent implements OnInit{
  renewalForm:FormGroup;
  renewalButtonDisabled: boolean = false; // Flag to track button state

  constructor(private formBuilder: FormBuilder,private licenseservice:LicenseService) {
    this.renewalForm = this.formBuilder.group({
      id:new FormControl('',[Validators.required, Validators.min(1)]),
      username:new FormControl('',[Validators.required])
    });
  }

  ngOnInit(): void {
    
  }
  // renewal
  onSubmitRenewal() {
    if (this.renewalForm.valid && !this.renewalButtonDisabled) {
      this.renewalButtonDisabled = true; // Disable the Renewal button

      const id = this.renewalForm.get('id')?.value;
      const username = this.renewalForm.get('username')?.value;
  
      // Call the user service to handle the renewal
      this.licenseservice.renewUserLicense(id, username).subscribe(
        (response) => {
          // Display a success message using SweetAlert
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'License has been updated',
          });
  
          console.log('Renewal submitted with data:', response);
        },
        (error) => {
          // Display an error message using SweetAlert
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'You already requested the license',
          });
  
          console.error('Error:', error);
        }
      );
    }
  }
  // decline
onSubmitDecline() {
  if (this.renewalForm.valid && !this.renewalButtonDisabled) {
    this.renewalButtonDisabled = true; // Disable the Decline button

    const confirmDelete = confirm('Are you sure you want to delete this license?');

    if (confirmDelete) {
      const id = this.renewalForm.get('id')?.value;
      const username = this.renewalForm.get('username')?.value;

      this.licenseservice.declineLicense(id, username).subscribe((response) => {
        // Display a success SweetAlert
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'License has been declined',
        });
        console.log('Deleted successfully', response);
      },
      (error) => {
        // Display an error SweetAlert
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error deleting license',
        });
        console.error('Error deleting license:', error);
      });
    }
  }
}
}