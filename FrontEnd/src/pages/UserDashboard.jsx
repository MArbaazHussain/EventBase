import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

export default function UserDashboard() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get("http://localhost:5000/api/Events/user/bookings", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setBookings(res.data))
    .catch(err => console.error(err));
  }, []);

  return (
    <div className="container" style={{ marginTop: '80px' }}>
      <h1 className="form-title">MY SECURED TICKETS</h1>
      {bookings.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#888' }}>No active bookings found.</p>
      ) : (
        bookings.map((event, index) => (
          <div key={index} className="event-card">
            <div>
              <h2 className="event-title">{event?.title}</h2>
              <p style={{ color: '#aaa' }}>📍 {event?.venue}</p>
            </div>
            <div style={{ color: 'var(--primary-red)', fontWeight: 'bold' }}>VERIFIED ✅</div>
          </div>
        ))
      )}
    </div>
  );
}