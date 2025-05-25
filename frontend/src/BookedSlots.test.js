import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BookedSlots from './BookedSlots';

describe('BookedSlots', () => {
  it('should render booked slots if data is present', () => {
    const mockBookings = [
      { id: 1, sport: 'Tennis', date: '2025-05-28T00:00:00.000Z', time: '10:00' },
      { id: 2, sport: 'Boxing', date: '2025-05-29T00:00:00.000Z', time: '18:00' },
    ];
    render(<BookedSlots bookedSlots={mockBookings} loading={false} error={''} />);
    expect(screen.getByText(/Tennis/i)).toBeInTheDocument();
    expect(screen.getByText(/Boxing/i)).toBeInTheDocument();
  });
});