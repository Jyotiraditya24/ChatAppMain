import React, { useMemo } from "react";
import Conversation from "./Conversation";
import useGetConversations from "../hooks/useGetConversations";
import { getRandomEmoji } from "../utils/generateEmoji";

const Conversations = () => {
  const { loading, conversations } = useGetConversations();

  const conversationEmojis = useMemo(() => {
    return conversations.reduce((acc, conv) => {
      acc[conv._id] = getRandomEmoji();
      return acc;
    }, {});
  }, [conversations]);

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conv, index) => (
        <Conversation
          key={conv._id}
          conversation={conv}
          emoji={conversationEmojis[conv._id]}
          // emoji={getRandomEmoji()}
          lastIdx={index === conversations.length - 1}
        />
      ))}
      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
    </div>
  );
};

export default Conversations;
