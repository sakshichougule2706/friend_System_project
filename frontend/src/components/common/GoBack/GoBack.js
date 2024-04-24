import React from "react";
import { Link } from "react-router-dom";
import "./GoBack.css"; // Import the CSS file for styling

const GoBack = () => {
  return (
    <div className="go-back-container">
      <p className="go-back-text">
        <Link to="/" className="go-back-link">
          &lt;&lt; Go back to posts
        </Link>
      </p>
    </div>
  );
};

export default GoBack;
