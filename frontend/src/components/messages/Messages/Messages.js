// Messages.js
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getMessages, sendMessage } from "../../../api/messages";
import { isLoggedIn } from "../../../helpers/authHelper";
import { socket } from "../../../helpers/socketHelper";
import Loading from "../../common/Loading/Loading";
import Message from "../../messages/Message/Message";
import SendMessage from "../../messages/SendMessage/SendMessage";
import UserAvatar from "../../common/UserAvatar/UserAvatar";
import "./Messages.css"; // Importing CSS file

const Messages = ({ conservant, conversations, getConversation, setConversations, mobile, setConservant }) => {
  const messagesEndRef = useRef(null);
  const user = isLoggedIn();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const conversation = getConversation(conversations, conservant?._id);

  const fetchMessages = async () => {
    if (!conversation) return;

    if (conversation.new) {
      setLoading(false);
      setMessages(conversation.messages);
      return;
    }

    setLoading(true);
    const data = await getMessages(user, conversation._id);

    if (data && !data.error) {
      setDirection(data);
      setMessages(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (conservant) fetchMessages();
  }, [conservant]);

  useEffect(() => {
    if (messages) {
      scrollToBottom();
    }
  }, [messages]);

  useEffect(() => {
    const handleReceiveMessage = (senderId, username, content) => {
      const newMessage = { direction: "to", content };
      const conversation = getConversation(conversations, senderId);

      if (conversation) {
        const newMessages = [newMessage, ...conversation.messages];
        conversation.messages = newMessages;
        conversation.lastMessageAt = Date.now();
        const updatedConversations = [conversation, ...conversations.filter(c => c._id !== conversation._id)];
        setConversations(updatedConversations);
      } else {
        const newConversation = {
          _id: senderId,
          recipient: { _id: senderId, username },
          new: true,
          messages: [newMessage],
          lastMessageAt: Date.now(),
        };
        setConversations([newConversation, ...conversations]);
      }
    };

    socket.on("receive-message", handleReceiveMessage);

    return () => {
      socket.off("receive-message", handleReceiveMessage);
    };
  }, [conversations, getConversation, setConversations]);

  const setDirection = (messages) => {
    messages.forEach((message) => {
      message.direction = message.sender._id === user.userId ? "from" : "to";
    });
  };

  const handleSendMessage = async (content) => {
    const newMessage = { direction: "from", content };
    const updatedMessages = [newMessage, ...messages];
    setMessages(updatedMessages);

    const recipientId = conservant._id;
    await sendMessage(user, newMessage, recipientId);

    socket.emit("send-message", recipientId, user.username, content);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return conservant ? (
    <>
      {loading ? (
        <div className="loading-container">
          <Loading />
        </div>
      ) : (
        <>
          <div className="header-container">
            {mobile && (
              <button
                onClick={() => setConservant(null)}
                className="back-button"
              >
                {"<"}
              </button>
            )}
            <UserAvatar username={conservant.username} height={50} width={50} />
            <span className="username">
              <Link to={`/users/${conservant.username}`}>
                <b>{conservant.username}</b>
              </Link>
            </span>
          </div>
          <hr />
          <div className="messages-container">
            <div className="messages-content" ref={messagesEndRef}>
              {messages.map((message, i) => (
                <Message
                  conservant={conservant}
                  message={message}
                  key={i}
                />
              ))}
            </div>
          </div>
          <SendMessage onSendMessage={handleSendMessage} />
          {scrollToBottom()}
        </>
      )}
    </>
  ) : (
    <div className="default-view">
      <span className="app-name"><b>BubbyVibes</b></span>
      <span className="instructions">Say Something To Your Friends</span>
    </div>
  );
};

export default Messages;
