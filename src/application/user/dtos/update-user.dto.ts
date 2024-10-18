import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class UpdateUserDto {
  @MinLength(3)
  readonly name: string;

  @IsEmail()
  readonly email: string;
}
