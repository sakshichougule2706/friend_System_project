import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../../api/posts";
import { isLoggedIn } from "../../../helpers/authHelper";
import HorizontalStack from "../../../util/HorizontalStack";
import UserAvatar from "../../common/UserAvatar/UserAvatar";

import "./PostEditor.css"; // Import the CSS file

const PostEditor = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ title: "", content: "" });
    const [serverError, setServerError] = useState("");
    const user = isLoggedIn();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = await createPost(formData, isLoggedIn());
        setLoading(false);
        if (data && data.error) {
            setServerError(data.error);
        } else {
            navigate("/posts/" + data._id);
        }
    };

    return (
        <div className="post-editor">
            {user && (
                <HorizontalStack spacing={2}>
                    <UserAvatar width={50} height={50} username={user.username} />
                    <h5 style={{ fontWeight: "bold" }}>
                        What would you like to post today, {user.username}?
                    </h5>
                </HorizontalStack>
            )}

            <form onSubmit={handleSubmit} className="post-form">
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="content">Content</label>
                    <textarea
                        id="content"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        rows={10}
                        required
                    />
                </div>

                {serverError && (
                    <p className="error-message">
                        {serverError}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="submit-button"
                >
                    {loading ? "Submitting..." : "Submit"}
                </button>
            </form>
        </div>
    );
};

export default PostEditor;
