import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PatientLogin.css";

const PatientLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Hardcoded credentials for testing
    const sampleEmail = "test@example.com";
    const samplePassword = "password";

    if (email === sampleEmail && password === samplePassword) {
      alert("Login Successful");
      navigate("/patient-dashboard"); // Navigate to the dashboard
    } else {
      alert("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <h2>Patient Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        New User?{" "}
        <span onClick={() => navigate("/patient-signup")} style={{ cursor: "pointer", color: "blue" }}>
          Sign Up
        </span>
      </p>
    </div>
  );
};

export default PatientLogin;
