import * as bcrypt from 'bcrypt';

export class User {
  id: number;
  name: string;
  email: string;
  password: string;

  constructor(name: string, email: string, password: string) {
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
