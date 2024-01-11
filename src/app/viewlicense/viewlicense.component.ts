import { Component, OnInit } from '@angular/core';
import { LicenseService } from 'src/app/license.service';
import { License } from '../license/license.model';
import { faEdit, faSave, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons'; // Import Font Awesome icons
import Swal from 'sweetalert2'; // Import SweetAlert
@Component({
  selector: 'app-view-license',
  templateUrl: './viewlicense.component.html',
  styleUrls: ['./viewlicense.component.css']
})
export class ViewlicenseComponent implements OnInit {
  faEdit = faEdit;
  faSave = faSave;
  faTimes = faTimes;
  faTrash = faTrash;
  licenses: License[] = [];
  filterCategory: string = 'All'; // Default filter
  searchQuery:string='';
  searchlist:License[]=[]
  
  constructor(private licenseService: LicenseService) {}

  ngOnInit(): void {
    this.retrieveLicenses();
  }

  retrieveLicenses(): void {
    this.licenseService.getAllLicenses().subscribe(
      (data) => {
      this.searchlist = data
      this.licenses = data.map((license: License) => ({
        ...license,
        editing: false
      }));
      this.licenses.forEach((license) => {
        license.editedCost = license.cost;
        license.editedDescription = license.description;
        license.editedValidity = license.validity;
        license.editedVendorName = license.vendorName;
      });
      this.filterLicenses();
    });
  }

    
  filterLicensesByCategory(): License[] {
    if (this.filterCategory === 'All') {
      return this.licenses;
    } else {
      return this.licenses.filter((license) => license.category === this.filterCategory);
    }
  }

  filterLicenses(): void {
    this.licenses = this.searchlist.filter(
      (license) => {
      const categoryMatches = this.filterCategory === 'All' || license.category === this.filterCategory;
      const searchTermMatches = license.name.toLowerCase().startsWith(this.searchQuery.toLowerCase());
      console.log(searchTermMatches);
      return categoryMatches && searchTermMatches;
      
    });
  }

  onSearch(): void {
    this.filterLicenses();
  }


  editLicense(license: License): void {
    license.editing = true;
    license.editedDescription = license.description;
    license.editedVendorName = license.vendorName;
    license.editedCost = license.cost;
    license.editedValidity = license.validity;
  }
  

  
  saveLicense(license: License): void {
    // Check if the edited values are valid
    if (license.editedCost <= 0 || license.editedValidity <= 0) {
      alert('License Cost and License Validity should be greater than or equal to 0');
      return;
    }

    // Update the fields of the license
    license.description = license.editedDescription;
    license.vendorName = license.editedVendorName;
    license.cost = license.editedCost;
    license.validity = license.editedValidity;
    license.editing = false;

    // Send an API request to update the license

    this.licenseService.updateLicense(license).subscribe(
      (response) => {
        Swal.fire('Success', 'License updated successfully', 'success');
        console.log('License updated successfully', response);
      },
      (error: any) => {
        Swal.fire('Error', 'Error updating license', 'error');
        console.error('Error updating license:', error);
      }
    );
  }


  cancelEdit(license: License): void {
    license.editing = false;
  }


  deleteLicense(id: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this license?');

    if (confirmDelete) {
      this.licenseService.deleteLicense(id).subscribe(
        response => {
          console.log('License deleted successfully:', response);
          const index = this.licenses.findIndex(license => 
            license.id === id
            );
          if (index !== -1) {
            this.licenses.splice(index, 1);
          }
        },
        error => {
          console.error('Error deleting license:', error);
        }
      );
    }
  }
}
