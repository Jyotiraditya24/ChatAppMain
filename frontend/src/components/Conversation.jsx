import React from "react";

const Conversation = () => {
  return (
    <>
      <div className="flex flex-row gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer">
        <div className="avatar online">
          <div className="w-12 rounded-full">
            <img
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              alt="user image"
            />
          </div>
        </div>
        <div className="flex flex-row flex-1 gap-3 justify-between">
          <p className="font-bold text-gray-200">Jyotiraditya</p>
          <span className="text-xl">🎃</span>
        </div>
      </div>
      {/* DIVIDER */}
      <div className="divider my-0 py-0 h-1" />
    </>
  );
};

export default Conversation;
