import * as bcrypt from 'bcrypt';
import { BaseEntity } from 'src/shared/domain/entity/base.entity';

export class User extends BaseEntity {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(name: string, email: string, password: string) {
    super();
    this.name = name;
    this.email = email;
    this.password = this.hashPassword(password);

    if (!this.isValidEmail()) {
      throw new Error('Invalid email address');
    }
  }

  private hashPassword(password: string): string {
    return bcrypt.hashSync(password, 10);
  }

  private isValidEmail(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.email);
  }
}
