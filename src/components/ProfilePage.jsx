import { useState, useEffect } from "react";
import "./ProfilePage.css";

const ProfilePage = () => {
  const [email, setEmail] = useState(sessionStorage.getItem("userEmail") || "");
  const [profile, setProfile] = useState({
    name: "",
    fatherName: "",
    dateOfBirth: "",
    gender: "",
    otherDetails: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [timestamps, setTimestamps] = useState({ created_at: "", updated_at: "" });

  useEffect(() => {
    if (email) fetchProfile();
  }, [email]);

  const fetchProfile = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`http://localhost:3007/api/profile?email=${email}`);
      const data = await response.json();

      if (data.profile) {
        setProfile({
          name: data.profile.name || "",
          fatherName: data.profile.fatherName || "",
          dateOfBirth: data.profile.dateOfBirth || "",
          gender: data.profile.gender || "",
          otherDetails: data.profile.otherDetails || "",
        });
        setTimestamps({
          created_at: data.profile.created_at || "",
          updated_at: data.profile.updated_at || "",
        });
        setMessage("Profile data loaded.");
      } else {
        setMessage("No profile found. Please create one.");
      }
    } catch (error) {
      setMessage("Error fetching profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const submitProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:3007/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, ...profile }),
      });

      const data = await response.json();
      if (data.success) {
        setMessage("Profile saved successfully!");
        fetchProfile(); // Refresh data to get updated timestamps
      } else {
        setMessage("Error saving profile.");
      }
    } catch (error) {
      setMessage("Error saving profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <h2>User Profile</h2>

      {!email ? (
        <div className="no-profile">No email found! Please log in first.</div>
      ) : (
        <form onSubmit={submitProfile}>
          {message === "No profile found. Please create one." && (
            <div className="no-profile">
              No profile found! Please fill in your details and save.
            </div>
          )}

          <div className="form-group">
            <label>Email:</label>
            <input type="email" value={email} readOnly />
          </div>

          <div className="form-group">
            <label>Name:</label>
            <input type="text" name="name" value={profile.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Father's Name:</label>
            <input type="text" name="fatherName" value={profile.fatherName} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Date of Birth:</label>
            <input type="date" name="dateOfBirth" value={profile.dateOfBirth} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Gender:</label>
            <select name="gender" value={profile.gender} onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Other Details:</label>
            <textarea name="otherDetails" value={profile.otherDetails} onChange={handleChange}></textarea>
          </div>

          {timestamps.created_at && (
            <div className="timestamps">
              <p>Profile Created: {new Date(timestamps.created_at).toLocaleString()}</p>
              <p>Last Updated: {new Date(timestamps.updated_at).toLocaleString()}</p>
            </div>
          )}

          <button type="submit" disabled={loading}>{loading ? "Saving..." : "Save Profile"}</button>

          {message && <p className="message">{message}</p>}
        </form>
      )}
    </div>
  );
};

export default ProfilePage;
