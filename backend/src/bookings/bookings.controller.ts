import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './bookings.interface';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  async createBooking(@Body() createBookingDto: CreateBookingDto) {
    const booking = await this.bookingsService.create(createBookingDto);
    console.log('Booking saved:', booking);
    return { message: 'Booking successful', booking };
  }

  @Get()
  async getAllBookings() {
    return this.bookingsService.findAll();
  }

  @Delete(':id')
  async removeBooking(@Param('id') id: string) {
    await this.bookingsService.remove(parseInt(id, 10));
    return { message: `Booking with ID ${id} removed successfully` };
  }
}
