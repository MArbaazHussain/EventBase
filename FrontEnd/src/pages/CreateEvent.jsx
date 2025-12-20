import { useState } from "react";
import axios from "axios";

export default function CreateEvent() {
  const venues = [
    { name: "Sizabist Auditorium", capacity: 200 },
    { name: "Executive Boardroom", capacity: 50 },
    { name: "Main Campus Hall", capacity: 500 }
  ];

  const [form, setForm] = useState({ title: "", description: "", date: "", venue: "", totalSeats: "" });

  const handleVenueChange = (e) => {
    const v = venues.find(v => v.name === e.target.value);
    if (v) {
      setForm({ ...form, venue: v.name, totalSeats: v.capacity });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/Events", form, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      alert("Event Live! 🚀");
    } catch (err) { alert("Error!"); }
  };

  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
      <div className="event-card" style={{ width: '100%', maxWidth: '450px', display: 'block' }}>
        <h2 className="form-title">Host New Event</h2>
        <form onSubmit={handleSubmit}>
          <input className="input-field" placeholder="Event Name" onChange={e => setForm({...form, title: e.target.value})} required />
          <textarea className="input-field" placeholder="Brief Description" onChange={e => setForm({...form, description: e.target.value})} style={{height: '100px'}} required />
          
          <select className="input-field" onChange={handleVenueChange} required>
            <option value="" disabled selected>Choose Venue</option>
            {venues.map(v => (
              <option key={v.name} value={v.name}>
                {v.name} ({v.capacity} Seats)
              </option>
            ))}
          </select>

          <input className="input-field" type="date" onChange={e => setForm({...form, date: e.target.value})} required />
          
          <div style={{ padding: '10px', background: 'rgba(255,0,60,0.1)', borderLeft: '3px solid #ff003c', marginBottom: '20px', fontSize: '14px' }}>
            Confirmed Capacity: <span style={{ color: '#ff003c', fontWeight: 'bold' }}>{form.totalSeats || 0} Seats</span>
          </div>

          <button className="btn-secure" style={{ width: '100%' }}>Publish Event</button>
        </form>
      </div>
    </div>
  );
}