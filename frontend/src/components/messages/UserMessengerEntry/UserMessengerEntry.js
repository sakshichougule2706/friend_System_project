import React from "react";
import UserAvatar from "../../common/UserAvatar/UserAvatar";

const UserMessengerEntry = (props) => {
  const recipient = props.conversation.recipient;
  const username = recipient.username;
  const selected =
    props.conservant && props.conservant.username === recipient.username;

  const handleClick = () => {
    props.setConservant(recipient);
  };

  return (
    <>
      <div
        onClick={handleClick}
        style={{
          display: "flex",
          alignItems: "center",
          padding: "8px",
          borderBottom: "1px solid  #1ABC9C", 
          backgroundColor: selected ? "#333" : "transparent",
          cursor: "pointer", 
        }}
      >
        <UserAvatar height={50} width={50} username={username} />
        <span
          style={{
            marginLeft: "20px",
            fontSize: "18px",
            color: selected ? "#f1f1f1" : "#cccccc", 
            display: "flex",
            alignItems: "center",
          }}
        >
          {username}
        </span>
      </div>
    </>
  );
};

export default UserMessengerEntry;
