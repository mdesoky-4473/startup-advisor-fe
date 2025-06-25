import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Registration({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
   const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", { username, password });

      // Then log in
      const { data } = await API.post("/auth/login", { username, password });
      localStorage.setItem("token", data.token);
      onLogin();
      setMessage("Registration successful! Redirecting...");
      navigate("/dashboard");
    } catch (err) {
      console.error("Registration error:", err); 
      setMessage("Registration failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Register</button>
      {message && <p>{message}</p>}
    </form>
  );
}

