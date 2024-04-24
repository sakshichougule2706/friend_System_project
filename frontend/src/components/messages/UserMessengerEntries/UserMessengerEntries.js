import React from "react";
import Loading from "../../common/Loading/Loading";
import UserMessengerEntry from "../../messages/UserMessengerEntry/UserMessengerEntry";

const UserMessengerEntries = (props) => {
  return !props.loading ? (
    <>
      {props.conversations.length > 0 ? (
        <div style={{ background: "#1a1a2e", marginLeft:"20px",marginBottom:"20px",borderRadius:"20px", }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "0 8px",
              height: "60px",
              background: "#22223b", 
              color: "#f1f1f1", 
            }}
          >
            <div style={{marginTop:"20px",marginLeft:"25px"}}>
              <b style={{ marginLeft: "90px", color: "#1ABC9C", fontSize: "30px" }}>
                Your Conversations
              </b>
            </div>
          </div>
          <hr style={{ border: "none", borderBottom: "1px solid #444" }} />
          <div style={{ height: "calc(100vh - 171px)", overflowY: "auto" }}>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                background: "#2a2a4b",
                borderRadius: "8px",
                marginBottom:"20px" 
              }}
            >
              {props.conversations.map((conversation) => (
                <UserMessengerEntry
                  conservant={props.conservant}
                  conversation={conversation}
                  key={conversation.recipient.username}
                  setConservant={props.setConservant}
                />
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            color: "#f1f1f1",
            background :"#2C3E50",
          
          }}
        >
          <div style={{ fontSize: "1.5rem", marginTop: "1rem" }}>
            No Conversations
          </div>
          <div style={{ color: "#888", maxWidth: "70%", textAlign: "center" }}>
            Click 'Message' on another user's profile to start a conversation
          </div>
        </div>
      )}
    </>
  ) : (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        color: "#f1f1f1", // Light text color
      }}
    >
      <Loading />
    </div>
  );
};

export default UserMessengerEntries;
