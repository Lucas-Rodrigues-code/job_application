import { Type } from 'class-transformer';
import { IsDate, IsIn, IsNotEmpty, MinLength } from 'class-validator';

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
  @IsIn(['Candidato', 'Entrevista Inicial', 'Em andamento', 'contratado'])
  readonly status: string;

  @IsNotEmpty()
  @MinLength(3)
  readonly notes: string;
}
