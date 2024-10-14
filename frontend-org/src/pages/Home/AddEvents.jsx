import React, { useState } from "react";
import { Icon } from "@iconify/react";
import axios from "axios";

const AddEvents = ({ onClose, refreshEvents }) => {
  const apiUrl = import.meta.env.REACT_APP_API_URL;
  const [formData, setFormData] = useState({
    title: "",
    topic: "",
    date: "",
    location: "",
    link: "",
  });

  const [imageFile, setImageFile] = useState(null); // State for file input

  // Handle text input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]); // Store the selected file
  };

  // Submit the form data to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataWithFile = new FormData();
    formDataWithFile.append("title", formData.title);
    formDataWithFile.append("topic", formData.topic);
    formDataWithFile.append("date", formData.date);
    formDataWithFile.append("location", formData.location);
    formDataWithFile.append("link", formData.link);
    formDataWithFile.append("image", imageFile); // Append image file

    try {
      const response = await axios.post(`${apiUrl}/api/events`, formDataWithFile, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the content type to multipart
        },
      });
      console.log(response.data.message); // Log success message from backend
      refreshEvents();
      onClose(); // Close the modal on successful submission
    } catch (error) {
      console.error("Error adding event", error.response?.data?.message);
    }
  };

  const inputFields = [
    { label: "Event Name", name: "title" },
    { label: "Topic", name: "topic" },
    { label: "Event Date", name: "date" },
    { label: "Location of the Event", name: "location" },
    { label: "Registration Link", name: "link" },
  ];

  return (
    <>
      <div className="fixed w-[100vw] h-screen top-0 left-0 bg-black opacity-60"></div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-3/4 w-3/4 bg-white z-20 shadow-lg rounded-md">
        <button className="absolute top-3 right-3" onClick={onClose}>
          <Icon icon="iconamoon:close-bold" width="2rem" height="2rem" />
        </button>
        <p className="m-3 text-xl border-b">Add Events</p>
        <form className="grid grid-cols-2" onSubmit={handleSubmit} encType="multipart/form-data">
          {inputFields.map((input) => (
            <div className="flex flex-col m-3 gap-4 w-3/4" key={input.name}>
              <label htmlFor={input.name}>{input.label}</label>
              <input
                type="text"
                name={input.name}
                id={input.name}
                className="input-style"
                value={formData[input.name]}
                onChange={handleInputChange}
                required
              />
            </div>
          ))}

          {/* Event Poster Field */}
          <div className="flex flex-col m-3 gap-4 w-3/4">
            <label htmlFor="image">Event Poster</label>
            <input
              type="file"
              name="image"
              id="image"
              className="input-style"
              accept="image/*"
              onChange={handleFileChange} // Handle file selection
            />
          </div>

          <button
            type="submit"
            className="bg-primary duration-200 hover:bg-blue-500 text-white rounded-xl px-10 py-2 m-7 w-1/4"
          >
            Add
          </button>
        </form>
      </div>
    </>
  );
};

export default AddEvents;
