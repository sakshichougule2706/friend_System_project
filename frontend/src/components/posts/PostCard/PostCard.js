import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deletePost, likePost, unlikePost, updatePost } from "../../../api/posts";
import { isLoggedIn } from "../../../helpers/authHelper";
import ContentDetails from "../../posts/ContentDetails/ContentDetails";
import PostContentBox from "../../posts/PostContentBox/PostContentBox";
import ContentUpdateEditor from "../../posts/ContentUpdateEditor/ContentUpdateEditor";

import "./postCard.css"; // Import the CSS file

const PostCard = (props) => {
  const { preview, removePost } = props;
  const postData = props.post;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = isLoggedIn();
  const isAuthor = user && user.username === postData?.poster?.username;

  const [editing, setEditing] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [post, setPost] = useState(postData);
  const [likeCount, setLikeCount] = useState(post?.likeCount || 0);
  const [commentCount, setCommentCount] = useState(post?.commentCount || 0);

  let maxHeight = null;
  if (preview === "primary") {
    maxHeight = 250;
  }

  if (!post) {
    return null;
  }

  const handleDeletePost = async (e) => {
    e.stopPropagation();

    if (!confirm) {
      setConfirm(true);
    } else {
      setLoading(true);
      await deletePost(post._id, isLoggedIn());
      setLoading(false);
      if (preview) {
        removePost(post);
      } else {
        navigate("/");
      }
    }
  };

  const handleEditPost = async (e) => {
    e.stopPropagation();

    setEditing(!editing);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const content = e.target.content.value;
    await updatePost(post._id, isLoggedIn(), { content });
    setPost({ ...post, content, edited: true });
    setEditing(false);
  };

  const handleLike = async (liked) => {
    if (liked) {
      setLikeCount(likeCount + 1);
      await likePost(post._id, user);
    } else {
      setLikeCount(likeCount - 1);
      await unlikePost(post._id, user);
    }
  };

  return (
    <div className="post-card">
      <div className={preview}>
        <div className="post-content-wrapper">
          <div className="poster-avatar"></div>

          <PostContentBox clickable={preview} post={post} editing={editing}>
            <div className="content-details-container">
              <ContentDetails
                username={post.poster?.username}
                createdAt={post.createdAt}
                edited={post.edited}
                preview={preview === "secondary"}
              />
              <div className="edit-delete-buttons">
                {user && (isAuthor || user.isAdmin) && preview !== "secondary" && (
                  <div className="edit-delete-buttons-container">
                    <button
                      disabled={loading}
                      onClick={handleEditPost}
                      className="edit-button"
                    >
                      Edit
                    </button>
                    <button
                      disabled={loading}
                      onClick={handleDeletePost}
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>

            <h2 className="post-title">{post.title}</h2>

            {preview !== "secondary" &&
              (editing ? (
                <ContentUpdateEditor
                  handleSubmit={handleSubmit}
                  originalContent={post.content}
                />
              ) : (
                <div
                  style={{ maxHeight: maxHeight }}
                  className="content"
                >
                  {post.content}
                </div>
              ))}

            <div className="post-metadata">
              <div className="like-count">
                <span className="metadata-label">Likes:</span>
                <span>{likeCount}</span>
              </div>
              <div className="comment-count">
                <span className="metadata-label">Comments:</span>
                <span>{commentCount}</span>
              </div>
            </div>
          </PostContentBox>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
