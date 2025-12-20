import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Events from "./pages/Events";
import CreateEvent from "./pages/CreateEvent";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import ManagerDashboard from "./pages/ManagerDashboard";
import UserDashboard from "./pages/UserDashboard"; 

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />

        {/* User Dashboard / My Tickets - Dono paths add kar diye hain */}
        <Route path="/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
        <Route path="/my-bookings" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />

        <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
        <Route path="/create-event" element={<ProtectedRoute><CreateEvent /></ProtectedRoute>} />
        
        {/* Manager Dashboard Paths */}
        <Route path="/manager-dashboard" element={<ProtectedRoute><ManagerDashboard /></ProtectedRoute>} />
        <Route path="/manager-stats" element={<ProtectedRoute><ManagerDashboard /></ProtectedRoute>} />
      </Routes>
    </>
  );
}

export default App;