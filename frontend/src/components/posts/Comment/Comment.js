import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn } from "../../../helpers/authHelper";
import CommentEditor from "../../posts/CommentEditor/CommentEditor";
import ContentDetails from "../../posts/ContentDetails/ContentDetails";
import HorizontalStack from "../../../util/HorizontalStack";
import { deleteComment, updateComment } from "../../../api/posts";
import Moment from "react-moment";
import "./Comment.css"; // Import the CSS file for styling

const Comment = (props) => {
  const { depth, addComment, removeComment, editComment } = props;
  const commentData = props.comment;
  const [minimised, setMinimised] = useState(depth % 4 === 3);
  const [replying, setReplying] = useState(false);
  const [editing, setEditing] = useState(false);
  const [comment, setComment] = useState(commentData);
  const user = isLoggedIn();
  const isAuthor = user && user.userId === comment.commenter._id;
  const navigate = useNavigate();

  const handleSetReplying = () => {
    if (isLoggedIn()) {
      setReplying(!replying);
    } else {
      navigate("/login");
    }
  };

  const handleDelete = async () => {
    await deleteComment(comment._id, user);
    removeComment(comment);
  };

  // Style 
  let style = {
    backgroundColor: "#1C2833",
    borderRadius: "4px",
    marginBottom: "16px",
    padding: "8px",
    color: "#ECF0F1"
  };

  if (depth % 2 === 1) {
    style.backgroundColor = "#34495E";
  }

  return (
    <div style={style}>
      <div style={{ paddingLeft: "8px", paddingTop: "4px", paddingBottom: "4px" }}>
        {props.profile ? (
          <div>
            <div>
              <Link style={{ textDecoration: "none", color: "#1ABC9C" }} to={"/posts/" + comment.post._id}>
                {comment.post.title}
              </Link>
            </div>
            <div style={{ fontSize: "0.875rem", color: "#ECF0F1", marginBottom: "4px" }}>
              <Moment fromNow>{comment.createdAt}</Moment>{" "}
              {comment.edited && <>(Edited)</>}
            </div>
          </div>
        ) : (
          <HorizontalStack justifyContent="space-between">
            <ContentDetails
              username={comment.commenter.username}
              createdAt={comment.createdAt}
              edited={comment.edited}
            />
          </HorizontalStack>
        )}

        {/* Display comment text */}
        <div>
          <p>{comment.text}</p>
        </div>

        {/* Display comment text, author, and creation date */}
        <div>
          <p>Author: {comment.commenter.username}</p>
          <p>Commented On : <Moment format="YYYY-MM-DD HH:mm">{comment.createdAt}</Moment></p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
