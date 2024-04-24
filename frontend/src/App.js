import "@mui/material";
import "react-icons";
import "react-icons/bi";
import "react-icons/md";
import "react-icons/bs";
import "react-router-dom";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import theme from "./theme";

import PostPage from "./pages/PostPage/PostPage";
import CreatePostPage from "./pages/CreatePostPage/CreatePostPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import ExplorePage from "./pages/ExplorePage/ExplorePage";
import PrivateRoute from "./components/common/PrivateRoute/PrivateRoute";
import SearchPage from "./pages/SearchPage/SearchPage";
import MessengerPage from "./pages/MessengerPage/MessengerPage";
import { initiateSocketConnection} from "./helpers/socketHelper";

function App() {
  initiateSocketConnection();

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<ExplorePage />} />
          <Route path="/posts/:id" element={<PostPage />} />
          <Route
            path="/posts/create"
            element={
              <PrivateRoute>
                <CreatePostPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/messenger"
            element={
              <PrivateRoute>
                <MessengerPage />
              </PrivateRoute>
            }
          />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/users/:id" element={<ProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
