import { Module } from '@nestjs/common';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './bookings.entity';

/**
 * Module for managing booking related features.
 * It defines the controllers, services, and integrates with TypeORM for database interactions related to bookings.
 */
@Module({
  /**
   * Imports the TypeOrmModule, specifically registering the Booking entity for this module.
   * This makes the Booking repository available within this module.
   */
  imports: [TypeOrmModule.forFeature([Booking])],
  /**
   * Defines the controllers that handle incoming HTTP requests related to bookings.
   */
  controllers: [BookingsController],
  /**
   * Provides the services that contain the business logic for bookings.
   */
  providers: [BookingsService],
})
export class BookingsModule {}
