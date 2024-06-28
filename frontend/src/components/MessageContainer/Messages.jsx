import React, { useEffect, useState } from "react";
import Message from "./Message";
import { useConversationContext } from "../../context/conversationContext";

const Messages = () => {
  const [loading, setLoading] = useState(false);
  const { selectConversation, messages, addMessage } = useConversationContext();

  useEffect(() => {
    setLoading(true);
    const getMessages = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/messages/get/${selectConversation?._id}`,
          {
            credentials: "include", // Include cookies
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch messages");
        }
        const data = await response.json();
        addMessage(data.message);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };
    if (selectConversation?._id) {
      getMessages();
    }
  }, [selectConversation?._id]);

  console.log(messages);

  return (
    <div className="px-4 flex-1 overflow-auto">
      <Message></Message>
      <Message></Message>
      <Message></Message>
      <Message></Message>
    </div>
  );
};

export default Messages;
