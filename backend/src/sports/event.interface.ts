/**
 * Interface defining the structure of a sport event.
 * Represents a scheduled activity for a particular sport at a specific date and time.
 */
export interface Event {
  /**
   * The name of the sport (e.g., "Boxing", "Tennis").
   */
  sport: string;

  /**
   * The date of the event.
   */
  date: Date;

  /**
   * The time of the event in a string format (e.g., "10:00", "14:30").
   */
  time: string;
}
