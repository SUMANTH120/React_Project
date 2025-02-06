import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PatientLogin.css";

const PatientLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3007/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (data.success) {
      alert("Login Successful");

      // Store email in sessionStorage
      sessionStorage.setItem("userEmail", email);

      // Navigate to patient dashboard or profile setup
      navigate("/patient-dashboard");
    } else {
      alert(data.message || "Invalid credentials");
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
        New User? <span onClick={() => navigate("/patient-signup")}>Sign Up</span>
      </p>
    </div>
  );
};

export default PatientLogin;
