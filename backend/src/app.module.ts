/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SportsModule } from './sports/sports.module';
import { BookingsModule } from './bookings/bookings.module';
import { Booking } from './bookings/bookings.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config';

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
   */ imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Import ConfigModule here as well
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: 'localhost',
        port: configService.getOrThrow('DB.port'),
        username: configService.getOrThrow('DB.user'),
        password: '',
        database: configService.getOrThrow('DB.name'),
        entities: [Booking],
        synchronize: true,
      }),
      inject: [ConfigService],
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
