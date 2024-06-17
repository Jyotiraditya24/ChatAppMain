import React from "react";
import { BsSend } from "react-icons/bs";

const MessageInput = () => {
  return (
    <form className="px-4 my-3">
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm rounded-lg block p-2.5 bg-gray-700 border-gray-600 text-white w-full pr-10"
          placeholder="Send a Message"
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
