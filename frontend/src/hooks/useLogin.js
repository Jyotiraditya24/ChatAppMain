import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/authContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async ({ userName, password }) => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: userName,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Login failed");
        return;
      }

      if (data.error) {
        toast.error(data.error);
        return;
      }

      // Store in local storage
      localStorage.setItem("chat-user", JSON.stringify(data));
      // Set in context
      setAuthUser(data);
      toast.success("Login successful!");
    } catch (error) {
      toast.error(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;
