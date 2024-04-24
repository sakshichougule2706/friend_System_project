import { Card, Container, Stack, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { getUser, updateUser } from "../../api/users";
import { isLoggedIn } from "../../helpers/authHelper";
import CommentBrowser from "../../components/posts/CommentBrowser/CommentBrowser";
import FindUsers from "../../components/common/FindUsers/FindUsers";
import GridLayout from "../../components/common/GridLayout/GridLayout";
import Loading from "../../components/common/Loading/Loading";
import MobileProfile from "../../components/profile/MobileProfile/MobileProfile";
import Navbar from "../../components/common/Navbar/Navbar";
import PostBrowser from "../../components/posts/PostBrowser/PostBrowser";
import Profile from "../../components/profile/Profile/Profile";


const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [tab, setTab] = useState("posts");
  const user = isLoggedIn();
  const [error, setError] = useState("");
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const fetchUser = async () => {
    setLoading(true);
    const data = await getUser(params);
    setLoading(false);
    if (data.error) {
      setError(data.error);
    } else {
      setProfile(data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const content = e.target.content.value;

    await updateUser(user, { biography: content });

    setProfile({ ...profile, user: { ...profile.user, biography: content } });
    setEditing(false);
  };

  const handleBioSubmit = async (e, content) => {
    e.preventDefault();

    await updateUser(user, { biography: content });

    setProfile({ ...profile, user: { ...profile.user, biography: content } });
  };

  const handleHobbiesSubmit = async (e, content) => {
    e.preventDefault();

    await updateUser(user, { hobbies: content });

    setProfile({ ...profile, user: { ...profile.user, hobbies: content } });
  };

  const handleInterestSubmit = async (e, content) => {
    e.preventDefault();

    await updateUser(user, { interest: content });

    setProfile({ ...profile, user: { ...profile.user, interest: content } });
  };

  const handleQuotesSubmit = async (e, content) => {
    e.preventDefault();

    await updateUser(user, { quotes: content });

    setProfile({ ...profile, user: { ...profile.user, quotes: content } });
  };

  const handleBirthdateSubmit = async (e, content) => {
    e.preventDefault();

    await updateUser(user, { birthdate: content });

    setProfile({ ...profile, user: { ...profile.user, birthdate: content } });
  };



  const handleEditing = () => {
    setEditing(!editing);
  };

  const handleMessage = () => {
    navigate("/messenger", { state: { user: profile.user } });
  };

  useEffect(() => {
    fetchUser();
  }, [location]);

  const validate = (content) => {
    let error = "";

    if (content.length > 250) {
      error = "Cannot be longer than 250 characters";
    }

    return error;
  };

  let tabs;
  if (profile) {
    tabs = {
      posts: (
        <PostBrowser
          profileUser={profile.user}
          contentType="posts"
          key="posts"
        />
      ),
      liked: (
        <PostBrowser
          profileUser={profile.user}
          contentType="liked"
          key="liked"
        />
      ),
      comments: <CommentBrowser profileUser={profile.user} />,
    };
  }

  return (
    <Container>
      <Navbar />

      <GridLayout
        left={
          <>
            <MobileProfile
              profile={profile}
              editing={editing}
              handleSubmit={handleSubmit}
              handleBioSubmit={handleBioSubmit}
              handleHobbiesSubmit={handleHobbiesSubmit}
              handleInterestSubmit={handleInterestSubmit}
              handleQuotesSubmit={handleQuotesSubmit}
              handleBirthdateSubmit={handleBirthdateSubmit}
              handleEditing={handleEditing}
              handleMessage={handleMessage}
              validate={validate}
            />
            
          </>
        }
        right={
          <Stack spacing={2}>
            {profile ? (
              <>
                <Profile
                  profile={profile}
                  editing={editing}
                  handleSubmit={handleSubmit}
                  handleEditing={handleEditing}
                  handleMessage={handleMessage}
                  validate={validate}
                />
                <div>
                  <h3>Hobbies</h3>
                  {profile.user.hobbies ? (
                    <p>{profile.user.hobbies}</p>
                  ) : (
                    <p>No hobbies listed</p>
                  )}
                </div>

                <div>
                  <h3>Interests</h3>
                  {profile.user.interest ? (
                    <p>{profile.user.interest}</p>
                  ) : (
                    <p>No interest listed</p>
                  )}
                </div>

                <div>
                  <h3>Fav Quotes</h3>
                  {profile.user.quotes ? (
                    <p>{profile.user.quotes}</p>
                  ) : (
                    <p>No quotes listed</p>
                  )}
                </div>

                <div>
                  <h3>Birthdate</h3>
                  {profile.user.birthdate ? (
                    <p>{profile.user.birthdate}</p>
                  ) : (
                    <p>No birthadte listed</p>
                  )}
                </div>
              </>
            ) : (
              <Loading />
            )}
            <FindUsers />
            
          </Stack>
        }
      />
    </Container>
  );
};

export default ProfilePage;
