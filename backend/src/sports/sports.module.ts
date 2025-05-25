import { Module } from '@nestjs/common';
import { SportsService } from './sports.service';
import { SportsController } from './sports.controller';

/**
 * Module for managing sports-related features.
 * It defines the services and controllers responsible for handling sports data.
 */
@Module({
  /**
   * Provides the services that contain the business logic for sports data retrieval.
   */
  providers: [SportsService],
  /**
   * Defines the controllers that handle incoming requests related to sports.
   */
  controllers: [SportsController],
})
export class SportsModule {}
