import { Test, TestingModule } from '@nestjs/testing';
import { SportsController } from './sports.controller';
import { SportsService } from './sports.service';

const mockSportsService = () => ({
  getSports: jest.fn(),
  getEvents: jest.fn(),
});

describe('SportsController', () => {
  let controller: SportsController;
  let sportsService: ReturnType<typeof mockSportsService>;

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

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAvailableSports', () => {
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
