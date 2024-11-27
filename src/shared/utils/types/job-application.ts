export type JobApplication = {
  id: string;
  companyName: string;
  position: string;
  applicationDate: Date;
  status: string;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Stats = {
  status: string;
  count: number;
}