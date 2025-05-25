import { Injectable } from '@nestjs/common';
import { Event } from './event.interface';

/**
 * Service for retrieving sports-related data.
 * Currently provides hardcoded event data, but is designed to be extended
 * to fetch data from a database or other data source.
 */
@Injectable()
export class SportsService {
  /**
   * Retrieves a list of sports events, optionally filtered by sport name.
   * @param sport Optional string to filter events by the name of the sport.
   * If provided, only events whose sport name (case-insensitive) includes the filter will be returned.
   * @returns An array of Event objects, potentially filtered by sport.
   */
  getEvents(sport?: string): Event[] {
    // Hardcoded array of sports events. In a real application, this data would
    // typically be fetched from a database.
    const events: Event[] = [
      { sport: 'Boxing', date: new Date('2025-05-23'), time: '18:00' },
      { sport: 'Boxing', date: new Date('2025-05-25'), time: '19:30' },
      { sport: 'Tennis', date: new Date('2025-05-24'), time: '10:00' },
      { sport: 'Football', date: new Date('2025-05-26'), time: '20:00' },
      { sport: 'Swimming', date: new Date('2025-05-27'), time: '09:00' },
      { sport: 'Swimming', date: new Date('2025-05-29'), time: '17:00' },
      { sport: 'Boxing', date: new Date('2025-05-30'), time: '11:00' },
      { sport: 'Tennis', date: new Date('2025-05-31'), time: '14:00' },
      { sport: 'Football', date: new Date('2025-05-23'), time: '16:00' },
    ];

    // Filter events by sport if a sport query parameter is provided.
    if (sport) {
      return events.filter((event) =>
        event.sport.toLowerCase().includes(sport.toLowerCase()),
      );
    }

    // Return all events if no sport filter is provided.
    return events;
  }
}
