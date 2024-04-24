import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./UserEntry.css";

const UserEntry = ({ username, showSendButton, onSend, loggedInUser }) => {
  const [requestSent, setRequestSent] = useState(false);

  const getInitials = (username) => {
    const names = username.split(" ");
    const initials = names.map((name) => name.charAt(0).toUpperCase());
    return initials.join("");
  };

  const handleSendRequest = async () => {
    try {
      const response = await axios.post("/friendRequests", {
        sender: loggedInUser ? loggedInUser.username : null,
        recipient: username,
      });
  
      console.log("Friend request sent successfully:", response.data);
      setRequestSent(true);
      
      if (onSend) {
        onSend(username);
      }
    } catch (error) {
      console.error("Error sending friend request:", error.response?.data || error.message);
    }
  };

  return (
    <div className="listItem">
      <div className="avatar">
        {getInitials(username)}
      </div>
      <span>{username}</span>
      
      <Link to={`/users/${username}`} className="link">
        View
      </Link>
      {!requestSent && showSendButton && (
        <button className="button" onClick={handleSendRequest}>
          Send Friend Request
        </button>
      )}
      
      {requestSent && <span>Request Sent</span>}
    </div>
  );
};

export default UserEntry;
