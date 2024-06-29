import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/users/getAllUsers");
        const data = await response.json();

        if (response.ok) {
          setConversations(data); // Assuming data is an array of conversations
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
  }, []); // Empty dependency array means this effect runs only once on mount

  return { loading, conversations };
};

export default useGetConversations;
