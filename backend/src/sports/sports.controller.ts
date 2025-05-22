import { Controller, Get, Query } from '@nestjs/common';
import { SportsService } from './sports.service';
import { Event } from './event.interface';

@Controller('sports')
export class SportsController {
  constructor(private readonly sportsService: SportsService) {}

  @Get('events')
  getAvailableEvents(@Query('sport') sport?: string): Event[] {
    return this.sportsService.getEvents(sport);
  }
}
