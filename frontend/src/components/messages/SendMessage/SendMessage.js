import React, { useState } from "react";
import "./SendMessage.css";

const SendMessage = (props) => {
  const [content, setContent] = useState("");

  const handleSendMessage = () => {
    props.onSendMessage(content);
    setContent("");
  };

  return (
    <div className="container">
      <input
        type="text"
        onChange={(e) => setContent(e.target.value)}
        placeholder="Send a message..."
        value={content}
        autoComplete="off"
        className="textField"
        onKeyPress={(e) => {
          if (e.key === "Enter" && content.length > 0) {
            handleSendMessage();
          }
        }}
      />
      <button
        onClick={handleSendMessage}
        disabled={content.length === 0}
        className="button"
      >
        Send
      </button>
    </div>
  );
};

export default SendMessage;
