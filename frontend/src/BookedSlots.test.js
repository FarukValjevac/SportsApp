import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BookedSlots from './BookedSlots';

/**
 * Test suite for the BookedSlots component.
 */
describe('BookedSlots', () => {
  /**
   * Test case to ensure that the component renders the list of booked slots
   * correctly when provided with data.
   */
  it('should render booked slots if data is present', () => {
    // Mock the booked slots data passed as a prop.
    const mockBookings = [
      { id: 1, sport: 'Tennis', date: '2025-05-28T00:00:00.000Z', time: '10:00' },
      { id: 2, sport: 'Boxing', date: '2025-05-29T00:00:00.000Z', time: '18:00' },
      { id: 3, sport: 'Swimming', date: '2025-05-27T00:00:00.000Z', time: '12:00' },
    ];
    // Render the BookedSlots component with the mock data.
    render(<BookedSlots bookedSlots={mockBookings} loading={false} error={''} />);
    // Assert that each sport name from the mock data is present in the rendered output.
    expect(screen.getByText(/Tennis/i)).toBeInTheDocument();
    expect(screen.getByText(/Boxing/i)).toBeInTheDocument();
    expect(screen.getByText(/Swimming/i)).toBeInTheDocument();
  });
});