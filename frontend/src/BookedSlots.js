import React, { useState, useEffect } from 'react';

function BookedSlots() {
  const [bookedSlots, setBookedSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookedSlots = async () => {
      try {
        const response = await fetch('http://localhost:3000/bookings');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBookedSlots(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch booked slots:', error);
        setError('Failed to fetch booked slots.');
        setLoading(false);
      }
    };

    fetchBookedSlots();
  }, []);

  const handleRemove = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/bookings/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Refresh the list after successful deletion
      const responseData = await response.json();
      console.log(responseData.message);
      const fetchBookedSlots = async () => {
        try {
          const response = await fetch('http://localhost:3000/bookings');
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setBookedSlots(data);
          setLoading(false);
        } catch (error) {
          console.error('Failed to fetch booked slots:', error);
          setError('Failed to fetch booked slots.');
          setLoading(false);
        }
      };
      fetchBookedSlots();
    } catch (error) {
      console.error('Failed to remove booking:', error);
      setError('Failed to remove booking.');
    }
  };

  if (loading) {
    return <p>Loading booked slots...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div>
      <h2>All Booked Slots</h2>
      {bookedSlots.length === 0 ? (
        <p>No slots have been booked yet.</p>
      ) : (
        <ul>
          {bookedSlots.map((slot, index) => (
            <li key={index}>
              {slot.sport} - {new Date(slot.date).toLocaleDateString()} - {slot.time}
              <button onClick={() => handleRemove(slot.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BookedSlots;