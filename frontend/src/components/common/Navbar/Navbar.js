import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { isLoggedIn, logoutUser } from "../../../helpers/authHelper";
import UserAvatar from "../../common/UserAvatar/UserAvatar";
import FindUsers from "../../common/FindUsers/FindUsers";
import EditProfile from "../../profile/EditProfile/EditProfile";

import "./Navbar.css"; // Import the CSS file

const Navbar = () => {
  const navigate = useNavigate();
  const user = isLoggedIn();
  const username = user ? user.username : null;

  const [search, setSearch] = useState("");
  const [searchIcon, setSearchIcon] = useState(false);
  const [width, setWindowWidth] = useState(window.innerWidth);
  const [showFindUsers, setShowFindUsers] = useState(false);
  const [friendRequests, setFriendRequests] = useState([]);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showFriendRequests, setShowFriendRequests] = useState(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetchFriendRequests();
  }, []);

  const fetchFriendRequests = async () => {
    try {
      const response = await axios.get("/friendRequests");
      setFriendRequests(response.data);
    } catch (error) {
      console.error("Error fetching friend requests:", error);
    }
  };

  const acceptFriendRequest = async (requestId) => {
    try {
      await axios.post(`/friendRequests/accept/${requestId}`);
      fetchFriendRequests();
    } catch (error) {
      console.error("Error accepting friend request:", error);
    }
  };

  const declineFriendRequest = async (requestId) => {
    try {
      await axios.post(`/friendRequests/decline/${requestId}`);
      fetchFriendRequests();
    } catch (error) {
      console.error("Error declining friend request:", error);
    }
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  const handleChange = (e) => setSearch(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/search?" + new URLSearchParams({ search }));
  };

  const handleSearchIcon = () => setSearchIcon(!searchIcon);

  const toggleFindUsers = () => setShowFindUsers(!showFindUsers);

  return (
    <div className="navbar-container">
      <div className="navbar-content">
        <h4 className="navbar-brand">BUDDYVIBES 🤝</h4>

        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            placeholder="Search for posts..."
            className="search-input"
            onChange={handleChange}
            value={search}
          />
        </form>

        <div className="navbar-buttons">
          <button onClick={toggleFindUsers} className="navbar-button">
            Find Users 🫂
          </button>

          <Link to="/messenger" className="navbar-button">
            Message
          </Link>

          <button
            onClick={() => setShowFriendRequests(!showFriendRequests)}
            className="navbar-button"
          >
            {showFriendRequests ? "Hide Requests" : "Show Requests"}
          </button>

          <button onClick={handleLogout} className="navbar-button">
            Logout
          </button>
          {username && (
            <Link to={`/users/${username}`} className="avatar-link">
              <UserAvatar width={30} height={30} username={username} />
            </Link>
          )}
        </div>
      </div>

      {showEditProfile && <EditProfile />}
      {showFindUsers && <FindUsers loggedInUser={user} />}
    </div>
  );
};

export default Navbar;
