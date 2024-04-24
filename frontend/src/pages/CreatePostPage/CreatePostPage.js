import React from "react";
import GoBack from "../../components/common/GoBack/GoBack";
import Navbar from "../../components/common/Navbar/Navbar";
import PostEditor from "../../components/posts/PostEditor/PostEditor";

const CreatePostPage = () => {
    return (
        <div style={{
            margin: "auto",
            width: "100%",
            maxWidth: "1900px",
            padding: "20px",
            backgroundColor: "#1a1a1a",
            color: "#f0f0f0",
            borderRadius: "8px"
        }}>
            <Navbar style={{ marginBottom: "10px" }} />
            <GoBack style={{ marginBottom: "20px" }} />
            <div style={{
               
                justifyContent: "space-between",
                gap: "20px"
            }}>
                <div style={{  borderRadius: "8px", backgroundColor: "#333", padding: "20px" }}>
                <PostEditor />
                </div>
                <div style={{  borderRadius: "8px", backgroundColor: "#333", padding: "20px" }}>
                    
                </div>
            </div>
        </div>
    );
};

export default CreatePostPage;
