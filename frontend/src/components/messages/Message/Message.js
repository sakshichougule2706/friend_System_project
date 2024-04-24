// Message.js
import React from "react";
import UserAvatar from "../../common/UserAvatar/UserAvatar";
import "./Message.css"; // Importing CSS file

const Message = ({ conservant, message }) => {
  const { direction, content } = message;
  const username = conservant.username;

  const justifyContent = direction === "from" ? "flex-end" : "flex-start";

  return (
    <div
      className="message-container"
      style={{
        justifyContent: justifyContent,
      }}
    >
      {direction === "to" && (
        <UserAvatar
          username={username}
          height={50}
          width={50}
          style={{ borderRadius: "50%" }}
        />
      )}
      <div className={direction === "from" ? "outgoing-message" : "incoming-message"}>
        {content}
      </div>
    </div>
  );
};

export default Message;
