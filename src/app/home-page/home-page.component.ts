import { Component, OnInit } from '@angular/core';
import { LicenseService } from '../license.service';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit
{
	details:any[]=[];
 
    piechartCategory:any
	chart: any;
	users:any;
	notactivated:any;
    softwareData: any;
	softwares:any;
	devices:any;

  constructor(private licenseservice: LicenseService){
	this.licenseservice.getactivatedUserCount().subscribe((response: any)=>
	this.users=response),
	this.licenseservice.getUnactivatedUserCount().subscribe((response:any)=>
	this.notactivated=response),
	this.licenseservice.getSoftwaresCount().subscribe((response:any)=>
	this.softwares=response),
	this.licenseservice.getDevicesCount().subscribe((response:any)=>
	this.devices=response)	
  }

  ngOnInit() {
	console.log("bf service")
    this.licenseservice.getSoftwareCount().subscribe((data: any) => {
      const labels = Object.keys(data);
      const values = Object.values(data);
	  console.log("data"+labels)

      this.softwareData = {
        labels: labels,
        datasets: [
          {
            label: 'Software Count',
            data: values,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }
        ]
      };

      this.createChart();
    });
	// Pie Chart
    this.licenseservice.getAllLicenses().subscribe((data) => {
		if (Array.isArray(data)) {
		  // If data is an array, it's in the expected format
		  const categories = data.map((license) => license.category);
		  const typeCounts = this.countTypes(categories);
		  this.createPieChart(
			'networkAssetsPieChart',
			'Network Assets by Type',
			Object.keys(typeCounts),
			Object.values(typeCounts)
		  );
		} else {
		  // Handle the case where data is not in the expected format
		  console.error('Data is not in the expected format:', data);
		}
	  });
	  

  }
// Line chart
  createChart() {
    this.chart = new Chart('line-chart', {
      type: 'line',
      data: this.softwareData,
      options: {
        responsive: true,
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Software'
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Count'
            }
          }
        }
      }
    });
	this.licenseservice.getactiavtedUser().subscribe(
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


  // Count the occurrences of each asset type
  countTypes(types: string[]) {
    const counts: { [key: string]: number } = {};
    for (const type of types) {
      counts[type] = counts[type] ? counts[type] + 1 : 1;
    }
    return counts;
  }
  createPieChart(chartId: string, title: string, labels: string[], data: number[]): void {
	this.piechartCategory = new Chart(chartId, {
	  type: 'pie',
	  data: {
		labels: labels,
		datasets: [
		  {
			data: data,
			backgroundColor: [
			  'rgba(255, 99, 132, 0.6)',
			  'rgba(54, 162, 235, 0.6)',
			  'rgba(255, 206, 86, 0.6)',
			  'rgba(75, 192, 192, 0.6)',
			  'rgba(153, 102, 255, 0.6)',
			  'rgba(255, 159, 64, 0.6)',
			],
		  },
		],
	  },
	//   options: {
	// 	title: {
	// 	  display: true,
	// 	  text: title,
	// 	},
	//   },
	});
  }
  

}

 

		

