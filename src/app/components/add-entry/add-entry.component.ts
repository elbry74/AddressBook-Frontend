import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JobDialogComponent } from '../job-dialog/job-dialog.component';
import { DepartmentDialogComponent } from '../department-dialog/department-dialog.component';
import { AddressBookEntryService } from 'src/app/services/address-book-entry.service';
import { Router } from '@angular/router';
import { ListJobs } from 'src/app/models/list-jobs.model';
import { ListDepartments } from 'src/app/models/list-departments.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-entry',
  templateUrl: './add-entry.component.html',
  styleUrls: ['./add-entry.component.css']
})
export class AddEntryComponent implements OnInit {
  jobs: ListJobs[] = [];
  departments: ListDepartments[] = [];
  entryForm: FormGroup;
  selectedFileName: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private addressBookEntryService: AddressBookEntryService
  ) {
    this.entryForm = this.fb.group({
      inputFullName4: [''],
      inputEmail4: [''],
      inputJob: [''],
      inputDepartment: [''],
      inputMobileNumber4: [''],
      inputage: [''],
      DateofBirth: [''],
      Address: [''],
      validatedCustomFile: ['']
    });
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

  onFileSelected(event: any): void {
    console.log('File input event:', event);
  
    const fileInput = event.target as HTMLInputElement;
    console.log('File input element:', fileInput);
  
    if (fileInput.files && fileInput.files.length) {
      console.log('Files:', fileInput.files);
  
      this.selectedFileName = fileInput.files[0].name;
    } else {
      this.selectedFileName = null;
      console.error('No file selected');
    }
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

  

  onSubmit(): void {
    const formData = new FormData();
    formData.append('FullName', this.entryForm.get('inputFullName4')!.value);
    formData.append('Email', this.entryForm.get('inputEmail4')!.value);
    formData.append('JobId', this.entryForm.get('inputJob')!.value);
    formData.append('DepartmentId', this.entryForm.get('inputDepartment')!.value);
    formData.append('MobileNumber', this.entryForm.get('inputMobileNumber4')!.value);
    formData.append('Age', this.entryForm.get('inputage')!.value);
    formData.append('DateOfBirth', this.entryForm.get('DateofBirth')!.value);
    formData.append('Address', this.entryForm.get('Address')!.value);
  const fileInput = this.entryForm.get('validatedCustomFile');

  if (fileInput && fileInput.value && fileInput.value.files && fileInput.value.files.length > 0) {
    const file = fileInput.value as any; 
    formData.append('Photo', file.files[0], file.files[0].name);
  } else {
    console.error('No file selected');
    return;
  }
    console.log(formData);

    this.addressBookEntryService.postAddressBookEntry(formData).subscribe(
      (response) => {
        console.log('Entry added successfully', response);
      },
      (error) => {
        console.error('Error adding entry', error);
      }
    );
  }
}