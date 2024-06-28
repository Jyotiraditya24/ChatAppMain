import React, { useMemo } from "react";
import { useConversationContext } from "../context/conversationContext";
import { useEffect } from "react";

const Conversation = ({ conversation, emoji, lastIdx }) => {
  const { selectConversation, updateSelectConversation } =useConversationContext();
  const isSelected = selectConversation?._id === conversation._id;
  const emote = useMemo(() => emoji, [emoji]);
  return (
    <>
      <div
        className={`flex flex-row gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer transition-all ${
          isSelected ? "bg-sky-400" : ""
        } `}
        onClick={() => updateSelectConversation(conversation)}
      >
        <div className="avatar online">
          <div className="w-12 rounded-full">
            <img src={conversation.profilePic} alt="user image" />
          </div>
        </div>
        <div className="flex flex-row flex-1 gap-3 justify-between">
          <p className="font-bold text-gray-200">{conversation.fullName}</p>
          <span className="text-xl">{emote}</span>
        </div>
      </div>
      {/* DIVIDER */}
      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};

export default Conversation;
