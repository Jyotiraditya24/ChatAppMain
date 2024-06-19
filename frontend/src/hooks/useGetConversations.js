// FOR GETTING ALL THE CONVERSATIONS FOR THE SIDEBAR
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversations = async () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const response = await fetch("api/users/getAllUsers");
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }

        console.log("Here i am in useEffect", data);
        setConversations((prev) => [...prev, ...data]);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getConversations();
  }, []);

  return { loading, conversations };
};

export default useGetConversations;
