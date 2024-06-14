import React from "react";
import SideBar from "../../components/Sidebar";

const Home = () => {
  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-opacity-0 backdrop-blur-lg backdrop-filter bg-clip-border p-5">
      <SideBar />
      {/* <MessageContainer /> */}
    </div>
  );
};

export default Home;
