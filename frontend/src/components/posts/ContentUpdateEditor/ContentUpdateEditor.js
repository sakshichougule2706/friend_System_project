import React, { useState } from "react";
import "./ContentUpdateEditor.css"; // Import the CSS file for styling

const ContentUpdateEditor = (props) => {
  const [content, setContent] = useState(props.originalContent || "");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const content = e.target.content.value;
    let error = "";
    if (props.validate) {
      error = props.validate(content);
    }
    if (error && error.length !== 0) {
      setError(error);
    } else {
      props.handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="content-update-editor-form">
      <div>
        <textarea
          value={content}
          onChange={handleChange}
          className="content-update-editor-textarea"
          name="content"
          rows={4}
        />
        {error && <p className="content-update-editor-error">{error}</p>}
      </div>
      <button type="submit" className="content-update-editor-button">
        Update
      </button>
    </form>
  );
};

export default ContentUpdateEditor;
