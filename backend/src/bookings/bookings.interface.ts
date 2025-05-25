/**
 * DTO for creating a new booking.
 * Defines the structure of the data expected when a client requests to create a booking.
 */
export interface CreateBookingDto {
  /**
   * The type of sport for the booking (e.g., "Tennis", "Boxing").
   */
  sport: string;

  /**
   * The date of the booking.
   */
  date: Date;

  /**
   * The time of the booking (e.g., "10:00", "19:30").
   */
  time: string;
}
