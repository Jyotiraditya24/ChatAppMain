import React, { useEffect, useState } from "react";
import Message from "./Message";
import useConversation from "../../zustand/useConversation";
import toast from "react-hot-toast";
import MessageSkeleton from "../MessageSkeletons";

const Messages = () => {
  const [loading, setLoading] = useState(false);
  const { selectedConversation, messages, setMessages } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3001/api/messages/get/${selectedConversation._id}`,
          {
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch messages");
        }
        const data = await response.json();
        console.log("Data", data);
        setMessages(data.messages);
      } catch (error) {
        toast.error(error.message);
        setMessages([]);
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) {
      getMessages();
    }
  }, [selectedConversation?._id, setMessages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        messages.length > 0 &&
        messages?.map((message, i) => <Message key={i} message={message} />)}
      {loading ? (
        <div className="px-4 flex flex-col overflow-auto">
          {[...Array(3)].map((_, idx) => (
            <MessageSkeleton key={idx} />
          ))}
        </div>
      ) : (
        !loading &&
        messages.length === 0 && (
          <p className="text-center">
            Send a message to start the conversation
          </p>
        )
      )}
    </div>
  );
};

export default Messages;
