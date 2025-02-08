import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import PatientLogin from './components/PatientLogin';
import PatientSignup from './components/PatientSignup';
import HomePage from './components/HomePage';
import PatientDashboard from './components/PatientDashboard';
import MyAppointments from "./components/MyAppointments";
import ProfilePage from './components/ProfilePage'; // Import the ProfilePage component

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/patient-login" element={<PatientLogin />} />
      <Route path="/patient-signup" element={<PatientSignup />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/patient-dashboard" element={<PatientDashboard />} />
      <Route path="/profile" element={<ProfilePage />} />  {/* New route for ProfilePage */}
      <Route path="/appointments" element={<MyAppointments />} />
      <Route path="/logout" element={<LandingPage />} />
      <Route path="/doctor-login" element={<div>Doctor Login Page</div>} />
      <Route path="/admin-login" element={<div>Admin Login Page</div>} />
    </Routes>
  );
};

export default App;
