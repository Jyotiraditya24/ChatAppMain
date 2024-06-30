import React, { useEffect, useState, useRef } from "react";
import Message from "./Message";
import useConversation from "../../zustand/useConversation";
import toast from "react-hot-toast";
import MessageSkeleton from "../MessageSkeletons";
import useListenMessage from "../../hooks/useListenMessage";

const Messages = () => {
  const [loading, setLoading] = useState(false);
  useListenMessage(); 
  const { selectedConversation, messages, setMessages } = useConversation();
  const lastMessageRef = useRef(null);

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${window.location.origin}/api/messages/get/${selectedConversation._id}`,
          {
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch messages");
        }
        const data = await response.json();
        setMessages(data.messages);
      } catch (error) {
        toast.error(error.message);
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) {
      getMessages();
    }
  }, [selectedConversation?._id, setMessages]);

  useEffect(() => {
    if (!loading && messages.length > 0) {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [loading, messages]);

  console.log("MESSAGES HERE", messages )

  return (
    <div className="px-4 flex-1 overflow-auto">
      {loading ? (
        <div className="px-4 flex flex-col overflow-auto">
          {[...Array(3)].map((_, idx) => (
            <MessageSkeleton key={idx} />
          ))}
        </div>
      ) : messages.length > 0 ? (
        messages.map((message, i) => (
          <div key={i} ref={i === messages.length - 1 ? lastMessageRef : null}>
            <Message message={message} />
          </div>
        ))
      ) : (
        <p className="text-center">Send a message to start the conversation</p>
      )}
    </div>
  );
};

export default Messages;
