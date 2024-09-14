import React from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const Layout = () => {
  const navbar = [
    { icon: "material-symbols-light:home", path: "/home" },
    { icon: "tabler:message-filled" ,path: "/message"},
    { icon: "mdi:discussion", path: "/discussion" },
    { icon: "iconamoon:profile-circle-fill", path: "/profile" },
    { icon: "mdi:donation-outline", path: "/donation" },
    { icon: "iconamoon:notification-bell" },
    { icon: "dashicons:feedback", path: "/feedback" },
  ];
  
  return (
    <div className="fixed top-0 left-0 w-full h-16 flex border-2 shadow-lg bg-primary z-50">
      <div className="h-full w-full flex justify-around items-center">
        <h1 className="pl-10 text-2xl opacity-60 font-manrope text-white">Heritage Hub</h1>
        <input
          className="ml-10 p-2 w-1/5 bg-input text-black font-manrope focus:outline-none rounded-lg"
          placeholder="Search"
        />
        <div className="w-1/4 h-full flex items-center justify-around">
          {navbar.map((item, index) => (
            <Link to={item.path} key={index}>
              <Icon
                icon={item.icon}
                width={index === 1 ? "3rem" : "2.5rem"}
                height="2.5rem"
                className="flex  justify-center cursor-pointer hover:text-input text-white"
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Layout;
