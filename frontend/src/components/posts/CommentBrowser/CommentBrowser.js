import React, { useEffect, useState } from "react";
import { getUserComments } from "../../../api/posts";
import Comment from "../../posts/Comment/Comment";
import Loading from "../../common/Loading/Loading";
import "./CommentBrowser.css"; // Import the CSS file for styling

const CommentBrowser = (props) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [sortBy, setSortBy] = useState("-createdAt");

  const fetchComments = async () => {
    setLoading(true);

    const newPage = page + 1;
    setPage(newPage);

    let comments = await getUserComments({
      id: props.profileUser._id,
      query: { sortBy },
    });

    setComments(comments);
    setLoading(false);
  };

  useEffect(() => {
    fetchComments();
  }, [sortBy]);

  const handleSortBy = (e) => {
    const newSortName = e.target.value;
    let newSortBy;

    Object.keys(sorts).forEach((sortName) => {
      if (sorts[sortName] === newSortName) newSortBy = sortName;
    });

    setComments([]);
    setPage(0);
    setSortBy(newSortBy);
  };

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const sorts = {
    "-createdAt": "Latest",
    createdAt: "Earliest",
  };

  return (
    <div className="comment-browser-container">
      <select
        onChange={handleSortBy}
        value={sorts[sortBy]}
        className="sort-select"
      >
        {Object.values(sorts).map((sort) => (
          <option key={sort} value={sort}>
            {sort}
          </option>
        ))}
      </select>
      {loading ? (
        <Loading />
      ) : (
        <>
          {comments &&
            comments.map((comment) => (
              <Comment key={comment._id} comment={comment} profile />
            ))}

          <div className="end-message">
            <h5 className="end-message-text">
              {comments.length > 0 ? (
                <>All comments have been viewed</>
              ) : (
                <>No comments available</>
              )}
            </h5>
            <button
              onClick={handleBackToTop}
              className="back-to-top-button"
            >
              Back to top
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CommentBrowser;
