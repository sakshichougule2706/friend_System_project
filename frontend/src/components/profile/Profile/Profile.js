import React, { useEffect, useState } from "react";
import { isLoggedIn } from "../../../helpers/authHelper";
import ContentUpdateEditor from "../../posts/ContentUpdateEditor/ContentUpdateEditor";
import Loading from "../../common/Loading/Loading";
import UserAvatar from "../../common/UserAvatar/UserAvatar";

import "./Profile.css"; // Import the CSS file

const Profile = (props) => {
    const [user, setUser] = useState(null);
    const currentUser = isLoggedIn();

    useEffect(() => {
        if (props.profile) {
            setUser(props.profile.user);
        }
    }, [props.profile]);

    return (
        <div className="profile">
            {user ? (
                <div className="profile-content">
                    <div className="avatar-section">
                        <UserAvatar width={150} height={150} username={user.username} />
                    </div>

                    <h2 className="username">{user.username}</h2>

                    {currentUser && (
                        <div className="action-buttons">
                            {user._id === currentUser.userId && (
                                <button
                                    onClick={props.handleEditing}
                                    className={props.editing ? "cancel-button" : "edit-button"}
                                >
                                    {props.editing ? "Cancel" : "Edit bio"}
                                </button>
                            )}

                            {user._id !== currentUser.userId && (
                                <button onClick={props.handleMessage} className="message-button">
                                    Message
                                </button>
                            )}
                        </div>
                    )}

                    <div className="stats">
                        <p>
                            <span className="stat-label">Likes:</span> {props.profile.posts.likeCount}
                        </p>
                        <p>
                            <span className="stat-label">Posts:</span> {props.profile.posts.count}
                        </p>
                    </div>

                    {props.editing && (
                        <div className="bio-section">
                            <ContentUpdateEditor
                                handleSubmit={props.handleSubmit}
                                originalContent={user.biography}
                                validate={props.validate}
                            />
                        </div>
                    )}

                    <div className="info-section">
                        <h3 className="section-title">Hobbies</h3>
                        {props.editing ? (
                            <ContentUpdateEditor
                                handleSubmit={props.handleSubmit}
                                originalContent={user.hobbies}
                                validate={props.validate}
                            />
                        ) : (
                            <p>{user.hobbies || "No hobbies listed"}</p>
                        )}
                    </div>

                    <div className="info-section">
                        <h3 className="section-title">Interests</h3>
                        {props.editing ? (
                            <ContentUpdateEditor
                                handleSubmit={props.handleSubmit}
                                originalContent={user.interest}
                                validate={props.validate}
                            />
                        ) : (
                            <p>{user.interest || "No interest listed"}</p>
                        )}
                    </div>

                    <div className="info-section">
                        <h3 className="section-title">Fav Quotes</h3>
                        {props.editing ? (
                            <ContentUpdateEditor
                                handleSubmit={props.handleSubmit}
                                originalContent={user.quotes}
                                validate={props.validate}
                            />
                        ) : (
                            <p>{user.quotes || "No quotes listed"}</p>
                        )}
                    </div>

                    <div className="info-section">
                        <h3 className="section-title">Birthdate</h3>
                        {props.editing ? (
                            <ContentUpdateEditor
                                handleSubmit={props.handleSubmit}
                                originalContent={user.birthdate}
                                validate={props.validate}
                            />
                        ) : (
                            <p>{user.birthdate || "No birthdate listed"}</p>
                        )}
                    </div>
                </div>
            ) : (
                <Loading label="Loading profile" />
            )}
        </div>
    );
};

export default Profile;
