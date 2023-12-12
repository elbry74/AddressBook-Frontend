import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AddressBookEntryService } from 'src/app/services/address-book-entry.service';
import { AddressBookEntry } from '../../models/address-book-entry.model'; // Make sure to import your model

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  entries: AddressBookEntry[] = [];
  selectedEntry: AddressBookEntry | null = null;
  searchTerm: string = '';
  dateRange: { minDateOfBirth?: Date, maxDateOfBirth?: Date } = {};

  constructor(private router: Router , public dialog: MatDialog, private AddressBookEntryService : AddressBookEntryService ) { }

  ngOnInit(): void {
    this.loadAddressBookEntries();
  }

  loadAddressBookEntries() {
    this.AddressBookEntryService.getAddressBookEntries().subscribe(
      (data) => {
        this.entries = data;
        console.log(this.entries);
      },
      (error) => {
        console.error('Error fetching address book entries', error);
      }
    );
  }
  GoToAddEntryPage(){
    this.router.navigate(['/AddEntry'])
  }

  openEditDialog(entryId: number): void {
    this.AddressBookEntryService.getAddressBookEntry(entryId).subscribe(
      (data) => {
        this.selectedEntry = data;
        const dialogRef = this.dialog.open(EditDialogComponent, {
          width: '800px',
          data: { entry: this.selectedEntry },
        
        });
  console.log(this.selectedEntry);
        dialogRef.afterClosed().subscribe(() => {
          this.selectedEntry = null;
        });
      },
      (error) => {
        console.error('Error fetching address book entry', error);
      }
    );
  }
  
  deleteEntry(entryId: number): void {
    if (confirm('Are you sure you want to delete this entry?')) {
      this.AddressBookEntryService.deleteAddressBookEntry(entryId).subscribe(
        () => {
          console.log('Entry deleted successfully');
          this.loadAddressBookEntries();
        },
        (error) => {
          console.error('Error deleting entry', error);
        }
      );
    }
  }

  exportToExcel(): void {
    this.AddressBookEntryService.exportToExcel().subscribe(
      (data) => {
        const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `AddressBookEntries_${new Date().toISOString()}.xlsx`;
        link.click();

        window.URL.revokeObjectURL(link.href);
      },
      (error) => {
        console.error('Error exporting to Excel', error);
      }
    );
  }

  search(): void {
    this.AddressBookEntryService.searchEntries(this.searchTerm).subscribe(
      (data) => {
        this.entries = data;
      },
      (error) => {
        console.error('Error searching entries', error);
      }
    );
  }
 filterByDateRange(): void {
    const { minDateOfBirth, maxDateOfBirth } = this.dateRange;

    if (minDateOfBirth && maxDateOfBirth) {
      const minDate = new Date(minDateOfBirth);
      const maxDate = new Date(maxDateOfBirth);

      this.AddressBookEntryService.getEntriesInDateRange(minDate, maxDate).subscribe(
        (data) => {
          this.entries = data;
        },
        (error) => {
          console.error('Error filtering entries by date range', error);
        }
      );
    }
  }
  
}
  


