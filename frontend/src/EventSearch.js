import React, { useState } from 'react';

function EventSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:3000/sports/events?sport=${searchTerm}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Data from backend:', data);
      setSearchResults(data);
    } catch (error) {
      console.error('Failed to fetch events:', error);
      // You might want to display an error message to the user here
    }
  };

  const handleBook = async (event) => {
    console.log('Book button clicked for:',  event.sport, event.date, event.time);
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
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Booking response:', result);
    } catch (error) {
      console.error('Failed to book event:', error);
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