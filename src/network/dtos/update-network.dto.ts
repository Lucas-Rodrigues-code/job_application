import { IsNotEmpty, IsOptional, IsString, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateNetworkingDto {
  @IsNotEmpty()
  @IsString()
  readonly personName: string;

  @IsNotEmpty()
  @IsString()
  readonly company: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  readonly contactDate: Date;

  @IsOptional()
  @IsString()
  readonly notes?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  readonly createdAt?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  readonly updatedAt?: Date;
}
