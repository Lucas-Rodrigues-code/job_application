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
  UseGuards,
} from '@nestjs/common';
import { JobApplicationService } from 'src/job_application/job_application.service';
import { CreateJobApplicationDto } from './dtos/create-job_application.dto';
import { UpdateJobApplicationDto } from './dtos/update-job_application.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('job-application')
export class JobApplicationController {
  constructor(private readonly jobApplicationService: JobApplicationService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getAll(
    @Query('skip', ParseIntPipe) skip: number,
    @Query('take', ParseIntPipe) take: number,
    @Req() req: Request,
  ) {
    return this.jobApplicationService.getAll(
      skip,
      take,
      req.url,
      (req as any).sub.id,
    );
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getById(@Param('id') id: string, @Req() req: Request) {
    return this.jobApplicationService.getById(id, (req as any).sub.id);
  }

  @UseGuards(AuthGuard)
  @Get('count/by-month/:year')
  async getCount(
    @Param('year', ParseIntPipe) year: number,
    @Req() req: Request,
  ) {
    return this.jobApplicationService.getCount(year, (req as any).sub.id);
  }

  @UseGuards(AuthGuard)
  @Get('progress/:year')
  async getProgress(
    @Param('year', ParseIntPipe) year: number,
    @Req() req: Request,
  ) {
    return this.jobApplicationService.getProgress(year, (req as any).sub.id);
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() createJobApplicationDto: CreateJobApplicationDto,
    @Req() req: Request,
  ) {
    return this.jobApplicationService.create(
      createJobApplicationDto,
      (req as any).sub.id,
    );
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body()
    updateJobApplicationDto: UpdateJobApplicationDto,
    @Req() req: Request,
  ) {
    return this.jobApplicationService.update(
      id,
      updateJobApplicationDto,
      (req as any).sub.id,
    );
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: Request) {
    return this.jobApplicationService.delete(id, (req as any).sub.id);
  }
}
