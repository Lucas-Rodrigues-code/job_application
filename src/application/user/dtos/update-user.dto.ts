import { IsEmail, IsOptional, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @MinLength(3)
  readonly name: string;

  @IsOptional()
  @IsEmail()
  readonly email: string;
}
