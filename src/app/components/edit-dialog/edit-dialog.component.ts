import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AddressBookEntry } from '../../models/address-book-entry.model';
import { ListJobs } from 'src/app/models/list-jobs.model';
import { ListDepartments } from 'src/app/models/list-departments.model';
import { AddressBookEntryService } from 'src/app/services/address-book-entry.service';
import { JobDialogComponent } from '../job-dialog/job-dialog.component';
import { DepartmentDialogComponent } from '../department-dialog/department-dialog.component';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {
  selectedEntry: AddressBookEntry;
  jobs: ListJobs[] = [];
  departments: ListDepartments[] = [];

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { entry: AddressBookEntry },
    private addressBookEntryService: AddressBookEntryService,
    public dialog: MatDialog
  ) {
    this.selectedEntry = { ...data.entry };
  }

  ngOnInit(): void {
    this.loadJobs();
    this.loadDepartments();
  }

  loadJobs(): void {
    this.addressBookEntryService.getJobs().subscribe(
      (data: ListJobs[]) => {
        this.jobs = data;
        console.log(this.jobs);
      },
      (error) => {
        console.error('Error fetching jobs', error);
      }
    );
  }

  loadDepartments(): void {
    this.addressBookEntryService.getDepartment().subscribe(
      (data: ListDepartments[]) => {
        this.departments = data;
        console.log(this.departments);
      },
      (error) => {
        console.error('Error fetching Departments', error);
      }
    );
  }

  openJobDialog(): void {
    this.dialog.open(JobDialogComponent, {
      width: '300px'
    });
  }

  openDepartmentDialog(): void {
    this.dialog.open(DepartmentDialogComponent, {
      width: '300px'
    });
  }

  selectedFileName: string | null = null;

  onFileSelected(event: any): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFileName = fileInput.files[0].name;
    } else {
      this.selectedFileName = null;
    }
  }


onAddJob(): void {
  this.addressBookEntryService
    .updateAddressBookEntry(this.selectedEntry.id, this.selectedEntry)
    .subscribe(
      () => {
        this.dialogRef.close();
      },
      (error) => {
        console.error('Error updating entry', error);
      }
    );
}

  onClose(): void {
    this.dialogRef.close();
  }
}
