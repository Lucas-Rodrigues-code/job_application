import { BaseEntity } from 'src/shared/domain/entity/base.entity';

export class NetworkEntity extends BaseEntity {
  personName: string;
  company: string;
  contactDate: Date;
  notes: string;

  constructor(
    personName: string,
    company: string,
    contactDate: Date,
    notes: string,
  ) {
    super();
    this.personName = personName;
    this.company = company;
    this.contactDate = contactDate;
    this.notes = notes;
  }
}
