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
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3001/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data);
        setDetails({
          name: response.data.firstname + " " + response.data.lastname,
          email: response.data.email,
          role: response.data.role,
          yearsofexperience: response.data.yearsofexperience || "",
          workingcompany: response.data.workingcompany || "",
          workingdomain: response.data.workingdomain || "",
          degree: response.data.degree || "",
          passingoutyear: response.data.passingoutyear || "",
          studyyear: response.data.studyyear || "",
          successStory: response.data.successStory || "",
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

  if (!userData) return <p>Loading...</p>;

  return (
    <div className="mt-16  container mx-auto p-4">
      <div className="rounded-t-lg p-4 text-xl font-semibold">USER PROFILE</div>
      <div className="flex justify-center items-center rounded-b-lg p-6">
        <div className="flex  w-full">
          {/* Profile Section */}
          <div className="w-1/3 p-4 flex flex-col items-center">
            <div className="relative">
              <div className="rounded-full w-48 h-48 bg-gray-300 mb-4"></div>
              <button
                className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2"
                onClick={handleEdit}
              >
                <Icon icon="pepicons-pop:pen" width="1rem" height="1rem" />
              </button>
            </div>
            <h2 className="text-center font-semibold">{details.name}</h2>
            {/* Action Buttons */}
            <div className="flex justify-center mt-10 font-manrope">
              <button
                className="bg-blue-500 text-xl text-white py-2 px-4 rounded-lg m-2"
                onClick={isEditing ? handleSubmit : handleEdit}
              >
                {isEditing ? "Save" : "Edit"}
              </button>
              <button
                className="bg-red-500 text-xl text-white py-2 px-4 rounded-lg m-2"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>

          {/* Information Section */}
          <form className="w-2/3 grid grid-cols-2 gap-7 p-4 font-manrope" onSubmit={handleSubmit}>
            {Object.keys(details).map((key) => {
              if (
                (details.role === "Student" &&
                  (key === "yearsofexperience" ||
                    key === "workingcompany" ||
                    key === "workingdomain" )) ||
                (details.role === "Alumni" &&
                  (key === "studyyear" || key === "passingoutyear"))
              ) {
                return null; // Skip rendering these fields based on the role
              }
              const formatLabel = (label) => {
                return label
                  .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space before capital letters
                  .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter
              };
              return (
                <div key={key}>
                  <label className="block text-gray-600 font-medium text-xl capitalize">
                    {formatLabel(key)}
                  </label>
                  {isEditing ? (
                    key === "successStory" ? (
                      <textarea
                        name={key}
                        value={details[key]}
                        onChange={handleInputChange}
                        className="w-full h-48 px-4 py-4 mt-1 text-xl rounded-lg bg-gray-200 outline-none"
                      />
                    ) : (
                      <input
                        type="text"
                        name={key}
                        value={details[key]}
                        onChange={handleInputChange}
                        className="w-3/5 px-4 py-4 mt-1 text-xl rounded-lg bg-gray-200 outline-none"
                      />
                    )
                  ) : key === "successStory" ? (
                    <p
                      name={key}
                      value={details[key]}
                      readOnly
                      className="w-full px-4 py-4 mt-1 text-xl rounded-lg bg-gray-100 outline-none"
                    > {details[key]} </p>
                  ) : (
                    <p className="w-3/4 px-4 py-4 mt-1 text-xl rounded-lg bg-gray-100">
                      {details[key]}
                    </p>
                  )}
                </div>
              );
            })}
          </form> 
        </div> 
      </div>
    </div>
  );
};

export default Profile;
