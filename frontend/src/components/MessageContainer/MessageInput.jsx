import React, { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
  const [message, setMessage] = useState(""); // State to hold input value
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
    setMessage(""); // Clear input field after sending message
  };

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm rounded-lg block p-2.5 bg-gray-700 border-gray-600 text-white w-full pr-10"
          placeholder="Send a Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)} // Update message state
        />
        <button
          type="submit"
          className="absolute inset-y-0 right-0 flex items-center pr-3"
          aria-label="Send message"
        >
          <BsSend className="text-white" />
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
