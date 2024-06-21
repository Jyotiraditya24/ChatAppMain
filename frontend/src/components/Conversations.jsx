import React, { useEffect, useState } from "react";
import Conversation from "./Conversation";
import { getRandomEmoji } from "../utils/generateEmoji";
import toast from "react-hot-toast";

const Conversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const response = await fetch("api/users/getAllUsers");
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setConversations(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []); // Empty dependency array, runs once on mount
  console.log(conversations);
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation) => (
        <Conversation
          key={conversation._id} // Assuming _id is a unique identifier
          conversation={conversation}
          emoji={getRandomEmoji()}
          lastIndex={
            conversations.length - 1 === conversations.indexOf(conversation)
          }
        />
      ))}
      {loading && <span className="loading loading-spinner mx-auto"></span>}
    </div>
  );
};

export default Conversations;
