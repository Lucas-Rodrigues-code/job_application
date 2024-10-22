export type UserUpdateInput = {
  name?: string;
  email?: string;
};

export type UserType = {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};