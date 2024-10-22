import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class UpdateJobApplicationDto {
  @IsOptional()
  @IsNotEmpty()
  @MinLength(3)
  readonly companyName: string;

  @IsOptional()
  @IsNotEmpty()
  @MinLength(3)
  readonly position: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  readonly applicationDate: Date;

  @IsOptional()
  @IsNotEmpty()
  @MinLength(3)
  readonly status: string;

  @IsOptional()
  @IsNotEmpty()
  @MinLength(3)
  readonly notes: string;
}
