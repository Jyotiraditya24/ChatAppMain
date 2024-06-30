import React, { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import useConversation from "../zustand/useConversation";
import useGetConversations from "../hooks/useGetConversations";
import toast from "react-hot-toast";

const SearchInput = () => {
  const [search, setSearch] = useState("");

  const { setSelectedConversation } = useConversation();
  const { loading, conversations } = useGetConversations();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Search term must be at least 3 characters long");
    }

    const convo = conversations.find((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );

    if (convo) {
      setSelectedConversation(convo);
      setSearch("");
    } else {
      return toast.error("No such user found");
    }
  };

  return (
    <form className="flex items-center gap-3" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered input-info w-full max-w-xs"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        disabled={loading}
      />
      <button
        type="submit"
        className={`btn btn-circle ${
          loading ? "bg-gray-400" : "bg-sky-800"
        } text-white`}
        disabled={loading}
      >
        <IoMdSearch />
      </button>
    </form>
  );
};

export default SearchInput;
