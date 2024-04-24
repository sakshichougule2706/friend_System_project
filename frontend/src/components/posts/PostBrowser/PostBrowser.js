import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getPosts, getUserLikedPosts } from "../../../api/posts";
import { isLoggedIn } from "../../../helpers/authHelper";
import CreatePost from "../../posts/CreatePost/CreatePost";
import Loading from "../../common/Loading/Loading";
import PostCard from "../../posts/PostCard/PostCard";
import HorizontalStack from "../../../util/HorizontalStack";

import "./PostBrowser.css"; // Import the CSS file

const PostBrowser = (props) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [end, setEnd] = useState(false);
  const [sortBy, setSortBy] = useState("-createdAt");
  const [count, setCount] = useState(0);
  const user = isLoggedIn();

  const [search] = useSearchParams();
  const [effect, setEffect] = useState(false);

  const searchExists =
    search && search.get("search") && search.get("search").length > 0;

  const fetchPosts = async () => {
    setLoading(true);
    const newPage = page + 1;
    setPage(newPage);

    let query = {
      page: newPage,
      sortBy,
    };

    let data;

    if (props.contentType === "posts") {
      if (props.profileUser) query.author = props.profileUser.username;
      if (searchExists) query.search = search.get("search");

      data = await getPosts(user && user.token, query);
    } else if (props.contentType === "liked") {
      data = await getUserLikedPosts(
        props.profileUser._id,
        user && user.token,
        query
      );
    }

    if (data.data.length < 10) {
      setEnd(true);
    }

    setLoading(false);
    if (!data.error) {
      setPosts([...posts, ...data.data]);
      setCount(data.count);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [sortBy, effect]);

  useEffect(() => {
    setPosts([]);
    setPage(0);
    setEnd(false);
    setEffect(!effect);
  }, [search]);

  const handleSortBy = (e) => {
    const newSortName = e.target.value;
    let newSortBy;

    Object.keys(sorts).forEach((sortName) => {
      if (sorts[sortName] === newSortName) newSortBy = sortName;
    });

    setPosts([]);
    setPage(0);
    setEnd(false);
    setSortBy(newSortBy);
  };

  const removePost = (removedPost) => {
    setPosts(posts.filter((post) => post._id !== removedPost._id));
  };

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const contentTypeSorts = {
    posts: {
      "-createdAt": "Latest",
      "-likeCount": "Likes",
      "-commentCount": "Comments",
      createdAt: "Earliest",
    },
    liked: {
      "-createdAt": "Latest",
      createdAt: "Earliest",
    },
  };

  const sorts = contentTypeSorts[props.contentType];

  return (
    <div className="post-browser-container">
      <div className="post-browser-header">
        <HorizontalStack justifyContent="space-between" alignItems="center">
          {props.createPost && <CreatePost />}
        </HorizontalStack>
      </div>

      {searchExists && (
        <div className="search-results">
          <h2>Showing results for "{search.get("search")}"</h2>
          <p>{count} results found</p>
        </div>
      )}

      <div className="post-list">
        {posts.map((post) => (
          <PostCard
            preview="primary"
            key={post._id}
            post={post}
            removePost={removePost}
          />
        ))}
      </div>

      {loading && <Loading />}

      {end ? (
        <div className="load-more">
          <h3>
            {posts.length > 0 ? (
              <>All posts have been viewed</>
            ) : (
              <>No posts available</>
            )}
          </h3>
          <button onClick={handleBackToTop}>Back to top</button>
        </div>
      ) : (
        !loading &&
        posts &&
        posts.length > 0 && (
          <div className="load-more">
            <button onClick={fetchPosts}>Load more</button>
            <button onClick={handleBackToTop}>Back to top</button>
          </div>
        )
      )}
    </div>
  );
};

export default PostBrowser;
