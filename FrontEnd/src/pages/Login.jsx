import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css"; // CSS import zaroori hai

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/events");
    } catch (err) { 
      alert("Access Denied! Check your credentials."); 
    }
  };

  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'var(--bg-dark)' }}>
      {/* Humne yahan 'event-card' use kiya hai jo aapki App.css mein defined hai */}
      <div className="event-card" style={{ flexDirection: 'column', width: '380px', padding: '50px', display: 'flex', alignItems: 'center' }}>
        
        <h1 className="form-title" style={{ marginBottom: '40px' }}>LOGIN</h1>
        
        <form onSubmit={handleLogin} style={{ width: '100%' }}>
          <input 
            className="input-field" 
            type="email" 
            placeholder="AGENT EMAIL" 
            required
            onChange={e => setEmail(e.target.value)} 
          />
          <input 
            className="input-field" 
            type="password" 
            placeholder="PASSWORD" 
            required
            onChange={e => setPassword(e.target.value)} 
          />
          
          {/* 'btn-secure' class use ki hai chamakne ke liye */}
          <button className="btn-secure" style={{ width: '100%', marginTop: '20px' }}>
            Enter System
          </button>
        </form>

        {/* Niche wala button link jaisa lagega */}
        <button 
          className="link-btn" 
          onClick={() => navigate("/register")}
          style={{ background: 'none', border: 'none', marginTop: '25px' }}
        >
          Request Access (Sign Up)
        </button>
      </div>
    </div>
  );
}