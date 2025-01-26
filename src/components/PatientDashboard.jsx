import React from "react";
import SearchBar from "./SearchBar";
import QuickActionCard from "./QuickActionCard";
import Footer from "./Footer";
import "./PatientDashboard.css";

const PatientDashboard = () => {
  return (
    <div className="dashboard-container">
      <SearchBar />
      <div className="quick-actions">
        <QuickActionCard
          title="Instant Video Consultation"
          description="Connect within 60 seconds"
          link="/video-consultation"
        />
        <QuickActionCard
          title="Find Doctors Near You"
          description="Confirmed appointments with nearby doctors"
          link="/find-doctors"
        />
        <QuickActionCard
          title="Order Medicines Online"
          description="Delivered to your doorstep"
          link="/order-medicines"
        />
        <QuickActionCard
          title="Upload Prescription"
          description="For consultations or medicine orders"
          link="/upload-prescription"
        />
      </div>
      <Footer />
    </div>
  );
};

export default PatientDashboard;
