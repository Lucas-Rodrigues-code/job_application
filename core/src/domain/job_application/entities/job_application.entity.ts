import { BaseEntity } from 'src/shared/domain/entity/base.entity';

type JobApplicationProps = {
  companyName: string;
  position: string;
  applicationDate: Date;
  status: string;
  notes: string;
};

export class JoBApplicationEntity extends BaseEntity {
  companyName: string;
  position: string;
  applicationDate: Date;
  status: string;
  notes: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(jobApplication: JobApplicationProps) {
    super();
    this.companyName = jobApplication.companyName;
    this.position = jobApplication.position;
    this.applicationDate = jobApplication.applicationDate;
    this.status = jobApplication.status;
    this.notes = jobApplication.notes;
  }
}
