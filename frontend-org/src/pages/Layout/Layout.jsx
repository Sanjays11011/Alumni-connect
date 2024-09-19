import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";

const Layout = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate(); // Use for navigation after clicking a result

  const navbar = [
    { icon: "material-symbols-light:home", path: "/home" },
    { icon: "tabler:message-filled", path: "/message" },
    { icon: "mdi:discussion", path: "/discussion" },
    { icon: "iconamoon:profile-circle-fill", path: "/profile" },
    { icon: "mdi:donation-outline", path: "/donation" },
    { icon: "iconamoon:notification-bell", path: "/notifications" },
    { icon: "dashicons:feedback", path: "/feedback" },
  ];

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle search form submission
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/api/search?name=${searchQuery}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  // Handle click on a specific search result
  const handleResultClick = (userId) => {
    setSearchResults([]); // Clear the search results list
    setSearchQuery('');    // Optionally clear the search input
    navigate(`/user/${userId}`); // Redirect to the user details page
  };

  return (
    <div className="fixed top-0 left-0 w-full h-16 flex border-2 shadow-lg bg-primary z-50">
      <div className="h-full w-full flex justify-around items-center">
        <h1 className="pl-10 text-2xl opacity-60 font-manrope text-white">Heritage Hub</h1>

        {/* Search input */}
        <div className="flex">
        <form onSubmit={handleSearchSubmit} className="ml-10">
          <input
            type="text"
            className="p-2 w-full bg-input text-black font-manrope focus:outline-none rounded-lg"
            placeholder="Search by name"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </form>
        <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded-lg">Search</button>
        </div>

        <div className="w-1/4 h-full flex items-center justify-around">
          {navbar.map((item, index) => (
            <Link to={item.path} key={index}>
              <Icon
                icon={item.icon}
                width={index === 1 ? "3rem" : "2.5rem"}
                height="2.5rem"
                className="flex justify-center cursor-pointer hover:text-input text-white"
              />
            </Link>
          ))}
        </div>
      </div>

      {/* Display search results */}
      {searchResults.length > 0 && (
        <div className="absolute top-20 left-10 bg-white p-5 shadow-lg">
          <h2 className="text-lg font-bold">Search Results</h2>
          <ul>
            {searchResults.map((user, index) => (
              <li
                key={index}
                className="py-1 cursor-pointer hover:bg-gray-200"
                onClick={() => handleResultClick(user._id)} // Call function to navigate to user details page
              >
                {user.firstname} {user.lastname} - {user.email}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Layout;
