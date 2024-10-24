import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { JobApplicationService } from 'src/domain/job_application/services/job_application.service';
import { CreateJobApplicationDto } from '../dtos/create-job_application.dto';
import { UpdateJobApplicationDto } from '../dtos/update-job_application.dto';

@Controller('job-application')
export class JobApplicationController {
  constructor(private readonly jobApplicationService: JobApplicationService) {}

  @Get()
  async getAll() {
    return this.jobApplicationService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.jobApplicationService.getById(id);
  }

  @Get('count/by-month/:year')
  async getCount(@Param('year', ParseIntPipe) year: number) {
    return this.jobApplicationService.getCount(year);
  }

  @Post()
  async create(@Body() createJobApplicationDto: CreateJobApplicationDto) {
    return this.jobApplicationService.create(createJobApplicationDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body()
    updateJobApplicationDto: UpdateJobApplicationDto,
  ) {
    return this.jobApplicationService.update(id, updateJobApplicationDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.jobApplicationService.delete(id);
  }
}
