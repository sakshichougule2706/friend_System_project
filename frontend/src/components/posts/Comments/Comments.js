import React, { useEffect, useState } from "react";
import Comment from "../../posts/Comment/Comment";
import Loading from "../../common/Loading/Loading";
import { getComments } from "../../../api/posts";
import { useParams } from "react-router-dom";
import CommentEditor from "../../posts/CommentEditor/CommentEditor";
import "./Comments.css"; // Import the CSS file for styling

const Comments = () => {
  const [comments, setComments] = useState(null);
  const [rerender, setRerender] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const params = useParams();

  const fetchComments = async () => {
    setLoading(true);
    const data = await getComments(params);
    if (data.error) {
      setError("Failed to fetch comments");
    } else {
      setComments(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const findComment = (id) => {
    let commentToFind;

    const recurse = (comment, id) => {
      if (comment._id === id) {
        commentToFind = comment;
      } else {
        for (let i = 0; i < comment.children.length; i++) {
          const commentToSearch = comment.children[i];
          recurse(commentToSearch, id);
        }
      }
    };

    for (let i = 0; i < comments.length; i++) {
      const comment = comments[i];
      recurse(comment, id);
    }

    return commentToFind;
  };

  const removeComment = (removedComment) => {
    if (removedComment.parent) {
      const parentComment = findComment(removedComment.parent);
      parentComment.children = parentComment.children.filter(
        (comment) => comment._id !== removedComment._id
      );
      setRerender(!rerender);
    } else {
      setComments(
        comments.filter((comment) => comment._id !== removedComment._id)
      );
    }
  };

  const editComment = (editedComment) => {
    if (editedComment.parent) {
      let parentComment = findComment(editedComment.parent);
      for (let i = 0; i < parentComment.children.length; i++) {
        if (parentComment.children[i]._id === editedComment._id) {
          parentComment.children[i] = editedComment;
        }
      }
    } else {
      for (let i = 0; i < comments.length; i++) {
        if (comments[i]._id === editedComment._id) {
          comments[i] = editedComment;
        }
      }
      setRerender(!rerender);
    }
  };

  const addComment = (comment) => {
    if (comment.parent) {
      const parentComment = findComment(comment.parent);
      parentComment.children = [comment, ...parentComment.children];

      setRerender(!rerender);
    } else {
      setComments([comment, ...comments]);
    }
  };

  return comments ? (
    <div className="comments-container">
      <CommentEditor
        addComment={addComment}
        label="Share your thoughts..."
      />

      {comments.length > 0 ? (
        <div>
          {comments.map((comment, i) => (
            <Comment
              addComment={addComment}
              removeComment={removeComment}
              editComment={editComment}
              comment={comment}
              key={comment._id}
              depth={0}
              className="comment"
            />
          ))}
          {loading && <Loading label="Loading more comments..." />}
        </div>
      ) : (
        <div className="no-comments">
          <h5>No comments yet...</h5>
          <p>Be the first one to comment!</p>
        </div>
      )}
    </div>
  ) : (
    <Loading label="Loading comments" />
  );
};

export default Comments;
