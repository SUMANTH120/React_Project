// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import '@fortawesome/fontawesome-free/css/all.min.css';

// import "./PatientDashboard.css"; // Import the CSS file below

// const PatientDashboard = () => {
//   // State for the sidebar collapse
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   // State for the search bar and doctors list
//   const [searchActive, setSearchActive] = useState(false);
//   const [specialty, setSpecialty] = useState("");
//   const [doctors, setDoctors] = useState([]);

//   const specialties = [
//     "Dermatology",
//     "Cardiology",
//     "Neurology",
//     "Pediatrics",
//     "Oncology",
//     "Orthopedics",
//     "Psychiatry",
//   ];

//   const fetchDoctors = async () => {
//     if (!specialty) return;
//     try {
//       const response = await fetch(
//         `https://backend-0ira.onrender.com/api/doctors?specialty=${specialty}`
//       );
//       const data = await response.json();
//       setDoctors(data);
//     } catch (error) {
//       console.error("Error fetching doctors:", error);
//       setDoctors([]);
//     }
//   };

//   return (
    
//     <div className={`wrapper ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
//       {/* ===== Sidebar ===== */}
//       <nav id="sidebar" className="bg-dark">
//         <div className="sidebar-header text-center text-white py-4">
//           <h4>Patient Dashboard</h4>
//         </div>
//         <ul className="list-unstyled components">
//           <li>
//             <Link to="/" className="text-white">Home</Link>
//           </li>
//           <li>
//             <Link to="/profile" className="text-white">My Profile</Link>
//           </li>
//           <li>
//             <Link to="/appointments" className="text-white">My Appointments</Link>
//           </li>
//           <li>
//             <Link to="/prescriptions" className="text-white">My Prescriptions</Link>
//           </li>
//           <li>
//             <Link to="/medicine" className="text-white">Medicine</Link>
//           </li>
//           <li>
//             <Link to="/logout" className="text-white">Logout</Link>
//           </li>
//         </ul>
//       </nav>

//       {/* ===== Page Content ===== */}
//       <div id="content">
//         {/* Top Navbar */}
//         {/* Top Navbar */}
//         <nav className="navbar navbar-expand-lg bg-dark text-white">
//       <div className="container-fluid">
//         {/* Hamburger Icon (Correctly Positioned & Only Clickable Element) */}
//         <div id="sidebarCollapse" className="hamburger-container">
//           <i className="fas fa-bars hamburger-icon" onClick={() => setSidebarOpen(!sidebarOpen)} id="hamm"></i>
//         </div>
//       </div>
//         </nav>


//         <div className="container-fluid">
//           {/* ===== Search Bar ===== */}
//           <div className="search-bar my-4">
//             <form
//               className="search-form position-relative"
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 fetchDoctors();
//               }}
//             >
//               <input
//                 type="search"
//                 className="form-control"
//                 placeholder="Search specialties..."
//                 value={specialty}
//                 id="search_bar"
//                 onChange={(e) => setSpecialty(e.target.value)}
//                 onFocus={() => setSearchActive(true)}
//                 onBlur={() => setTimeout(() => setSearchActive(false), 200)}
//               />
//               {searchActive && (
//                 <ul className="specialty-dropdown list-group position-absolute w-100">
//                   {specialties.map((spec, index) => (
//                     <li
//                       key={index}
//                       className="list-group-item list-group-item-action"
//                       onClick={() => {
//                         setSpecialty(spec);
//                         setSearchActive(false);
//                       }}
//                     >
//                       {spec}
//                     </li>
//                   ))}
//                 </ul>
//               )}
//               <button
//                 type="button"
//                 id="button_bar"
//                 className="btn btn-primary mt-2"
//                 onClick={fetchDoctors}
//               >
//                 Search
//               </button>
//             </form>
//           </div>

//           {/* ===== Doctors List ===== */}
//           <div className="doctors-container row">
//             {doctors.length > 0 ? (
//               doctors.map((doctor, index) => (
//                 <div key={index} className="col-md-4 mb-4">
//                   <div className="card doctor-card h-100">
//                     <img
//                       src={doctor.image}
//                       alt={doctor.name}
//                       className="card-img-top doctor-image"
//                     />
//                     <div className="card-body">
//                       <h5 className="card-title">{doctor.name}</h5>
//                       <p className="card-text">
//                         <strong>Age:</strong> {doctor.age} <br />
//                         <strong>Gender:</strong> {doctor.gender} <br />
//                         <strong>Experience:</strong> {doctor.experience} years <br />
//                         <strong>Patients Consulted:</strong> {doctor.patients_consulted}
//                       </p>
//                       <button className="btn btn-success" onClick={() => alert("To Confirm Appointment Go to My Appointments to select a time.")}>
//                         Book Appointment
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               specialty && (
//                 <div className="col-12">
//                   <p className="text-center">No doctors found for {specialty}</p>
//                 </div>
//               )
//             )}
//           </div>

//           {/* ===== Cards Section ===== */}
//           <div className="cards-container row my-4">
//             <div className="col-md-4 mb-3">
//               <div className="card h-100">
//                 <div className="card-body">
//                   <h5 className="card-title">Explore Doctors</h5>
//                   <p className="card-text">
//                     Find specialists and schedule appointments easily.
//                   </p>
//                   <Link to="/explore-doctors" className="btn btn-primary">
//                     Explore
//                   </Link>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-4 mb-3">
//               <div className="card h-100">
//                 <div className="card-body">
//                   <h5 className="card-title">Order Medicines</h5>
//                   <p className="card-text">
//                     Get your medicines delivered to your doorstep.
//                   </p>
//                   <Link to="/order-medicines" className="btn btn-primary">
//                     Order Now
//                   </Link>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-4 mb-3">
//               <div className="card h-100">
//                 <div className="card-body">
//                   <h5 className="card-title">Upload Prescription</h5>
//                   <p className="card-text">
//                     Upload prescriptions for consultations or orders.
//                   </p>
//                   <Link to="/upload-prescription" className="btn btn-primary">
//                     Upload
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* ===== Footer ===== */}
//           <footer className="custom-footer text-center py-3">
//             <p>© 2025 All rights reserved.</p>
//           </footer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PatientDashboard;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./PatientDashboard.css";

const PatientDashboard = () => {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchActive, setSearchActive] = useState(false);
  const [specialty, setSpecialty] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [userEmail, setUserEmail] = useState("");

  // Force a reload if the page is restored from bfcache (back-forward cache)
  useEffect(() => {
    window.onpageshow = function (event) {
      if (event.persisted) {
        window.location.reload();
      }
    };
  }, []);

  // Route guarding: redirect if not logged in.
  useEffect(() => {
    const email = sessionStorage.getItem("userEmail");
    if (!email) {
      navigate("/", { replace: true });
    } else {
      setUserEmail(email);
    }
  }, [navigate]);

  // Listen to browser navigation (back/forward) events to ensure redirection if logged out.
  useEffect(() => {
    const handlePopState = () => {
      if (!sessionStorage.getItem("userEmail")) {
        navigate("/", { replace: true });
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [navigate]);

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
      const response = await fetch(`http://localhost:5001/api/doctors?specialty=${specialty}`);
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      setDoctors([]);
    }
  };

  const bookAppointment = async (doctor) => {
    if (!userEmail) {
      alert("Please log in to book an appointment.");
      return;
    }

    // Ensure availableTimes is provided
    const appointmentData = {
      userEmail,
      doctorId: doctor._id,
      doctorName: doctor.name,
      specialty: doctor.specialty,
      availableTimes: doctor.availableTimes || ["10:00 AM", "11:30 AM", "2:00 PM"],
    };

    console.log("Sending Appointment Data:", appointmentData);

    try {
      const response = await fetch("http://localhost:5001/api/appointments/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointmentData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Appointment booked. Go to My Appointments to select a time.");
      } else {
        alert(result.message || "Failed to book appointment.");
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("An error occurred while booking the appointment.");
    }
  };

  // Logout handler: clear session storage and force navigation with history replaced.
  const handleLogout = () => {
    sessionStorage.removeItem("userEmail");
    navigate("/", { replace: true });
  };

  return (
    <div className={`wrapper ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
      {/* ===== Sidebar ===== */}
      <nav id="sidebar" className="bg-dark">
        <div className="sidebar-header text-center text-white py-4">
          <h4>Patient Dashboard</h4>
        </div>
        <ul className="list-unstyled components">
          <li><Link to="/patient-dashboard" className="text-white">Home</Link></li>
          <li><Link to="/profile" className="text-white">My Profile</Link></li>
          <li><Link to="/appointments" className="text-white">My Appointments</Link></li>
          <li>
            <button 
              className="text-white btn btn-link" 
              onClick={handleLogout}
              style={{ textDecoration: "none", padding: 0 }}
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>

      {/* ===== Page Content ===== */}
      <div id="content">
        {/* Top Navbar */}
        <nav className="navbar navbar-expand-lg bg-dark text-white">
          <div className="container-fluid">
            <div id="sidebarCollapse" className="hamburger-container">
              <i className="fas fa-bars hamburger-icon" onClick={() => setSidebarOpen(!sidebarOpen)}></i>
            </div>
          </div>
        </nav>

        <div className="container-fluid">
          {/* ===== Search Bar ===== */}
          <div className="search-bar my-4">
            <form className="search-form position-relative" onSubmit={(e) => { e.preventDefault(); fetchDoctors(); }}>
              <input
                type="search"
                className="form-control"
                placeholder="Search specialties..."
                value={specialty}
                id="search_bar"
                onChange={(e) => setSpecialty(e.target.value)}
                onFocus={() => setSearchActive(true)}
                onBlur={() => setTimeout(() => setSearchActive(false), 200)}
              />
              {searchActive && (
                <ul className="specialty-dropdown list-group position-absolute w-100">
                  {specialties.map((spec, index) => (
                    <li key={index} className="list-group-item list-group-item-action"
                      onClick={() => { setSpecialty(spec); setSearchActive(false); }}>
                      {spec}
                    </li>
                  ))}
                </ul>
              )}
              <button type="button" id="button_bar" className="btn btn-primary mt-2" onClick={fetchDoctors}>
                Search
              </button>
            </form>
          </div>

          {/* ===== Doctors List ===== */}
          <div className="doctors-container row">
            {doctors.length > 0 ? (
              doctors.map((doctor, index) => (
                <div key={index} className="col-md-4 mb-4">
                  <div className="card doctor-card h-100">
                    <img src={doctor.image} alt={doctor.name} className="card-img-top doctor-image" />
                    <div className="card-body">
                      <h5 className="card-title">{doctor.name}</h5>
                      <p className="card-text">
                        <strong>Age:</strong> {doctor.age} <br />
                        <strong>Gender:</strong> {doctor.gender} <br />
                        <strong>Experience:</strong> {doctor.experience} years <br />
                        <strong>Patients Consulted:</strong> {doctor.patients_consulted}
                      </p>
                      <button className="btn btn-success" onClick={() => bookAppointment(doctor)}>
                        Book Appointment
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              specialty && <div className="col-12"><p className="text-center">No doctors found for {specialty}</p></div>
            )}
          </div>

          {/* ===== Cards Section ===== */}
          <div className="cards-container row my-4">
            <div className="col-md-4 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Explore Doctors</h5>
                  <p className="card-text">
                    Find specialists and schedule appointments easily.
                  </p>
                  <Link to="/explore-doctors" className="btn btn-primary">
                    Explore
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Order Medicines</h5>
                  <p className="card-text">
                    Get your medicines delivered to your doorstep.
                  </p>
                  <Link to="/order-medicines" className="btn btn-primary">
                    Order Now
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Upload Prescription</h5>
                  <p className="card-text">
                    Upload prescriptions for consultations or orders.
                  </p>
                  <Link to="/upload-prescription" className="btn btn-primary">
                    Upload
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* ===== Footer ===== */}
          <footer className="custom-footer text-center py-3">
            <p>© 2025 All rights reserved.</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;





