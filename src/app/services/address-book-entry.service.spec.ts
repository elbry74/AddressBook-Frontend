import { TestBed } from '@angular/core/testing';

import { AddressBookEntryService } from './address-book-entry.service';

describe('AddressBookEntryService', () => {
  let service: AddressBookEntryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddressBookEntryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
