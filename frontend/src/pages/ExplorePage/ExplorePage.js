import React from "react";
import Navbar from "../../components/common/Navbar/Navbar";
import GridLayout from "../../components/common/GridLayout/GridLayout";
import PostBrowser from "../../components/posts/PostBrowser/PostBrowser";

const ExplorePage = () => {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 16px" }}>
      <Navbar />
      <GridLayout
        left={
          <div style={{ width: "100%", float: "center" }}>
            <PostBrowser createPost contentType="posts" />
          </div>
        }
      />
    </div>
  );
};

export default ExplorePage;
