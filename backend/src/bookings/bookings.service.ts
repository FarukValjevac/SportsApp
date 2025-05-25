import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './bookings.entity';
import { CreateBookingDto } from './bookings.interface';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
  ) {}

  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    const bookingDate = new Date(createBookingDto.date);
    const year = bookingDate.getFullYear();
    const month = bookingDate.getMonth();
    const day = bookingDate.getDate();
    const dateOnly = new Date(year, month, day);

    const existingBooking = await this.bookingRepository.findOne({
      where: {
        sport: createBookingDto.sport,
        date: dateOnly,
        time: createBookingDto.time,
      },
    });

    if (existingBooking) {
      throw new HttpException(
        'This slot is already booked.',
        HttpStatus.CONFLICT,
      );
    }

    const booking = this.bookingRepository.create({
      ...createBookingDto,
      date: dateOnly,
    });
    return this.bookingRepository.save(booking);
  }

  async findAll(): Promise<Booking[]> {
    return this.bookingRepository.find();
  }

  async remove(id: number): Promise<void> {
    await this.bookingRepository.delete(id);
  }
}
