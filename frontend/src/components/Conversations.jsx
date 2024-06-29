import React from "react";
import Conversation from "./Conversation";
import useGetConversations from "../hooks/useGetConversations";
import { getRandomEmoji } from "../utils/generateEmoji";

const Conversations = () => {
  const { loading, conversations } = useGetConversations();

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation, i) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          lastIdx={i === conversations.length - 1}
        />
      ))}
    </div>
  );
};

export default Conversations;
