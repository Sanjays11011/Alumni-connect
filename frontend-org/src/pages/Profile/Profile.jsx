import React, { useState, useEffect } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [details, setDetails] = useState({
    name: "",
    email: "",
    role: "",
    yearsofexperience: "",
    workingcompany: "",
    workingdomain: "",
    degree: "",
    passingoutyear: "",
    studyyear: "",
    aboutme: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get("http://localhost:3001/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = response.data;
        setUserData(data);
        setDetails({
          name: data.firstname + " " + data.lastname,
          email: data.email,
          role: data.role,
          yearsofexperience: data.yearsofexperience || "",
          workingcompany: data.workingcompany || "",
          workingdomain: data.workingdomain || "",
          degree: data.degree || "",
          passingoutyear: data.passingoutyear || "",
          studyyear: data.studyyear || "",
          aboutme: data.successStory || "",
        });
      } catch (error) {
        console.log("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEditing) {
      handleEdit();
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.put("http://localhost:3001/api/profile", details, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const formatLabel = (label) => {
    return label
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/^./, (str) => str.toUpperCase());
  };

  if (!userData) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-16 font-manrope">
      <div className="container mx-auto p-8 lg:p-12">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-white text-black p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-center">User Profile</h1>
          </div>
          <div className="flex flex-col lg:flex-row p-6 md:p-8 gap-8">
            {/* Profile Sidebar */}
            <div className="w-full lg:w-1/3 flex flex-col items-center p-6 bg-gray-50 rounded-lg shadow-inner">
              <div className="relative">
                <Icon
                  icon="iconoir:profile-circle"
                  className="rounded-full w-48 h-48 bg-white text-gray-300 mb-4"
                />
                <button
                  className="absolute bottom-4 right-4 bg-blue-500 text-white rounded-full p-2 hover:bg-blue-700 transition-colors"
                  onClick={handleEdit}
                  aria-label="Edit profile picture"
                >
                  <Icon icon="pepicons-pop:pen" width="1rem" height="1rem" />
                </button>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mt-4">
                {details.name}
              </h2>
              <div className="flex justify-center mt-8 space-x-4">
                <button
                  className="bg-blue-600 text-white py-2 px-6 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors shadow-md"
                  onClick={handleSubmit}
                >
                  {isEditing ? "Save" : "Edit"}
                </button>
                <button
                  className="bg-gray-400 text-gray-800 py-2 px-6 rounded-lg text-lg font-medium hover:bg-gray-500 transition-colors shadow-md"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>

            {/* Information Section */}
            <form className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-white rounded-lg" onSubmit={handleSubmit}>
              {Object.keys(details).map((key) => {
                if (
                  (details.role === "Student" &&
                    ["yearsofexperience", "workingcompany", "workingdomain"].includes(key)) ||
                  (details.role === "Alumni" &&
                    ["studyyear"].includes(key))
                ) {
                  return null;
                }
                return (
                  <div key={key} className="flex flex-col">
                    <label className="text-sm font-medium text-gray-600 capitalize mb-1">
                      {formatLabel(key)}
                    </label>
                    {isEditing ? (
                      key === "successStory" ? (
                        <textarea
                          name={key}
                          value={details[key]}
                          onChange={handleInputChange}
                          className="w-full h-32 px-3 py-2 text-base rounded-lg bg-gray-100 border border-gray-300 outline-none focus:border-blue-500 transition-colors"
                          placeholder={`Enter your ${formatLabel(key)}...`}
                        />
                      ) : (
                        <input
                          type="text"
                          name={key}
                          value={details[key]}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 text-xl rounded-lg bg-gray-100 border border-gray-300 outline-none focus:border-blue-500 transition-colors"
                          placeholder={`Enter your ${formatLabel(key)}...`}
                          readOnly={key === "name" || key === "email" || key === "role"}
                        />
                      )
                    ) : key === "successStory" ? (
                      <p className="w-full h-32 p-3 text-xl rounded-lg  text-gray-800 overflow-y-auto">
                        {details[key]}
                      </p>
                    ) : (
                      <p className="w-full p-3 text-xl rounded-lg  text-gray-800">
                        {details[key] || "N/A"}
                      </p>
                    )}
                  </div>
                );
              })}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;