import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SportsModule } from './sports/sports.module';
import { BookingsModule } from './bookings/bookings.module';
import { Booking } from './bookings/bookings.entity'; // Import the Booking entity

/**
 * The root module of the application.
 * It configures the database connection using TypeORM and imports other feature modules.
 */
@Module({
  /**
   * Imports other modules that provide functionality to this application.
   * - TypeOrmModule: Configures the database connection.
   * - SportsModule: Manages sports-related features.
   * - BookingsModule: Manages booking-related features.
   */
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'sportsapp',
      entities: [Booking],
      synchronize: true,
    }),
    SportsModule,
    BookingsModule,
  ],
  /**
   * Defines the controllers that handle incoming HTTP requests.
   * This module does not define any controllers directly.
   */
  controllers: [],
  /**
   * Provides the services that contain the business logic for this module.
   * - AppService: A general application service.
   */
  providers: [],
})
export class AppModule {}
