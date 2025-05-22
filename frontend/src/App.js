import React, { useState } from 'react';
import EventSearch from './EventSearch';
import BookedSlots from './BookedSlots';
import './App.css';

function App() {
  const [showBookedSlots, setShowBookedSlots] = useState(false);

  const toggleBookedSlots = () => {
    setShowBookedSlots(!showBookedSlots);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Sports Booking App</h1>
        <EventSearch />
        <button onClick={toggleBookedSlots}>
          {showBookedSlots ? 'Hide Booked Slots' : 'Show All Booked Slots'}
        </button>
        {showBookedSlots && <BookedSlots />}
      </header>
    </div>
  );
}

export default App;