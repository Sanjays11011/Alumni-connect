import React, { useState } from "react";
import axios from "axios"; // Import axios for API calls
import '../../App.css'
import { Icon } from '@iconify/react'

const AddJobs = ({ onClose, refreshJobs }) => {
  const apiUrl = import.meta.env.REACT_APP_API_URL;
  const [formData, setFormData] = useState({
    jobName: "",
    requirements: [], // Changed to an array to store multiple requirements
    location: "",
    jobType: "",
    company: "",
    link: "",
    salaryLow: "",
    salaryHigh: "",
    description: "",
  });

  const [requirementInput, setRequirementInput] = useState(""); // To hold individual requirement input

  const inputFields = [
    { label: "Job Name", name: "jobName" },
    { label: "Location", name: "location" },
    { label: "Company", name: "company" },
    { label: "Link", name: "link" }
  ];

  // Handles input change for normal fields
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handles adding a requirement to the list
  const handleAddRequirement = () => {
    if (requirementInput.trim()) {
      setFormData((prevData) => ({
        ...prevData,
        requirements: [...prevData.requirements, requirementInput],
      }));
      setRequirementInput(""); // Clear input field after adding
    }
  };

  // Handles removing a requirement from the list
  const handleRemoveRequirement = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      requirements: prevData.requirements.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiUrl}/api/jobs`, formData); // Update with your API route
      refreshJobs(); // Call the function to refresh the jobs list after adding
      onClose(); // Close the modal
    } catch (error) {
      console.error('Error adding job:', error);
    }
  };

  return (
    <>
      <div className='fixed w-[100vw] h-screen top-0 left-0 bg-black opacity-60'></div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-auto w-3/4 bg-white z-20 shadow-lg rounded-md overflow-y-auto max-h-[80vh] custom-scrollbar">
        <button className="absolute top-3 right-3" onClick={onClose}><Icon icon="iconamoon:close-bold" width="2rem" height="2rem"/></button>
        <p className="m-3 text-xl border-b">Add Jobs</p>
        <form className='grid grid-cols-2' onSubmit={handleSubmit}>
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

          {/* Job Type dropdown */}
          <div className="flex flex-col m-3 gap-4 w-3/4">
            <label htmlFor="jobType">Job Type</label>
            <select
              name="jobType"
              id="jobType"
              className="input-style"
              value={formData.jobType}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Job Type</option>
              <option value="Remote">Remote</option>
              <option value="Part-time">Part-time</option>
              <option value="Full-time">Full-time</option>
            </select>
          </div>

          {/* Requirements input with add/remove functionality */}
          <div className="flex flex-col m-3 gap-4 w-3/4">
            <label htmlFor="requirements">Requirements</label>
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Add a requirement"
                className="input-style"
                value={requirementInput}
                onChange={(e) => setRequirementInput(e.target.value)}
              />
              <button
                type="button"
                className="bg-primary duration-200 hover:bg-blue-500 text-white rounded-xl px-3 py-2"
                onClick={handleAddRequirement}
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.requirements.map((requirement, index) => (
                <div key={index} className="bg-gray-200 px-3 py-1 rounded-full flex items-center">
                  {requirement}
                  <button
                    type="button"
                    onClick={() => handleRemoveRequirement(index)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    <Icon icon="iconamoon:close-bold" width="1rem" height="1rem" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Salary input field with low-high range */}
          <div className="flex flex-col m-3 gap-4 w-3/4">
            <label htmlFor="salary">Salary (Low - High)</label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                name="salaryLow"
                placeholder="Low"
                className="input-style w-1/2"
                value={formData.salaryLow}
                onChange={handleInputChange}
              />
              <input
                type="number"
                name="salaryHigh"
                placeholder="High"
                className="input-style w-1/2"
                value={formData.salaryHigh}
                onChange={handleInputChange}
              />
              <span>LPA</span>
            </div>
          </div>

          <div className="flex flex-col m-3 gap-4 w-3/4">
            <label htmlFor="description">Role Description</label>
            <textarea
              type="text"
              name="description"
              id="description"
              className="h-10 input-style"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
        </form>
        <button type="submit" className="bg-primary duration-200 hover:bg-blue-500 text-white rounded-xl px-10 py-2 m-7 w-1/4" onClick={handleSubmit}>
          Add
        </button>
      </div>
    </>
  );
};

export default AddJobs;
