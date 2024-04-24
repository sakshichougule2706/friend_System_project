import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createComment } from "../../../api/posts";
import { isLoggedIn } from "../../../helpers/authHelper";
import ErrorAlert from "../../common/ErrorAlert/ErrorAlert";
import "./CommentEditor.css"; // Import the CSS file for styling

const CommentEditor = ({ label, comment, addComment, setReplying }) => {
  const [formData, setFormData] = useState({
    content: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      ...formData,
      parentId: comment && comment._id,
    };

    setLoading(true);
    const data = await createComment(body, params, isLoggedIn());
    setLoading(false);

    if (data.error) {
      setError(data.error);
    } else {
      formData.content = "";
      setReplying && setReplying(false);
      addComment(data);
    }
  };

  const handleFocus = (e) => {
    !isLoggedIn() && navigate("/login");
  };

  return (
    <div className="comment-editor-container">
      <div className="comment-editor-content">
        <div className="comment-editor-header">
          <h5>{comment ? "Reply" : "Comment"}</h5>
        </div>

        <form onSubmit={handleSubmit}>
          <textarea
            className="comment-editor-textarea"
            placeholder={label}
            required
            name="content"
            onChange={handleChange}
            onFocus={handleFocus}
            value={formData.content}
          />

          <ErrorAlert error={error} />

          <button
            type="submit"
            disabled={loading}
            className="comment-editor-submit-button"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommentEditor;
