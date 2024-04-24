import { Container, Stack, Typography } from "@mui/material";
import GridLayout from "../../components/common/GridLayout/GridLayout";
import Navbar from "../../components/common/Navbar/Navbar";
import PostBrowser from "../../components/posts/PostBrowser/PostBrowser";

const SearchPage = () => {
  return (
    <Container>
      <Navbar />
      <GridLayout
        left={
          <Stack spacing={2}>
            <PostBrowser createPost contentType="posts" />
          </Stack>
        }
  
      />
    </Container>
  );
};

export default SearchPage;
