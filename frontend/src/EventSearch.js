import React, { useState } from 'react';

/**
 * Component for searching sports events and displaying the results.
 * Allows users to input a sport and view available activities for the coming week.
 */
function EventSearch(props) {
  // State to store the user's search term.
  const [searchTerm, setSearchTerm] = useState('');
  // State to store the array of search results (events).
  const [searchResults, setSearchResults] = useState([]);
  // State to display a success message after booking.
  const [bookingSuccessMessage, setBookingSuccessMessage] = useState('');
  // State to display an error message if booking fails.
  const [bookingErrorMessage, setBookingErrorMessage] = useState('');
  // State to track if a search has been performed to conditionally render the "not available" message.
  const [hasSearched, setHasSearched] = useState(false);

  /**
   * Handles the search functionality.
   * Calls the backend API to fetch events based on the search term.
   */
  const handleSearch = async () => {
    setBookingSuccessMessage('');
    setBookingErrorMessage('');
    setHasSearched(true); // Set to true when a search is initiated.
    try {
      const response = await fetch(`http://localhost:3000/sports/events?sport=${searchTerm}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Search results from backend:', data);
      setSearchResults(data);
    } catch (error) {
      console.error('Failed to fetch events:', error);
      setBookingErrorMessage('Failed to fetch events.');
    }
  };

  /**
   * Handles the booking of a specific event.
   * Sends a POST request to the backend to create a new booking.
   * @param event The event object to be booked.
   */
  const handleBook = async (event) => {
    setBookingSuccessMessage('');
    setBookingErrorMessage('');
    try {
      const response = await fetch('http://localhost:3000/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sport: event.sport,
          date: event.date,
          time: event.time,
          userId: null, // Temporarily set userId to null
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        let displayMessage = 'Failed to book event.';
        if (errorData?.message?.includes('already booked')) {
          displayMessage = 'Slot already booked.';
        }
        throw new Error(`HTTP error! status: ${response.status} - ${displayMessage}`);
      }

      const result = await response.json();
      console.log('Booking response:', result);
      setBookingSuccessMessage(`Successfully booked ${event.sport} on ${new Date(event.date).toLocaleDateString()} at ${event.time}`);
      props.onBookingSuccess(); // Call the prop to refresh booked slots in the parent component.
    } catch (error) {
      console.error('Failed to book event:', error);
      let displayMessage = 'Failed to book event.';
      if (error.message.includes('409') && error.message.includes('already booked')) {
        displayMessage = 'Slot already booked.';
      }
      setBookingErrorMessage(displayMessage);
    }
  };

  return (
    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', width: '100%', maxWidth: '600px', marginBottom: '20px' }}>
      <div style={{ marginBottom: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <label htmlFor="sport-search" style={{ marginBottom: '5px', fontWeight: 'bold' }}>Find your sport:</label>
        <div style={{ display: 'flex', width: '100%', maxWidth: '400px' }}>
          <input
            type="text"
            id="sport-search"
            placeholder="e.g., Yoga, Climbing"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ border: '1px solid #ccc', borderRadius: '3px', padding: '10px', flexGrow: 1, marginRight: '10px' }}
          />
          <button
            onClick={handleSearch}
            style={{ backgroundColor: '#007bff', color: 'white', padding: '10px 15px', borderRadius: '3px', border: 'none', cursor: 'pointer' }}
          >
            Search
          </button>
        </div>
      </div>

      {bookingSuccessMessage && <p style={{ color: 'green', marginBottom: '10px', textAlign: 'center' }}>{bookingSuccessMessage}</p>}
      {bookingErrorMessage && <p style={{ color: 'red', marginBottom: '10px', textAlign: 'center' }}>{bookingErrorMessage}</p>}

      <h2 style={{ fontSize: '1.5em', fontWeight: 'bold', marginBottom: '10px', color: '#333', textAlign: 'center' }}>Available Activities</h2>
      {hasSearched && searchResults.length === 0 && (
        <p style={{ color: '#777' }}>This sport is unfortunately not available in the coming week.</p>
      )}
      {searchResults.length > 0 && (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {searchResults.map((event, index) => (
            <li key={index} style={{ backgroundColor: '#f9f9f9', border: '1px solid #eee', borderRadius: '3px', padding: '10px', marginBottom: '5px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ color: '#555' }}>
                <strong style={{ fontWeight: 'bold' }}>{event.sport}</strong> - {new Date(event.date).toLocaleDateString()} at {event.time}
              </span>
              <button
                onClick={() => handleBook(event)}
                style={{ backgroundColor: '#21A696', color: 'white', padding: '8px 12px', borderRadius: '3px', border: 'none', cursor: 'pointer', marginLeft: '10px' }}
              >
                Book Now
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default EventSearch;