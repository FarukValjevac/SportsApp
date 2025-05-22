import React, { useState } from 'react';

function EventSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [bookingSuccessMessage, setBookingSuccessMessage] = useState('');
  const [bookingErrorMessage, setBookingErrorMessage] = useState('');

  const handleSearch = async () => {
    setBookingSuccessMessage(''); // Clear any previous success message
    setBookingErrorMessage(''); // Clear any previous error message
    try {
      const response = await fetch(`http://localhost:3000/sports/events?sport=${searchTerm}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Failed to fetch events:', error);
      setBookingErrorMessage('Failed to fetch events.');
    }
  };

  const handleBook = async (event) => {
    setBookingSuccessMessage(''); // Clear any previous success message
    setBookingErrorMessage(''); // Clear any previous error message
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
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! status: ${response.status} - ${errorData?.message || 'Failed to book event.'}`);
      }

      const result = await response.json();
      console.log('Booking response:', result);
      setBookingSuccessMessage(`Successfully booked ${event.sport} on ${new Date(event.date).toLocaleDateString()} at ${event.time}`);
    } catch (error) {
      let displayMessage = 'Failed to book event.';
      if (error.message.includes('409') && error.message.includes('already booked')) {
        displayMessage = 'Slot already booked, you can not book again.';
      }
      else {
        console.error('Failed to book event:', error);
      }
      setBookingErrorMessage(displayMessage);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a sport"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {bookingSuccessMessage && <p style={{ color: 'green' }}>{bookingSuccessMessage}</p>}
      {bookingErrorMessage && <p style={{ color: 'red' }}>{bookingErrorMessage}</p>}

      <h2>Search Results</h2>
      <ul>
        {searchResults.map((event, index) => (
          <li key={index}>
            {event.sport} - {new Date(event.date).toLocaleDateString()} - {event.time}
            <button onClick={() => handleBook(event)}>Book</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventSearch;