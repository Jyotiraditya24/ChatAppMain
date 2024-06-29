import { useState } from "react";
import { useConversationContext } from "../context/conversationContext";
import toast from "react-hot-toast";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { selectConversation, addMessage } = useConversationContext();

  const sendMessage = async (message) => {
    if (!selectConversation?._id) {
      toast.error("No conversation selected");
      return;
    }
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
      addMessage(data.payloadBACKEND);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessage };
};

export default useSendMessage;
