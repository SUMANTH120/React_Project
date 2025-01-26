import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="header">
        <img src="logo.jpeg" alt="TeleMed Logo" className="logo" />
      </header>
      <div className="content-container">
        <h1>Welcome to MediLink</h1>
        <p>Your gateway to seamless online consultations</p>
        <div className="card-container">
          <Link to="/patient-login" className="card">
            <h2>Patient Login</h2>
            <p>Book appointments, view prescriptions, and consult doctors.</p>
          </Link>
          <Link to="/doctor-login" className="card">
            <h2>Doctor Login</h2>
            <p>Manage appointments, consult with patients, and share prescriptions.</p>
          </Link>
          <Link to="/admin-login" className="card">
            <h2>Admin Login</h2>
            <p>Oversee platform operations and manage users effectively.</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
