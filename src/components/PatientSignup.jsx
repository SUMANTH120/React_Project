// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./PatientSignup.css";

// const PatientSignup = () => {
//   const [id, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     const response = await fetch("http://localhost:3000/api/signup", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ name, email, password }),
//     });

//     const data = await response.json();
//     if (data.success) {
//       alert("Sign-Up Successful! Please log in.");
//       navigate("/patient-login");
//     } else {
//       alert(data.message || "Error during sign-up.");
//     }
//   };

//   return (
//     <div className="signup-page">
//       <h2>Patient Sign-Up</h2>
//       <form onSubmit={handleSignup}>
//         <input
//           type="text"
//           placeholder="Name"
//           value={id}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Sign Up</button>
//       </form>
//     </div>
//   );
// };

// export default PatientSignup;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PatientSignup.css"; // Optional: Add your CSS styling

const PatientSignup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3007/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Signup successful!");
        navigate("/patient-login"); // Redirect to login page
      } else {
        alert(data.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="signup-page">
      <h2>Patient Signup</h2>
      <form onSubmit={handleSignup} style={{gap:"15px"}}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email Address"
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
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account?{" "}
        <span onClick={() => navigate("/patient-login")}>Log In</span>
      </p>
    </div>
  );
};

export default PatientSignup;

