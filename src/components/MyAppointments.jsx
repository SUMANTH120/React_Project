import React, { useState, useEffect } from "react";
import "./MyAppointments.css"; // Import CSS file

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const userEmail = sessionStorage.getItem("userEmail"); // Get user email from session storage

  // Fetch user's appointments from MongoDB
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/appointments?userEmail=${userEmail}`);
        const data = await response.json();
        if (response.ok) {
          setAppointments(data);
        } else {
          console.error("Error fetching appointments:", data.message);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    if (userEmail) {
      fetchAppointments();
    }
  }, [userEmail]);

  // Function to select an available time slot and update MongoDB
  const selectTime = async (appointmentId, time) => {
    try {
      const response = await fetch(`http://localhost:5001/api/appointments/select-time/${appointmentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ selectedTime: time }),
      });

      const data = await response.json();
      if (response.ok) {
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment._id === appointmentId ? { ...appointment, selectedTime: time } : appointment
          )
        );
      } else {
        console.error("Error selecting time:", data.message);
      }
    } catch (error) {
      console.error("Error selecting time:", error);
    }
  };

  // Function to cancel an appointment
  const cancelAppointment = async (appointmentId) => {
    try {
      const response = await fetch(`http://localhost:5001/api/appointments/cancel/${appointmentId}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (response.ok) {
        setAppointments((prevAppointments) => prevAppointments.filter((appointment) => appointment._id !== appointmentId));
      } else {
        console.error("Error canceling appointment:", data.message);
      }
    } catch (error) {
      console.error("Error canceling appointment:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>My Appointments</h2>
      {appointments.length > 0 ? (
        appointments.map((appointment) => (
          <div key={appointment._id} className="card mb-3 appointment-card">
            <div className="card-body">
              <img src={appointment.image} alt={appointment.doctorName} className="doctor-image" />
              <h5 className="card-title">
                {appointment.doctorName} - {appointment.specialty}
              </h5>
              <p className="appointment-status">
                <strong>Status:</strong> {appointment.selectedTime ? `Scheduled at ${appointment.selectedTime}` : "Pending"}
              </p>

              {!appointment.selectedTime && (
                <div className="time-selection">
                  <h6>Select a Time:</h6>
                  {appointment.availableTimes && appointment.availableTimes.length > 0 ? (
                    appointment.availableTimes.map((time, i) => (
                      <button key={i} className="btn btn-outline-primary me-2 time-slot" onClick={() => selectTime(appointment._id, time)}>
                        {time}
                      </button>
                    ))
                  ) : (
                    <p>No available times.</p>
                  )}
                </div>
              )}

              {appointment.selectedTime && <button className="btn btn-success mt-2">Pay</button>}
              <button className="btn btn-danger mt-2 ms-2" onClick={() => cancelAppointment(appointment._id)}>
                Cancel Appointment
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No appointments booked yet.</p>
      )}
    </div>
  );
};

export default MyAppointments;
