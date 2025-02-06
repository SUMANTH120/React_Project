import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./PatientDashboard.css";

const PatientDashboard = () => {
  const [searchActive, setSearchActive] = useState(false);
  const [specialty, setSpecialty] = useState("");
  const [doctors, setDoctors] = useState([]);
  const specialties = [
    "Dermatology",
    "Cardiology",
    "Neurology",
    "Pediatrics",
    "Oncology",
    "Orthopedics",
    "Psychiatry",
  ];

  const fetchDoctors = async () => {
    if (!specialty) return;
    try {
      const response = await fetch(`https://backend-0ira.onrender.com/api/doctors?specialty=${specialty}`);
      const data = await response.json();
      setDoctors(data.doctors || []);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      setDoctors([]);
    }
  };

  return (
    <div className="dashboard-page">
      {/* Navbar */}
      <nav className="custom-navbar">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand">
            <img src="./logo.jpeg" alt="Logo" className="logo" />
            <span className="brand-name">Telemedicine</span>
          </Link>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/profile">My Profile</Link></li>
            <li><Link to="/appointments">My Appointments</Link></li>
            <li><Link to="/prescriptions">My Prescriptions</Link></li>
            <li><Link to="/medicine">Medicine</Link></li>
            <li><Link to="/logout">Logout</Link></li>
          </ul>
        </div>
      </nav>

      {/* Search Bar */}
      <div className="search-bar">
        <form className="search-form" onSubmit={(e) => e.preventDefault()}>
          <input
            type="search"
            placeholder="Search specialties..."
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            onFocus={() => setSearchActive(true)}
            onBlur={() => setTimeout(() => setSearchActive(false), 200)}
          />
          {searchActive && (
            <ul className="specialty-dropdown">
              {specialties.map((spec, index) => (
                <li key={index} onClick={() => setSpecialty(spec)}>
                  {spec}
                </li>
              ))}
            </ul>
          )}
          <button type="button" onClick={fetchDoctors}>Search</button>
        </form>
      </div>

      {/* Doctors List */}
      <div className="doctors-container">
        {doctors.length > 0 ? (
          doctors.map((doctor, index) => (
            <div key={index} className="doctor-card">
              <img src={doctor.image} alt={doctor.name} className="doctor-image" />
              <h3>{doctor.name}</h3>
              <p><strong>Age:</strong> {doctor.age}</p>
              <p><strong>Gender:</strong> {doctor.gender}</p>
              <p><strong>Experience:</strong> {doctor.experience} years</p>
              <p><strong>Patients Consulted:</strong> {doctor.patientsConsulted}</p>
              <button className="book-appointment-btn">Book Appointment</button>
            </div>
          ))
        ) : (
          specialty && <p>No doctors found for {specialty}</p>
        )}
      </div>

      {/* Cards Section */}
      <div className="cards-container">
        <div className="card">
          <h3>Explore Doctors</h3>
          <p>Find specialists and schedule appointments easily.</p>
          <Link to="/explore-doctors" className="card-button">
            Explore
          </Link>
        </div>
        <div className="card">
          <h3>Order Medicines</h3>
          <p>Get your medicines delivered to your doorstep.</p>
          <Link to="/order-medicines" className="card-button">
            Order Now
          </Link>
        </div>
        <div className="card">
          <h3>Upload Prescription</h3>
          <p>Upload prescriptions for consultations or orders.</p>
          <Link to="/upload-prescription" className="card-button">
            Upload
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="custom-footer">
        <p>© 2025 All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PatientDashboard;
