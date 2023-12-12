import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AddressBookEntryService } from 'src/app/services/address-book-entry.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-department-dialog',
  templateUrl: './department-dialog.component.html',
  styleUrls: ['./department-dialog.component.css']
})
export class DepartmentDialogComponent implements OnInit {
  DepartmentName!: string;

  constructor(
    public dialogRef: MatDialogRef<DepartmentDialogComponent>,
    private addressBookEntryService: AddressBookEntryService
  ) { }

  ngOnInit(): void {}

  onAddDepartment(): void {
    if (this.DepartmentName) {
      const departmentData = { Name: this.DepartmentName }; 
      console.log('Request Payload:', departmentData);

      this.addressBookEntryService.postDepartment(departmentData).subscribe(
        (response: any) => {
          console.log('Department added successfully', response);
          this.dialogRef.close();
        },
        (error: any) => {
          console.error('Error adding Department', error);
        }
      );
    } else {
      console.error('Department name is empty. Please provide a department name.');
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}

