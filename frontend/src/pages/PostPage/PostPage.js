import { Container, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import GoBack from "../../components/common/GoBack/GoBack";
import GridLayout from "../../components/common/GridLayout/GridLayout";
import Navbar from "../../components/common/Navbar/Navbar";
import PostCard from "../../components/posts/PostCard/PostCard";
import { useParams } from "react-router-dom";
import { getPost } from "../../api/posts";
import Comments from "../../components/posts/Comments/Comments";
import ErrorAlert from "../../components/common/ErrorAlert/ErrorAlert";
import { isLoggedIn } from "../../helpers/authHelper";

const PostPage = () => {
  const params = useParams();

  const [post, setPost] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const user = isLoggedIn();

  const fetchPost = async () => {
    setLoading(true);
    const data = await getPost(params.id, user && user.token);
    if (data.error) {
      setError(data.error);
    } else {
      setPost(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPost();
  }, [params.id]);

  return (
    <Container>
      <Navbar />
      <GoBack />
      <GridLayout
        left={
          post ? (
            <Stack spacing={2}>
              <PostCard post={post} key={post._id} />

              <Comments />
            </Stack>
          ) : (
            error && <ErrorAlert error={error} />
          )
        }
      />
    </Container>
  );
};

export default PostPage;
