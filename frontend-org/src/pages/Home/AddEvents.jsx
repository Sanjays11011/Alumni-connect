import React, { useState } from "react";
import { Icon } from "@iconify/react";
import axios from "axios";
import '../../App.css'; // Assuming this has your custom-scrollbar or other global styles

const AddEvents = ({ onClose, refreshEvents }) => {
  const [formData, setFormData] = useState({
    title: "",
    topic: "",
    date: "",
    location: "",
    link: "",
  });

  // Handle text input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit the form data to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found. User not authenticated.");
        alert("Please log in to add an event.");
        return;
      }

      await axios.post("http://localhost:3001/api/events", formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      refreshEvents();
      onClose();
      alert("Event added successfully!");
    } catch (error) {
      console.error("Error adding event", error.response ? error.response.data.message : error.message);
      alert("Failed to add event. Check console for details.");
    }
  };

  const inputFields = [
    { label: "Event Name", name: "title", type: "text" },
    { label: "Topic", name: "topic", type: "text" },
    { label: "Event Date", name: "date", type: "date" },
    { label: "Location of the Event", name: "location", type: "text" },
    { label: "Registration Link", name: "link", type: "text" },
  ];

  return (
    <>
      <div className="fixed w-full h-screen top-0 left-0 bg-black opacity-60"></div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-auto w-3/4 bg-white z-20 shadow-lg rounded-md overflow-y-auto max-h-[80vh] font-manrope">
        <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-700" onClick={onClose}>
          <Icon icon="iconamoon:close-bold" width="2rem" height="2rem" />
        </button>
        <p className="m-5 text-2xl font-semibold border-b pb-2">Add Events</p>
        
        <form className="grid grid-cols-1 md:grid-cols-2 gap-x-10 px-10" onSubmit={handleSubmit}>
          {inputFields.map((input) => (
            <div className="flex flex-col mb-4" key={input.name}>
              <label htmlFor={input.name} className="font-medium text-gray-700">{input.label}</label>
              <input
                type={input.type}
                name={input.name}
                id={input.name}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                value={formData[input.name]}
                onChange={handleInputChange}
                required
              />
            </div>
          ))}

          {/* This is to make the button span the full width of the modal on all screen sizes */}
          <div className="md:col-span-2 flex justify-center mt-5">
            <button
              type="submit"
              className="bg-blue-600 text-white rounded-lg px-10 py-3 mb-5 hover:bg-blue-700 transition-colors shadow-md"
            >
              Add Event
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddEvents;