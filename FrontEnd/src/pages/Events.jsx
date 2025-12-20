import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

export default function Events() {
  const [events, setEvents] = useState([]);

  const fetchEvents = () => {
    axios.get("http://localhost:5000/api/Events")
      .then(res => setEvents(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleBook = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(`http://localhost:5000/api/Events/${id}/book`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Ticket Secured!");
      fetchEvents(); // Refresh data to show updated slots
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="container">
      <h1 className="form-title">LIVE EVENTS</h1>
      {events.map(event => (
        <div key={event._id} className="event-card">
          <div>
            <h2 className="event-title">{event.title}</h2>
            <p>{event.description}</p>
            <p style={{ color: '#888', fontSize: '12px' }}>📍 {event.venue} | 🎟️ {event.totalSeats} Slots Left</p>
          </div>
          <button className="btn-secure" onClick={() => handleBook(event._id)}>Secure Seat</button>
        </div>
      ))}
    </div>
  );
}