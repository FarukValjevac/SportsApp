import { Injectable } from '@nestjs/common';
import { Event } from './event.interface';

@Injectable()
export class SportsService {
  getEvents(sport?: string): Event[] {
    const events = [
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

    if (sport) {
      return events.filter((event) =>
        event.sport.toLowerCase().includes(sport.toLowerCase()),
      );
    }

    return events;
  }
}
