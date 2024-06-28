import { useState } from "react";
import { useConversationContext } from "../context/conversationContext";
import toast from "react-hot-toast";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false); // Initialize loading state with false
  const {
    selectConversation,
    updateSelectConversation,
    addMessage,
    clearMessages,
  } = useConversationContext();

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3001/api/messages/send/${selectConversation._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ message }),
        }
      );
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      addMessage(data.payloadBACKEND.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, sendMessage };
};

export default useSendMessage;
