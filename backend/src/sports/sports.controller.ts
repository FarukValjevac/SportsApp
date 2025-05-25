import { Controller, Get, Query } from '@nestjs/common';
import { SportsService } from './sports.service';
import { Event } from './event.interface';

/**
 * Controller for handling sports-related requests.
 * Defines API endpoints for retrieving sports events.
 */
@Controller('sports')
export class SportsController {
  /**
   * Inject the SportsService to handle sports data retrieval logic.
   */
  constructor(private readonly sportsService: SportsService) {}

  /**
   * Endpoint to retrieve available sports events, optionally filtered by sport.
   * @param sport Optional query parameter to filter events by sport name.
   * @returns A list of Event objects, potentially filtered by the provided sport.
   */
  @Get('events')
  getAvailableEvents(@Query('sport') sport?: string): Event[] {
    return this.sportsService.getEvents(sport);
  }
}
