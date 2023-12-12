export class AddressBookEntry {

    id: number;
    fullName: string;
    jobTitle: string;
    departmentName: string;
    mobileNumber: string;
    dateOfBirth: string;
    address: string;
    email: string;
    age: number;
    photo: string; 
  
    constructor(data: any) {
      this.id = data.id;
      this.fullName = data.fullName;
      this.jobTitle = data.jobTitle;
      this.departmentName = data.departmentName;
      this.mobileNumber = data.mobileNumber;
      this.dateOfBirth = data.dateOfBirth;
      this.address = data.address;
      this.email = data.email;
      this.age = data.age;
      this.photo = data.photo;
    }
  }
  
