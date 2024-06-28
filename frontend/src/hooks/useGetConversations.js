import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useConversationContext } from "../context/conversationContext";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const { addMessage } = useConversationContext();

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/users/getAllUsers");
        const data = await response.json();

        if (response.ok) {
          setConversations(data); // Assuming data is an array of conversations
          addMessage(data);
        } else {
          throw new Error(data.error || "Failed to fetch conversations");
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, [conversations?.length]); // Empty dependency array means this effect runs only once on mount

  return { loading, conversations };
};

export default useGetConversations;
