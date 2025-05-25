import { Test, TestingModule } from '@nestjs/testing';
import { SportsService } from './sports.service';
import { Event } from './event.interface';

/**
 * Test suite for the SportsService.
 */
describe('SportsService', () => {
  let service: SportsService;

  /**
   * Setup function that runs before each test.
   * Creates a testing module and obtains an instance of the SportsService.
   */
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SportsService],
    }).compile();

    service = module.get<SportsService>(SportsService);
  });

  /**
   * Test to ensure that the SportsService is successfully defined and injected.
   */
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  /**
   * Test suite for the getEvents method.
   */
  describe('getEvents', () => {
    /**
     * Test to ensure that getEvents returns an array.
     */
    it('should return an array of events', () => {
      const events = service.getEvents();
      expect(Array.isArray(events)).toBe(true);
      expect(events.length).toBeGreaterThan(0);
    });

    /**
     * Test to ensure that getEvents returns the expected list of event objects.
     */
    it('should return the expected list of events', () => {
      const expectedEvents: Event[] = [
        {
          sport: 'Boxing',
          date: new Date('2025-05-23T00:00:00.000Z'),
          time: '18:00',
        },
        {
          sport: 'Boxing',
          date: new Date('2025-05-25T00:00:00.000Z'),
          time: '19:30',
        },
        {
          sport: 'Tennis',
          date: new Date('2025-05-24T00:00:00.000Z'),
          time: '10:00',
        },
        {
          sport: 'Football',
          date: new Date('2025-05-26T00:00:00.000Z'),
          time: '20:00',
        },
        {
          sport: 'Swimming',
          date: new Date('2025-05-27T00:00:00.000Z'),
          time: '09:00',
        },
        {
          sport: 'Swimming',
          date: new Date('2025-05-29T00:00:00.000Z'),
          time: '17:00',
        },
        {
          sport: 'Boxing',
          date: new Date('2025-05-30T00:00:00.000Z'),
          time: '11:00',
        },
        {
          sport: 'Tennis',
          date: new Date('2025-05-31T00:00:00.000Z'),
          time: '14:00',
        },
        {
          sport: 'Football',
          date: new Date('2025-05-23T00:00:00.000Z'),
          time: '16:00',
        },
      ];
      const events = service.getEvents();
      expect(events).toEqual(expect.arrayContaining(expectedEvents));
      expect(events.length).toBe(expectedEvents.length);
    });
  });
});
