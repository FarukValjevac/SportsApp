import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

/**
 * Represents a booking in the database.
 */
@Entity()
export class Booking {
  /**
   * The unique identifier for the booking.
   * Automatically generated and serves as the primary key.
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * The type of sport for this booking (e.g., Tennis, Boxing).
   */
  @Column()
  sport: string;

  /**
   * The date of the booking.
   */
  @Column({ type: 'date' })
  date: Date;

  /**
   * The time of the booking (e.g., "10:00", "19:30").
   */
  @Column()
  time: string;
}
