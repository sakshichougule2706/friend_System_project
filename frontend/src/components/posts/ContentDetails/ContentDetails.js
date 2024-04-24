import React from "react";
import Moment from "react-moment";
import UserAvatar from "../../common/UserAvatar/UserAvatar";
import { Link } from "react-router-dom";
import "./ContentDetails.css"; // Import the CSS file for styling

const ContentDetails = ({ username, createdAt, edited, preview }) => {
  return (
    <div className="content-details-container">
      <UserAvatar width={30} height={30} username={username} />
      <span className="content-details-text">
        <Link
          className="username-link"
          onClick={(e) => {
            e.stopPropagation();
          }}
          to={"/users/" + username}
        >
          {username}
        </Link>
        {!preview && (
          <>
            {" "}
            · <Moment fromNow>{createdAt}</Moment>{" "}
            {edited && <span className="edited-text">(Edited)</span>}
          </>
        )}
      </span>
    </div>
  );
};

export default ContentDetails;
