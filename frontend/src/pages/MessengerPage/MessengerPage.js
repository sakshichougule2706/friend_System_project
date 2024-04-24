import React, { useEffect, useState } from "react";
import Messages from "../../components/messages/Messages/Messages";
import Navbar from "../../components/common/Navbar/Navbar";
import UserMessengerEntries from "../../components/messages/UserMessengerEntries/UserMessengerEntries";
import { getConversations } from "../../api/messages";
import { isLoggedIn } from "../../helpers/authHelper";
import { useLocation } from "react-router-dom";

const MessengerPage = () => {
  const [conservant, setConservant] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [width, setWindowWidth] = useState(0);
  const mobile = width < 800;
  const user = isLoggedIn();
  const { state } = useLocation();
  const newConservant = state && state.user;

  const getConversation = (conversations, conservantId) => {
    for (let i = 0; i < conversations.length; i++) {
      const conversation = conversations[i];
      if (conversation.recipient._id === conservantId) {
        return conversation;
      }
    }
  };

  const fetchConversations = async () => {
    let conversations = await getConversations(user);
    if (newConservant) {
      setConservant(newConservant);
      if (!getConversation(conversations, newConservant._id)) {
        const newConversation = {
          _id: newConservant._id,
          recipient: newConservant,
          new: true,
          messages: [],
        };
        conversations = [newConversation, ...conversations];
      }
    }
    setConversations(conversations);
    setLoading(false);
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  useEffect(() => {
    updateDimensions();

    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const updateDimensions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  };

  return (
    <div style={{ margin: "0 auto", maxWidth: "1200px" }}>
      <Navbar />
      <div style={{ padding: "0" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            height: "calc(100vh - 110px)",
          }}
        >
          {!mobile ? (
            <>
              <div
                style={{
                  borderRight: "1px solid #ccc",
                  flex: "0 0 50%",
                }}
              >
                <UserMessengerEntries
                  conservant={conservant}
                  conversations={conversations}
                  setConservant={setConservant}
                  loading={loading}
                />
              </div>

              <div style={{ flex: "0 0 50%" }}>
                <Messages
                  conservant={conservant}
                  conversations={conversations}
                  setConservant={setConservant}
                  setConversations={setConversations}
                  getConversation={getConversation}
                />
              </div>
            </>
          ) : !conservant ? (
            <div
              style={{
                borderRight: "1px solid #ccc",
              }}
            >
              <UserMessengerEntries
                conservant={conservant}
                conversations={conversations}
                setConservant={setConservant}
                loading={loading}
              />
              <div style={{ display: "none" }}>
                <Messages
                  conservant={conservant}
                  conversations={conversations}
                  setConservant={setConservant}
                  setConversations={setConversations}
                  getConversation={getConversation}
                />
              </div>
            </div>
          ) : (
            <div>
              <Messages
                conservant={conservant}
                conversations={conversations}
                setConservant={setConservant}
                setConversations={setConversations}
                getConversation={getConversation}
                mobile
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessengerPage;
