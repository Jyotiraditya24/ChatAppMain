import React from "react";
import { IoMdSearch } from "react-icons/io";

const SearchInput = () => {
  return (
    <form className="flex items-center gap-3">
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered input-info w-full max-w-xs"
      />
      <button type="submit" className="btn btn-circle bg-sky-800 text-white">
        <IoMdSearch />
      </button>
    </form>
  );
};

export default SearchInput;
