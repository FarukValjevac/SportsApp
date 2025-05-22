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
      setSearchResults(data);
      console.log(data);
    } catch (error) {
      console.error('Failed to fetch events:', error);
      // You might want to display an error message to the user here
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
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventSearch;