import React from "react";
import SearchInput from "./SearchInput";
import Conversations from "./Conversations";
import Button from "./Button";

const SideBar = () => {
  return (
    <div>
      <SearchInput />
      <div className="divider py-3"></div>
      <Conversations />
      <Button />
    </div>
  );
};

export default SideBar;
