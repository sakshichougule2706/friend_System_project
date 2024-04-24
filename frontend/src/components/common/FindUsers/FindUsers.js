import React, { useEffect, useState } from "react";
import Loading from "../../common/Loading/Loading";
import UserEntry from "../../common/UserEntry/UserEntry";
import { getRandomUsers } from '../../../api/users';
import "./FindUsers.css"; // Import the CSS file for styling

const FindUsers = ({ loggedInUser }) => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState(null);
  const [sentRequests, setSentRequests] = useState([]);

  const fetchUsers = async () => {
    setLoading(true);
    const data = await getRandomUsers({ size: 5 });
    setLoading(false);
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleClick = () => {
    fetchUsers();
  };

  const handleSendRequest = (username) => {
    setTimeout(() => {
      console.log("Sent friend request to:", username);
      setSentRequests([...sentRequests, username]);
    }, 1000);
  };

  return (
    <div className="find-users-container">
      <div className="header">
        <div className="title">
          <span role="img" aria-label="wave" className="wave-emoji">🙋🏻</span>
          <h1>Find Others</h1>
        </div>
        <button
          onClick={handleClick}
          disabled={loading}
          className="refresh-button"
        >
          🔄
        </button>
      </div>

      <hr className="divider"/>

      {loading ? (
        <Loading />
      ) : (
        users &&
        users.map((user) => (
          <UserEntry
            key={user.username}
            username={user.username}
            showSendButton={!sentRequests.includes(user.username)}
            onSend={handleSendRequest}
            loggedInUser={loggedInUser}
          />
        ))
      )}
    </div>
  );
};

export default FindUsers;
