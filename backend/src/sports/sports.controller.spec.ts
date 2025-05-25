import { Test, TestingModule } from '@nestjs/testing';
import { SportsController } from './sports.controller';
import { SportsService } from './sports.service';

/**
 * Factory function to create a mock SportsService.
 * Provides mocked implementations for the service methods used by the controller.
 */
const mockSportsService = () => ({
  getSports: jest.fn(),
  getEvents: jest.fn(),
});

/**
 * Test suite for the SportsController.
 */
describe('SportsController', () => {
  let controller: SportsController;
  let sportsService: ReturnType<typeof mockSportsService>;

  /**
   * Setup function that runs before each test.
   * Creates a testing module and obtains instances of the SportsController and the mocked SportsService.
   */
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SportsController],
      providers: [
        {
          provide: SportsService,
          useFactory: mockSportsService,
        },
      ],
    }).compile();

    controller = module.get<SportsController>(SportsController);
    sportsService =
      module.get<ReturnType<typeof mockSportsService>>(SportsService);
  });

  /**
   * Test to ensure that the SportsController is successfully defined and injected.
   */
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  /**
   * Test suite for the getAvailableSports endpoint.
   */
  describe('getAvailableSports', () => {
    /**
     * Test to ensure that the getAvailableSports endpoint calls sportsService.getEvents
     * and returns the result it receives.
     */
    it('should call sportsService.getEvents and return its result', () => {
      const mockEvents = [
        { sport: 'Football', date: new Date(), time: '10:00' },
        { sport: 'Boxing', date: new Date(), time: '18:00' },
      ];
      sportsService.getEvents.mockReturnValue(mockEvents);

      const result = controller.getAvailableEvents();
      expect(sportsService.getEvents).toHaveBeenCalled();
      expect(result).toEqual(mockEvents);
    });
  });
});
