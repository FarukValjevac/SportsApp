import React, { useState, useEffect } from 'react';
import EventSearch from './EventSearch';
import BookedSlots from './BookedSlots';
import './App.css';

// Manages the display of the search functionality and the booked slots sidebar.
function App() {

  // State to control the visibility of the booked slots sidebar.
  const [showBookedSlots, setShowBookedSlots] = useState(false);
  // State to store the list of booked slots fetched from the backend.
  const [bookedSlots, setBookedSlots] = useState([]);
  // State to track the loading status of fetching booked slots.
  const [loadingBookedSlots, setLoadingBookedSlots] = useState(true);
  // State to store any errors encountered while fetching booked slots.
  const [errorBookedSlots, setErrorBookedSlots] = useState('');

  /**
   * Toggles the visibility of the booked slots sidebar.
   */
  const toggleBookedSlots = () => {
    setShowBookedSlots(!showBookedSlots);
  };

   /**
   * Fetches the list of all booked slots from the backend.
   */
  const fetchBookedSlots = async () => {
    setLoadingBookedSlots(true);
    setErrorBookedSlots('');
    try {
      const response = await fetch('http://localhost:3000/bookings');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setBookedSlots(data);
      setLoadingBookedSlots(false);
    } catch (error) {
      console.error('Failed to fetch booked slots:', error);
      setErrorBookedSlots('Failed to fetch booked slots.');
      setLoadingBookedSlots(false);
    }
  };

   /**
   * useEffect hook to fetch booked slots when the `showBookedSlots` state becomes true.
   * The dependency array ensures this effect runs only when `showBookedSlots` changes.
   */
  useEffect(() => {
    if (showBookedSlots) {
      fetchBookedSlots();
    }
  }, [showBookedSlots]);

  return (
    <div className="app" style={{ fontFamily: 'sans-serif', textAlign: 'center', padding: '20px', backgroundColor: 'white', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <header className="app-header" style={{ backgroundColor: '#f8f9fa', color: 'black', padding: '20px', marginBottom: '20px', borderRadius: '5px', borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', maxWidth: '600px' }}>
        <h1 style={{ fontSize: '2em', fontWeight: 'bold', marginBottom: '0' }}>Sports Booking App</h1>
        {!showBookedSlots && (
          <button onClick={toggleBookedSlots} style={{ backgroundColor: '#21A696', color: 'white', padding: '8px 12px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>
            My Bookings
          </button>
        )}
      </header>
      <div style={{ width: '100%', maxWidth: '600px' }}>
        <EventSearch onBookingSuccess={fetchBookedSlots} />
      </div>
      {showBookedSlots && (
        <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'flex-end', zIndex: 10 }}>
          <div style={{ backgroundColor: 'white', width: '300px', padding: '20px', boxShadow: '-2px 0 5px rgba(0, 0, 0, 0.2)', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h2 style={{ fontSize: '1.5em', fontWeight: 'bold', color: '#333', textAlign: 'left', marginBottom: 0 }}>My Bookings</h2>
              <button onClick={toggleBookedSlots} style={{ backgroundColor: '#dc3545', color: 'white', padding: '8px 12px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>
                Close
              </button>
            </div>
            <BookedSlots bookedSlots={bookedSlots} loading={loadingBookedSlots} error={errorBookedSlots} onRemove={fetchBookedSlots} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;