import React, { useState, useEffect } from "react";
import "./EditProfile.css"; // Import the CSS file for styling

const EditProfile = () => {
  const [userId, setUserId] = useState("");
  const [formData, setFormData] = useState({
    favoriteQuotes: "",
    interests: "",
    hobbies: "",
  });
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    fetchUserId();
  }, []);

  const fetchUserId = async () => {
    try {
      const response = await fetch("/api/userId");
      if (response.ok) {
        const data = await response.json();
        setUserId(data.userId);
      } else {
        throw new Error("Failed to fetch userId");
      }
    } catch (error) {
      console.error(error.message);
      setFeedback("Error fetching user ID.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/profile/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setFeedback("Profile updated successfully.");
      } else {
        setFeedback("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setFeedback("Error updating profile.");
    }
  };

  return (
    <div className="edit-profile-container">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-input">
          <label>Favorite Quotes:</label>
          <input
            type="text"
            name="favoriteQuotes"
            value={formData.favoriteQuotes}
            onChange={handleChange}
          />
        </div>
        <div className="form-input">
          <label>Interests:</label>
          <input
            type="text"
            name="interests"
            value={formData.interests}
            onChange={handleChange}
          />
        </div>
        <div className="form-input">
          <label>Hobbies:</label>
          <input
            type="text"
            name="hobbies"
            value={formData.hobbies}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
      {feedback && (
        <p className={feedback.includes("successfully") ? "success-feedback" : "error-feedback"}>
          {feedback}
        </p>
      )}
    </div>
  );
};

export default EditProfile;
