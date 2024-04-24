import React from "react";
import { useNavigate } from "react-router-dom";
import  "./PostContentBox.css";

const PostContentBox = (props) => {
  const { clickable, post, editing } = props;
  const navigate = useNavigate();

  return (
    <>
      {clickable && !editing ? (
        <div
          className="post-content-box clickable"
          onClick={() => navigate("/posts/" + post._id)}
        >
          {props.children}
        </div>
      ) : (
        <div className="post-content-box">
          {props.children}
        </div>
      )}
    </>
  );
};

export default PostContentBox;
