// license.component.ts

import { Component, OnInit } from '@angular/core';
import { LicenseService } from '../license.service';
import { License } from './license.model';

@Component({
  selector: 'app-license',
  templateUrl: './license.component.html',
  styleUrls: ['./license.component.css']
})
export class LicenseComponent implements OnInit {
  licenses: License[] = [];

  constructor(private licenseService: LicenseService) { }

  ngOnInit(): void {
    this.getLicenses();
  }

  getLicenses(): void {
    this.licenseService.getAllLicenses().subscribe(
      (licenses: License[]) => {
        this.licenses = licenses;
      },
      (error) => {
        console.error('Error fetching licenses:', error);
      }
    );
  }

  // Add logic for editing and deleting licenses here
}
