import React from "react";

const styles = {
  avatar: {
    height: "100%",
    width: "100%",
    backgroundColor: "#333",
    borderRadius: "50%",
    border: "3px solid #00aaff",
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center", 
    color: "#FFFFFF", 
    fontWeight: "bold", 
    fontSize: "24px", 
  },
};

const UserAvatar = ({ height, width, username }) => {
const getInitials = (username) => {
  if (!username) {
      return "";
  }


  const names = username.split(" ");
  const initials = names.map((name) => name.charAt(0).toUpperCase());
  return initials.join("");
};

  const initials = getInitials(username);

  return (
    <div style={{ height: `${height}px`, width: `${width}px`, overflow: "hidden", borderRadius: "50%" }}>
      <div style={styles.avatar}>
       
        {initials}
      </div>
    </div>
  );
};

export default UserAvatar;
