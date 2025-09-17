import React, { useState } from "react";
import { Icon } from "@iconify/react";
import axios from "axios";

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
      await axios.post("http://localhost:3001/api/events", formData);
      refreshEvents(); // Refresh events list
      onClose(); // Close the modal on successful submission
    } catch (error) {
      console.error("Error adding event", error);
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
        <form className="grid grid-cols-2" onSubmit={handleSubmit}>
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
