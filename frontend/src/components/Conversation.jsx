import React from "react";
import useConversation from "../zustand/useConversation";
import { useSocketContext } from "../context/socketContext";

const Conversation = ({ conversation, emoji, lastIdx }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === conversation._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);

  return (
    <>
      <div
        className={`flex flex-row gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer transition-all *: ${
          isSelected ? "bg-sky-500" : ""
        }`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={conversation?.profilePic} alt="user image" />
          </div>
        </div>
        <div className="flex flex-row flex-1 gap-3 justify-between">
          <p className="font-bold text-gray-200">{conversation.fullName}</p>
          <span className="text-xl">{emoji}</span>
        </div>
      </div>
      {/* DIVIDER */}
      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};

export default Conversation;
