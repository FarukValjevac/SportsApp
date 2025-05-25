import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './bookings.interface';

/**
 * Controller for handling booking related requests.
 * Defines API endpoints for creating, retrieving, and deleting bookings.
 */
@Controller('bookings')
export class BookingsController {
  /**
   * Inject the BookingsService to handle booking logic.
   */
  constructor(private readonly bookingsService: BookingsService) {}

  /**
   * Endpoint to create a new booking.
   * @param createBookingDto Data transfer object containing the booking information.
   * @returns A success message and the created booking object.
   */
  @Post()
  async createBooking(@Body() createBookingDto: CreateBookingDto) {
    const booking = await this.bookingsService.create(createBookingDto);
    console.log('Booking saved:', booking);
    return { message: 'Booking successful', booking };
  }

  /**
   * Endpoint to retrieve all bookings.
   * @returns A list of all booking objects.
   */
  @Get()
  async getAllBookings() {
    return this.bookingsService.findAll();
  }

  /**
   * Endpoint to remove a specific booking by its ID.
   * @param id The ID of the booking to remove, extracted from the URL parameter.
   * @returns A success message indicating the booking was removed.
   */
  @Delete(':id')
  async removeBooking(@Param('id') id: string) {
    await this.bookingsService.remove(parseInt(id, 10));
    return { message: `Booking with ID ${id} removed successfully` };
  }
}
