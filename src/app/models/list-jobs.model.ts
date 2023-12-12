export class ListJobs {
  jobId: number;
    title: string;
  
    constructor(data: any) {
     
      this.jobId = data.jobId;
      this.title = data.title;
     
    }
}
