import React from "react";
import { BiLogOut } from "react-icons/bi";
import useLogOut from "../hooks/useLogout";

const LogoutButton = () => {
  const { loading, logout } = useLogOut();
  return (
    <div className="mt-5">
      {!loading ? (
        <BiLogOut
          className="w-6 h-6 text-white cursor-pointer"
          onClick={logout}
        />
      ) : (
        <span className="loading loading-spinner"></span>
      )}
    </div>
  );
};

export default LogoutButton;
