import { JobApplication } from 'src/types/job-application';

type JobApplicationProps = {
  companyName: string;
  position: string;
  applicationDate: Date;
  status: string;
  notes: string;
};

export class JoBApplicationEntity {
  id: number;
  companyName: string;
  position: string;
  applicationDate: Date;
  status: string;
  notes: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(jobApplication: JobApplicationProps) {
    this.companyName = jobApplication.companyName;
    this.position = jobApplication.position;
    this.applicationDate = jobApplication.applicationDate;
    this.status = jobApplication.status;
    this.notes = jobApplication.notes;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
