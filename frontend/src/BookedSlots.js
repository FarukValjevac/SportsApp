import React from 'react';

function BookedSlots({ bookedSlots, loading, error, onRemove }) {
  const handleRemove = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/bookings/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseData = await response.json();
      console.log(responseData.message);
      onRemove(); // Call the prop to refresh booked slots
    } catch (error) {
      console.error('Failed to remove booking:', error);
      // setError('Failed to remove booking.'); // Removed local error state
    }
  };

  if (loading) {
    return <p style={{ color: '#666' }}>Loading your bookings...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>Error loading bookings.</p>;
  }

  return (
    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', width: '100%', maxWidth: '600px', marginTop: '20px' }}>
      <h2 style={{ fontSize: '1.5em', fontWeight: 'bold', marginBottom: '15px', color: '#333', textAlign: 'center' }}>Your Booked Activities</h2>
      {bookedSlots.length === 0 ? (
        <p style={{ color: '#555' }}>No slots have been booked yet.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {bookedSlots.map((slot, index) => (
            <li key={index} style={{ backgroundColor: '#f9f9f9', border: '1px solid #eee', borderRadius: '3px', padding: '10px', marginBottom: '5px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ color: '#555' }}>
                <strong style={{ fontWeight: 'bold' }}>{slot.sport}</strong> - {new Date(slot.date).toLocaleDateString()} at {slot.time}
              </span>
              <button
                onClick={() => handleRemove(slot.id)}
                style={{ backgroundColor: '#dc3545', color: 'white', padding: '8px 12px', borderRadius: '3px', border: 'none', cursor: 'pointer', marginLeft: '10px' }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BookedSlots;