import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link to="/events" className="nav-logo">EVENTPRO</Link>

      <div className="nav-links">
        {token ? (
          <>
            <Link to="/events" className="nav-item">Events</Link>
            <Link to="/create-event" className="nav-item">Create Event</Link>
            <Link to="/my-bookings" className="nav-item">My Tickets</Link>
            <Link to="/manager-stats" className="nav-item">Stats</Link>
            <button className="logout-btn" onClick={handleLogout}>LOGOUT</button>
          </>
        ) : (
          <>
            <Link to="/" className="nav-item">Login</Link>
            <Link to="/register" className="nav-item">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}