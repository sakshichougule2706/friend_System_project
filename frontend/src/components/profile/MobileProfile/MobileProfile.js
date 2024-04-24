import React, { useEffect, useState } from "react";
import ContentUpdateEditor from "../../posts/ContentUpdateEditor/ContentUpdateEditor";


import { isLoggedIn } from "../../../helpers/authHelper";

const MobileProfile = (props) => {
    const [user, setUser] = useState(null);
    const [editingBio, setEditingBio] = useState(false);
    const [editingHobbies, setEditingHobbies] = useState(false);
    const [editingInterest, setEditingInterest] = useState(false);
    const [editingQuotes, setEditingQuotes] = useState(false);
    const [editingBirthdate, setEditingBirthdate] = useState(false);
    const currentUser = isLoggedIn();

    useEffect(() => {
        if (props.profile) {
            setUser(props.profile.user);
        }
    }, [props.profile]);

    const handleBioEditing = () => {
        setEditingBio(!editingBio);
    };

    const handleHobbiesEditing = () => {
        setEditingHobbies(!editingHobbies);
    };

    const handleInterestEditing = () => {
        setEditingInterest(!editingInterest);
    };

    const handleQuotesEditing = () => {
        setEditingQuotes(!editingQuotes);
    };

    const handleBirthdateEditing = () => {
        setEditingBirthdate(!editingBirthdate);
    };

    const getInitials = (username) => {
        if (!username) {
            
            return "";
        }
        
        const names = username.split(" ");

        const initials = names.map((name) => name.charAt(0).toUpperCase());
    
        return initials.join("");
    };

    const handleUpdate = (e, fieldName) => {
        const content = e.target.content.value;
        if (fieldName === "bio") {
            props.handleBioSubmit(e, content);
        } else if (fieldName === "hobbies") {
            props.handleHobbiesSubmit(e, content);
        } else if (fieldName === "interest") {
            props.handleInterestSubmit(e, content);
        } else if (fieldName === "quotes") {
            props.handleQuotesSubmit(e, content);
        } else if (fieldName === "birthdate") {
            props.handleBirthdateSubmit(e, content);
        }
    };

    const nightThemeStyles = {
        container: {
            backgroundColor: "#2E2E2E",
            color: "#F5F5F5", 
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
            maxWidth: "600px",
            margin: "auto",
            fontFamily: "Arial, sans-serif"
        },
        header: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
            backgroundColor:"#1ABC9C",
            borderRadius:"5px",
            paddingRight:"20px",
            paddingLeft:"20px",
            paddingTop:"5px"
        },
       
        stats: {
            display: "flex",
            gap: "12px",
            marginTop: "8px",
        },
        button: {
            marginRight: "10px",
            padding: "8px 16px",
            backgroundColor: "#007BFF",
            color: "#F5F5F5",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
        },
        cancelButton: {
            backgroundColor: "#DC3545",
        },
        contentSection: {
            marginTop: "16px",
        },
        form: {
            display: "flex",
            flexDirection: "column",
        },
        avatar: {
            width: "60px", 
            height: "60px",
            marginRight: "10px", 
            backgroundColor: "#333", 
            color: "#fff", 
            borderRadius: "50%", 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center", 
            fontSize: "24px", 
            fontWeight: "bold", 
        },
    };

    return (
        <div style={nightThemeStyles.container}>
            {user ? (
                <div>
                    <div style={nightThemeStyles.header}>
                        <div>
                            <div style={nightThemeStyles.avatar}>
                                {getInitials(user.username)}
                            </div>
                            <p style={{ margin: 0, fontSize: "30px", fontWeight: "bold" }}>{user.username}</p>
                        </div>
                        <div style={nightThemeStyles.stats}>
                            <p>Likes: {props.profile.posts.likeCount}</p>
                            <p>Posts: {props.profile.posts.count}</p>
                            
                        </div>
                    </div>
                    <hr style={{ borderColor: "#3E3E3E" }} />
                    <div style={nightThemeStyles.contentSection}>
                        {currentUser && user._id === currentUser.userId && (
                            <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
                                <button
                                    style={{
                                        ...nightThemeStyles.button,
                                        backgroundColor: editingBio ? nightThemeStyles.cancelButton.backgroundColor : nightThemeStyles.button.backgroundColor,
                                    }}
                                    onClick={handleBioEditing}
                                >
                                    {editingBio ? "Cancel" : "Edit Bio"}
                                </button>
                                <button
                                    style={{
                                        ...nightThemeStyles.button,
                                        backgroundColor: editingHobbies ? nightThemeStyles.cancelButton.backgroundColor : nightThemeStyles.button.backgroundColor,
                                    }}
                                    onClick={handleHobbiesEditing}
                                >
                                    {editingHobbies ? "Cancel" : "Edit Hobbies"}
                                </button>
                                <button
                                    style={{
                                        ...nightThemeStyles.button,
                                        backgroundColor: editingInterest ? nightThemeStyles.cancelButton.backgroundColor : nightThemeStyles.button.backgroundColor,
                                    }}
                                    onClick={handleInterestEditing}
                                >
                                    {editingInterest ? "Cancel" : "Edit Interest"}
                                </button>
                                <button
                                    style={{
                                        ...nightThemeStyles.button,
                                        backgroundColor: editingQuotes ? nightThemeStyles.cancelButton.backgroundColor : nightThemeStyles.button.backgroundColor,
                                    }}
                                    onClick={handleQuotesEditing}
                                >
                                    {editingQuotes ? "Cancel" : "Edit Quotes"}
                                </button>
                                <button
                                    style={{
                                        ...nightThemeStyles.button,
                                        backgroundColor: editingBirthdate ? nightThemeStyles.cancelButton.backgroundColor : nightThemeStyles.button.backgroundColor,
                                    }}
                                    onClick={handleBirthdateEditing}
                                >
                                    {editingBirthdate ? "Cancel" : "Edit Birthdate"}
                                </button>
                            </div>
                        )}
                        {editingBio ? (
                            <div style={nightThemeStyles.form}>
                                <ContentUpdateEditor
                                    handleSubmit={(e) => handleUpdate(e, "bio")}
                                    originalContent={user.biography}
                                    validate={props.validate}
                                />
                            </div>
                        ) : (
                            <p style={{ margin: "0 0 8px 0" }}>Bio: {user.biography || "No bio yet"}</p>
                        )}
                        {editingHobbies ? (
                            <div style={nightThemeStyles.form}>
                                <ContentUpdateEditor
                                    handleSubmit={(e) => handleUpdate(e, "hobbies")}
                                    originalContent={user.hobbies}
                                    validate={props.validate}
                                />
                            </div>
                        ) : (
                            <p style={{ margin: "0 0 8px 0" }}>Hobbies: {user.hobbies || "No hobbies listed"}</p>
                        )}
                        {editingInterest ? (
                            <div style={nightThemeStyles.form}>
                                <ContentUpdateEditor
                                    handleSubmit={(e) => handleUpdate(e, "interest")}
                                    originalContent={user.interest}
                                    validate={props.validate}
                                />
                            </div>
                        ) : (
                            <p style={{ margin: "0 0 8px 0" }}>Interest: {user.interest || "No interest listed"}</p>
                        )}
                        {editingQuotes ? (
                            <div style={nightThemeStyles.form}>
                                <ContentUpdateEditor
                                    handleSubmit={(e) => handleUpdate(e, "quotes")}
                                    originalContent={user.quotes}
                                    validate={props.validate}
                                />
                            </div>
                        ) : (
                            <p style={{ margin: "0 0 8px 0" }}>Quotes: {user.quotes || "No quotes listed"}</p>
                        )}
                        {editingBirthdate ? (
                            <div style={nightThemeStyles.form}>
                                <ContentUpdateEditor
                                    handleSubmit={(e) => handleUpdate(e, "birthdate")}
                                    originalContent={user.birthdate}
                                    validate={props.validate}
                                />
                            </div>
                        ) : (
                            <p style={{ margin: "0 0 8px 0" }}>Birthdate: {user.birthdate || "No birthdate listed"}</p>
                        )}
                        {currentUser && user._id !== currentUser.userId && (
                   <div>
                <button onClick={props.handleMessage} style={{
                    padding: "8px 16px",
                    backgroundColor: "#1ABC9C",
                    color: "#F5F5F5",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    marginLeft:"220px"
                }}>Message</button>
                    </div>
            )}
                        
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default MobileProfile;
