import React from "react";
import "./ErrorAlert.css"; // Import the CSS file for styling

const ErrorAlert = ({ error }) => {
  return (
    error && (
      <div className="error-alert">
        {error}
      </div>
    )
  );
};

export default ErrorAlert;
