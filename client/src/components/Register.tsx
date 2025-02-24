import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api";
import "../styles/auth.css"; // Add this for styling

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await register(username, password);
      alert("Registration successful. Please log in.");
      navigate("/login");
    } catch (error: any) {
      console.error("Registration error:", error);
      if (error.response && error.response.data && error.response.data.error) {
        alert(`Error registering user: ${error.response.data.error}`);
      } else {
        alert("Error registering user");
      }
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
