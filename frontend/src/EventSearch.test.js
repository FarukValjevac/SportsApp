import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EventSearch from './EventSearch';

/**
 * Test suite for the EventSearch component.
 */
describe('EventSearch', () => {
  // Mock the global fetch function before each test.
  const mockFetch = jest.fn();
  beforeEach(() => {
    global.fetch = mockFetch;
    mockFetch.mockClear();
  });

  /**
   * Test case to ensure that the component renders the search input field
   * and the "Search" button.
   */
  it('should render the search input and button', () => {
    // Render the EventSearch component.
    render(<EventSearch />);
    // Assert that the input field with the specified placeholder text is in the document.
    expect(screen.getByPlaceholderText('e.g., Yoga, Climbing')).toBeInTheDocument();
    // Assert that a button with the role "button" and the name "Search" is in the document.
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });
});