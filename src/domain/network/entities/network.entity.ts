export class NetworkEntity {
  id: number;
  personName: string;
  company: string;
  contactDate: Date;
  notes: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    personName: string,
    company: string,
    contactDate: Date,
    notes: string,
  ) {
    this.personName = personName;
    this.company = company;
    this.contactDate = contactDate;
    this.notes = notes;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
