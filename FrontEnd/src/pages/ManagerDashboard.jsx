import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

export default function ManagerDashboard() {
  const [myEvents, setMyEvents] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get("http://localhost:5000/api/Events/manager/my-events", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setMyEvents(res.data))
    .catch(err => console.error(err));
  }, []);

  return (
    <div className="container" style={{ marginTop: '80px' }}>
      <h1 className="form-title">EVENT ANALYTICS</h1>
      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
        <div className="stat-card">
          <span className="stat-number">{myEvents.length}</span>
          <span>Managed Events</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{myEvents.reduce((acc, curr) => acc + (curr.totalBooked || 0), 0)}</span>
          <span>Tickets Sold</span>
        </div>
      </div>
      {myEvents.map(event => (
        <div key={event._id} className="event-card" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            <h2 className="event-title">{event.title}</h2>
            <span style={{ color: 'var(--primary-red)' }}>{event.totalBooked} Sold</span>
          </div>
          <p style={{ color: '#888', margin: '5px 0' }}>Current Slots Available: {event.totalSeats}</p>
        </div>
      ))}
    </div>
  );
}