import React, { useState } from "react";
import "./ContentSelect.css"; // Import the CSS file for styling

const ContentSelect = () => {
  const [content, setContent] = useState("post");

  return (
    <div className="content-select-container">
      <span className="content-select-label">Content:</span>
      <select
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="content-select-dropdown"
      >
        <option value={"post"}>Posts</option>
        <option value={"comment"}>Comments</option>
      </select>
    </div>
  );
};

export default ContentSelect;
