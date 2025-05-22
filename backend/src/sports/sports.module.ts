import { Module } from '@nestjs/common';
import { SportsService } from './sports.service';
import { SportsController } from './sports.controller';

@Module({
  providers: [SportsService],
  controllers: [SportsController],
})
export class SportsModule {}
