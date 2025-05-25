import { DataSource } from 'typeorm';
import { Booking } from './bookings/bookings.entity';

// Defines the TypeORM DataSource for database connection and migrations
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'sportsapp',
  entities: [Booking],
  migrations: [],
  synchronize: false,
});
