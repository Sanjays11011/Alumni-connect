import React, { useState, useEffect } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [editing, setEditing] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:3001/api/profile', details, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEditing(false);
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('Failed to update profile.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; 
  };

  if (!userData) return <p>Loading...</p>;

  return (
    <div className="flex w-full h-[92vh]">
      <div className="w-1/3 flex justify-center items-center relative">
        <Icon
          icon="gg:profile"
          className="w-3/4 h-1/2 rounded-full border absolute"
        />
      </div>

      <div className="w-2/3 flex justify-center items-center flex-col custom-scrollbar">
        <div className="flex-none w-full">
          <h1 className="text-3xl ml-20 font-manrope">Profile</h1>
        </div>

        <form className="w-3/4 h-3/4 p-4" onSubmit={handleSubmit}>
          <div className="flex justify-around mb-6">
            <div className="mb-4">
              <label className="font-manrope text-2xl">
                Name:{" "}
                {editing ? (
                  <input
                    type="text"
                    name="name"
                    value={details.name}
                    onChange={handleInputChange}
                    className="py-3 border-b-2 border-gray-300 focus:border-black outline-none"
                  />
                ) : (
                  <p className="font-manrope font-semibold py-3 border-b w-full">
                    {details.name}
                  </p>
                )}
              </label>
            </div>
            <div className="mb-4">
              <label className="font-manrope text-2xl">
                Role:{" "}
                {editing ? (
                  <input
                    type="text"
                    name="role"
                    value={details.role}
                    onChange={handleInputChange}
                    className="py-3 border-b-2 border-gray-300 focus:border-black outline-none"
                  />
                ) : (
                  <p className="font-manrope font-semibold py-3 border-b w-full capitalize">
                    {details.role}
                  </p>
                )}
              </label>
            </div>
          </div>

          <div className="flex pl-32 mb-6">
            <div className="mb-4">
              <label className="font-manrope text-2xl">
                Email:{" "}
                {editing ? (
                  <input
                    type="email"
                    name="email"
                    value={details.email}
                    onChange={handleInputChange}
                    className="py-3 border-b-2 border-gray-300 focus:border-black outline-none"
                  />
                ) : (
                  <p className="font-manrope font-semibold py-3 border-b w-full">
                    {details.email}
                  </p>
                )}
              </label>
            </div>
          </div>

          {details.role === "Alumni" && (
           
            <div className="flex justify-around mb-6">
              <div className="mb-4 ml-11">
                <label className="font-manrope text-2xl">
                  Years of Experience:{" "}
                  {editing ? (
                    <input
                      type="text"
                      name="yearsofexperience"
                      value={details.yearsofexperience}
                      onChange={handleInputChange}
                      className="py-3 border-b-2 border-gray-300 focus:border-black outline-none"
                    />
                  ) : (
                    <p className="font-manrope font-semibold py-3 border-b w-full">
                      {details.yearsofexperience}
                    </p>
                  )}
                </label>
              </div>

              <div className="mb-4">
                <label className="font-manrope text-2xl">
                  Working Company:{" "}
                  {editing ? (
                    <input
                      type="text"
                      name="workingcompany"
                      value={details.workingcompany}
                      onChange={handleInputChange}
                      className="py-3 border-b-2 border-gray-300 focus:border-black outline-none"
                    />
                  ) : (
                    <p className="font-manrope font-semibold py-3 border-b w-full">
                      {details.workingcompany}
                    </p>
                  )}
                </label>
              </div>
            </div>
            
          )}

          {details.role === "Student" && (
            
            <div className="flex justify-around mb-6">
              <div className="mb-4 ml-11">
                <label className="font-manrope text-2xl">
                  Studying Year:{" "}
                  {editing ? (
                    <input
                      type="text"
                      name="studyyear"
                      value={details.studyyear}
                      onChange={handleInputChange}
                      className="py-3 border-b-2 border-gray-300 focus:border-black outline-none"
                    />
                  ) : (
                    <p className="font-manrope font-semibold py-3 border-b w-full">
                      {details.studyyear}
                    </p>
                  )}
                </label>
              </div>

              <div className="mb-4">
                <label className="font-manrope text-2xl">
                  Passing Out Year:{" "}
                  {editing ? (
                    <input
                      type="text"
                      name="passingoutyear"
                      value={details.passingoutyear}
                      onChange={handleInputChange}
                      className="py-3 border-b-2 border-gray-300 focus:border-black outline-none"
                    />
                  ) : (
                    <p className="font-manrope font-semibold py-3 border-b w-full">
                      {details.passingoutyear}
                    </p>
                  )}
                </label>
              </div>
            </div>
          )}

          <div className="mb-4 ml-28 flex flex-col">
            <label className="font-manrope text-2xl mb-2">Success Story</label>
            <textarea className="w-3/4 outline-none border-b-2 border-gray-300 focus:border-black"></textarea>
          </div>

          <div className="flex justify-center space-x-6">
            <button
              type={editing ? "button" : "submit"}
              className="bg-primary text-white font-manrope flex justify-center w-1/3 rounded-lg px-4 py-2 mt-4"
              onClick={() => setEditing(!editing)}
            >
              {editing ? "Save" : "Edit"}
            </button>
            <button
              type="button"
              className="bg-red-600 text-white font-manrope flex justify-center w-1/3 rounded-lg px-4 py-2 mt-4"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
