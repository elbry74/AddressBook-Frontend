import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AddressBookEntryService } from 'src/app/services/address-book-entry.service';

@Component({
  selector: 'app-job-dialog',
  templateUrl: './job-dialog.component.html',
  styleUrls: ['./job-dialog.component.css']
})
export class JobDialogComponent implements OnInit {
  jobName!: string ;

  constructor(public dialogRef: MatDialogRef<JobDialogComponent> , private AddressBookEntryService : AddressBookEntryService) { }

  ngOnInit(): void {
  }

  onAddJob(): void {
    if (this.jobName) {
      const jobData = { title: this.jobName };
      console.log('Request Payload:', jobData);
  
      this.AddressBookEntryService.postJobs(jobData).subscribe(
        (response: any) => {
          console.log('Job added successfully', response);
          this.dialogRef.close();
        },
        (error: any) => {
          console.error('Error adding job', error);
        }
      );
    } else {
      console.error('Job name is empty. Please provide a job name.');
    }
  }
  

  onClose(): void {
    this.dialogRef.close();
  }

  
}
