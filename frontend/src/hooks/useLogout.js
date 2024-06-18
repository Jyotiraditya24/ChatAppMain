import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/authContext";

const useLogOut = () => {
  const [loading, setLoading] = useState(false);
  const { authUser, setAuthUser } = useAuthContext();

  const logout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Log out failed");
        return;
      }

      if (data.error) {
        toast.error(data.error);
        return;
      }
      //   remove from the local storage
      localStorage.removeItem("chat-user");
      //   remove from the context
      setAuthUser(null);
    } catch (error) {
      toast.error(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };
  return { logout, loading };
};

export default useLogOut;
