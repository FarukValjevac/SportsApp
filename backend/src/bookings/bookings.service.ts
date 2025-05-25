import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './bookings.entity';
import { CreateBookingDto } from './bookings.interface';

/**
 * Service for managing booking operations.
 * Handles the creation, retrieval, and deletion of booking records in the database.
 */
@Injectable()
export class BookingsService {
  /**
   * Inject the Booking repository to interact with the booking data in the database.
   */
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
  ) {}

  /**
   * Creates a new booking in the database.
   * Checks for existing bookings for the same slot (sport, date, time) to prevent duplicates.
   * @param createBookingDto Data transfer object containing the details of the booking to be created.
   * @returns The newly created Booking object.
   * @throws HttpException with HttpStatus.CONFLICT (409) if a booking already exists for the given slot.
   */
  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    // Extract and normalize the booking date to compare only the year, month, and day.
    const bookingDate = new Date(createBookingDto.date);
    const year = bookingDate.getFullYear();
    const month = bookingDate.getMonth();
    const day = bookingDate.getDate();
    const dateOnly = new Date(year, month, day);

    // Check if a booking already exists for the same sport, date, and time.
    const existingBooking = await this.bookingRepository.findOne({
      where: {
        sport: createBookingDto.sport,
        date: dateOnly,
        time: createBookingDto.time,
      },
    });

    // If a booking already exists, throw a ConflictException.
    if (existingBooking) {
      throw new HttpException(
        'This slot is already booked.',
        HttpStatus.CONFLICT,
      );
    }

    // Create a new Booking entity with the provided data.
    const booking = this.bookingRepository.create({
      ...createBookingDto,
      date: dateOnly, // Store the normalized date.
    });
    // Save the new booking to the database and return the saved object.
    return this.bookingRepository.save(booking);
  }

  /**
   * Retrieves all booking records from the database.
   * @returns A promise that resolves to an array of all Booking objects.
   */
  async findAll(): Promise<Booking[]> {
    return this.bookingRepository.find();
  }

  /**
   * Removes a specific booking from the database based on its ID.
   * @param id The unique identifier of the booking to remove.
   * @returns A promise that resolves when the booking has been successfully deleted.
   */
  async remove(id: number): Promise<void> {
    await this.bookingRepository.delete(id);
  }
}
