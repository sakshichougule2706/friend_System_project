import React from "react";
import { useNavigate } from "react-router-dom";
import "./CreatePost.css"; // Import the CSS file for styling

const CreatePost = () => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate("/posts/create");
  };

  return (
    <button onClick={handleClick} className="create-post-button">
      <span> Create New Post</span>
    </button>
  );
};

export default CreatePost;
