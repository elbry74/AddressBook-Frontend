import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddressBookEntry } from '../models/address-book-entry.model'; // Make sure to import your model
import { ListJobs } from '../models/list-jobs.model';
import { HttpHeaders } from '@angular/common/http';
import { ListDepartments } from '../models/list-departments.model';

@Injectable({
  providedIn: 'root'
})
export class AddressBookEntryService {
  private apiUrl = 'https://localhost:44328';

  constructor(private http: HttpClient) {}

  
  getAddressBookEntries(): Observable<AddressBookEntry[]> {
    return this.http.get<AddressBookEntry[]>(`${this.apiUrl}/api/address`);
  }

  getAddressBookEntry(id: number): Observable<AddressBookEntry> {
    return this.http.get<AddressBookEntry>(`${this.apiUrl}/api/address/{id}/${id}`);
  }
  

  getJobs(): Observable<ListJobs[]> {
    return this.http.get<ListJobs[]>(`${this.apiUrl}/api/Job`);
  }

  postJobs(model: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/api/Job`, model, { headers });
  }

  getDepartment(): Observable<ListDepartments[]> {
    return this.http.get<ListDepartments[]>(`${this.apiUrl}//api/Department`);
  }

  postDepartment(model: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/api/Department`, model, { headers });
  }

  postAddressBookEntry(model: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/address`, model);
  }
  
  updateAddressBookEntry(id: number, entry: AddressBookEntry): Observable<any> {
    const url = `${this.apiUrl}/api/address/${id}`;
    return this.http.put(url, entry);
  }

  deleteAddressBookEntry(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/address/${id}`);
  }

  exportToExcel(): Observable<any> {
    const url = `${this.apiUrl}/api/address/ExportToExcel`;
    return this.http.get(url, { responseType: 'blob' }); // Set responseType to 'blob'
  }

  searchEntries(searchTerm: string): Observable<AddressBookEntry[]> {
    const url = `${this.apiUrl}/api/address/search`;
    return this.http.get<AddressBookEntry[]>(url, { params: { searchTerm } });
  }

  getEntriesInDateRange(minDateOfBirth: Date, maxDateOfBirth: Date): Observable<AddressBookEntry[]> {
    const params = {
      minDateOfBirth: minDateOfBirth.toISOString(),
      maxDateOfBirth: maxDateOfBirth.toISOString()
    };

    return this.http.get<AddressBookEntry[]>(`${this.apiUrl}/api/address/rangeByDate`, { params: params });
  }
  
}
