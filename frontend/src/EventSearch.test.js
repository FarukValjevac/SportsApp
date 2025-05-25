import { render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import EventSearch from './EventSearch';

const mockFetch = jest.fn();

beforeEach(() => {
  global.fetch = mockFetch;
  mockFetch.mockClear();
});

describe('EventSearch', () => {
  it('should render the search input and button', () => {
    render(<EventSearch />);
    expect(screen.getByPlaceholderText('e.g., Yoga, Climbing')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });
});