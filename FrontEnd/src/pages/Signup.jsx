import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css"; // Path check kar lena
export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      console.log("Signup clicked");

      const res = await axios.post("http://localhost:5000/api/auth/signup", {
        name,
        email,
        password,
      });

      console.log("Signup response:", res.data);
      alert("Signup successful! Now login.");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Signup failed");
    }
  };

  return (
   <div className="container" style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '100px' }}>
    <div className="stat-card" style={{ width: '400px', padding: '40px', borderTop: '3px solid var(--primary-red)' }}>
      <h1 className="form-title">SIGNUP</h1>
      <form onSubmit={(e) => { e.preventDefault(); handleSignup(); }}>
        <input className="input-field" placeholder="FULL NAME" onChange={e => setName(e.target.value)} required />
        <input className="input-field" type="email" placeholder="AGENT EMAIL" onChange={e => setEmail(e.target.value)} required />
        <input className="input-field" type="password" placeholder="PASSWORD" onChange={e => setPassword(e.target.value)} required />
        <button className="btn-secure" style={{ width: '100%', marginTop: '20px' }}>Initialize Access</button>
      </form>
      <button className="link-btn" onClick={() => navigate("/")}>Already Registered? Login</button>
    </div>
  </div>
    
  );
}
