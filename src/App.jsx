import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register'; 
import Dashboard from './components/Dashboard';
import './App.css';

// Wrapper for routes requiring authentication
function ProtectedRoute({ isAuth, children }) {
  return isAuth ? children : <Navigate to="/" />;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <>
      <nav>
        <Link to="/">Login</Link>{" | "}
        <Link to="/register">Register</Link>{" | "}
        {isAuthenticated && <Link to="/dashboard">Dashboard</Link>}
      </nav>

      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register onLogin={handleLogin} />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAuth={isAuthenticated}>
              <Dashboard onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<div>404 – Page Not Found</div>} />
      </Routes>
    </>
  );
}

export default App;
