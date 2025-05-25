import { Test, TestingModule } from '@nestjs/testing';
import { BookingsService } from './bookings.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Booking } from './bookings.entity';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';

// Define a more specific type for the mock repository
type MockRepository<T extends Record<string, any>> = Partial<
  Record<keyof Repository<T>, jest.Mock>
>;

const mockBookingRepository = (): MockRepository<Booking> => ({
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  delete: jest.fn(),
});

describe('BookingsService', () => {
  let service: BookingsService;
  let bookingRepository: MockRepository<Booking>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingsService,
        {
          provide: getRepositoryToken(Booking),
          useFactory: mockBookingRepository,
        },
      ],
    }).compile();

    service = module.get<BookingsService>(BookingsService);
    bookingRepository = module.get<MockRepository<Booking>>(
      getRepositoryToken(Booking),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of all bookings', async () => {
      const bookings = [
        {
          id: 1,
          sport: 'Tennis',
          date: new Date('2025-05-28T00:00:00.000Z'),
          time: '10:00',
        },
        {
          id: 2,
          sport: 'Boxing',
          date: new Date('2025-05-29T00:00:00.000Z'),
          time: '18:00',
        },
      ];
      bookingRepository.find!.mockResolvedValue(bookings);

      const result = await service.findAll();
      expect(result).toEqual(bookings);
      expect(bookingRepository.find).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should successfully create a booking', async () => {
      const createBookingDto = {
        sport: 'Tennis',
        date: new Date('2025-05-28T10:00:00.000Z'),
        time: '11:00',
      };
      const savedBooking = { id: 1, ...createBookingDto };

      bookingRepository.findOne!.mockResolvedValue(undefined);
      bookingRepository.create!.mockReturnValue(savedBooking);
      bookingRepository.save!.mockResolvedValue(savedBooking);

      const result = await service.create(createBookingDto);
      expect(result).toEqual(savedBooking);
    });
  });

  describe('check duplicate entrees', () => {
    it('should throw ConflictException if the slot is already booked', async () => {
      const createBookingDto = {
        sport: 'Tennis',
        date: new Date('2025-05-28T10:00:00.000Z'),
        time: '11:00',
      };
      const existingBooking = { id: 2, ...createBookingDto };

      bookingRepository.findOne!.mockResolvedValue(existingBooking); // Simulate an existing booking

      await expect(service.create(createBookingDto)).rejects.toThrowError(
        new HttpException('This slot is already booked.', HttpStatus.CONFLICT),
      );
    });
  });

  describe('remove', () => {
    it('should successfully remove a booking by id', async () => {
      const bookingId = 1;
      bookingRepository.delete!.mockResolvedValue({ affected: 1 });

      await service.remove(bookingId);
      expect(bookingRepository.delete).toHaveBeenCalledWith(bookingId);
    });
  });
});
