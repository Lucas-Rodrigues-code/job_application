import { Type } from 'class-transformer';
import {
  IsDate,
  IsIn,
  IsNotEmpty,
  IsOptional,
  MinLength,
} from 'class-validator';

export class CreateJobApplicationDto {
  @IsNotEmpty()
  @MinLength(3)
  readonly companyName: string;

  @IsNotEmpty()
  @MinLength(3)
  readonly position: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  readonly applicationDate: Date;

  @IsNotEmpty()
  @IsIn(['candidato', 'Entrevista Inicial', 'Em andamento', 'contratado','rejeitado'])
  readonly status: string;

  @IsOptional()
  readonly notes: string;
}
