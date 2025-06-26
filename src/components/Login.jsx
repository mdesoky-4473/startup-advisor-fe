import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/login", { username, password });
      localStorage.setItem("token", data.token);
      onLogin(); // update auth state
      setMessage("Login successful!");
      navigate("/dashboard"); 
    } catch (err) {
    console.error("Login error:", err);
     setMessage("❌Login failed. Please try again.");
    }
  };

  return (
    <div>
       <h1>StartUp Advisor: Your AI Co-Pilot for Launch & Growth</h1>
        <form onSubmit={handleLogin}>
            <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
            <button type="submit">Login</button>
            {message && <p>{message}</p>}
        </form>
    </div>
  );
}
