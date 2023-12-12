export class ListDepartments {

    departmentId: number;
    name: string;
  
    constructor(data: any) {
     
      this.departmentId = data.departmentId;
      this.name = data.name;
     
    }
}
