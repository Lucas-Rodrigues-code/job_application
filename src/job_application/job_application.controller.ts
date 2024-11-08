import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  Request,
} from '@nestjs/common';
import { JobApplicationService } from 'src/job_application/job_application.service';
import { CreateJobApplicationDto } from './dtos/create-job_application.dto';
import { UpdateJobApplicationDto } from './dtos/update-job_application.dto';

@Controller('job-application')
export class JobApplicationController {
  constructor(private readonly jobApplicationService: JobApplicationService) {}

  @Get()
  async getAll(
    @Query('skip', ParseIntPipe) skip: number,
    @Query('take', ParseIntPipe) take: number,
    @Req() req: Request,
  ) {
    return this.jobApplicationService.getAll(skip, take, req.url);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.jobApplicationService.getById(id);
  }

  @Get('count/by-month/:year')
  async getCount(@Param('year', ParseIntPipe) year: number) {
    return this.jobApplicationService.getCount(year);
  }

  @Get('progress/:year')
  async getProgress(@Param('year', ParseIntPipe) year: number) {
    return this.jobApplicationService.getProgress(year);
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
