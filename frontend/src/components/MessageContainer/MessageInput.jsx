import React, { useState } from "react";
import { BsSend } from "react-icons/bs";
import toast from "react-hot-toast";
import useConversation from "../../zustand/useConversation";

const MessageInput = () => {
  const [message, setMessage] = useState(""); // Define the message state
  const [loading, setLoading] = useState(false);
  const { selectedConversation, setMessages, messages } = useConversation();

  const sendMessage = async (messageText) => {
    // if (!selectedConversation?._id) {
    //   toast.error("No conversation selected");
    //   return;
    // }
    setLoading(true);
    try {
      const response = await fetch(
        `${window.location.origin}/api/messages/send/${selectedConversation._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ message: messageText }),
        }
      );
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setMessages([...messages, data.payloadBACKEND]); // Update messages state correctly
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() === "") return; // Prevent sending empty messages
    sendMessage(message);
    setMessage("");
  };

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm rounded-lg block p-2.5 bg-gray-700 border-gray-600 text-white w-full pr-10"
          placeholder="Send a Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="absolute inset-y-0 right-0 flex items-center pr-3"
          aria-label="Send message"
          disabled={loading}
        >
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <BsSend className="text-white" />
          )}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
