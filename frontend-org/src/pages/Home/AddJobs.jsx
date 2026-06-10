// AddJobs.jsx
import React, { useState } from "react";
import axios from "axios";
import '../../App.css'
import { Icon } from '@iconify/react'

const AddJobs = ({ onClose, refreshJobs }) => {
  const [formData, setFormData] = useState({
    jobName: "",
    requirements: [],
    location: "",
    jobType: "",
    company: "",
    link: "",
    salaryLow: "",
    salaryHigh: "",
    description: "",
  });

  const [requirementInput, setRequirementInput] = useState("");

  const inputFields = [
    { label: "Job Name", name: "jobName" },
    { label: "Location", name: "location" },
    { label: "Company", name: "company" },
    { label: "Link", name: "link" }
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddRequirement = () => {
    if (requirementInput.trim()) {
      setFormData((prevData) => ({
        ...prevData,
        requirements: [...prevData.requirements, requirementInput],
      }));
      setRequirementInput("");
    }
  };

  const handleRemoveRequirement = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      requirements: prevData.requirements.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

     if (!formData.jobName || !formData.company || !formData.location || formData.requirements.length === 0 || !formData.jobType || !formData.salaryLow || !formData.salaryHigh || !formData.description) {
        alert("Please fill in all required fields.");
        return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found. User not authenticated.");
        alert("Please log in to add a job.");
        return;
      }
      
      const dataToSend = {
        ...formData,
        salaryLow: Number(formData.salaryLow),
        salaryHigh: Number(formData.salaryHigh),
      };

      await axios.post('http://localhost:3001/api/jobs', dataToSend, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      refreshJobs();
      onClose();
      alert("Job added successfully!");
    } catch (error) {
      console.error('Error adding job:', error.response ? error.response.data.message : error.message);
      alert("Failed to add job. Check console for details.");
    }
  };

  return (
    <>
      <div className='fixed w-full h-screen top-0 left-0 bg-black opacity-60'></div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-auto w-3/4 bg-white z-20 shadow-lg rounded-md overflow-y-auto max-h-[80vh] font-manrope">
        <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-700" onClick={onClose}>
          <Icon icon="iconamoon:close-bold" width="2rem" height="2rem" />
        </button>
        <p className="m-5 text-2xl font-semibold border-b pb-2">Add Jobs</p>
        
        <form className='grid grid-cols-1 md:grid-cols-2 gap-x-10 px-10' onSubmit={handleSubmit}>
          {inputFields.map((input) => (
            <div className="flex flex-col mb-4" key={input.name}>
              <label htmlFor={input.name} className="font-medium text-gray-700">{input.label}</label>
              <input
                type="text"
                name={input.name}
                id={input.name}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                value={formData[input.name]}
                onChange={handleInputChange}
                required
              />
            </div>
          ))}

          <div className="flex flex-col mb-4">
            <label htmlFor="jobType" className="font-medium text-gray-700">Job Type</label>
            <select
              name="jobType"
              id="jobType"
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              value={formData.jobType}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Job Type</option>
              <option value="Remote">Remote</option>
              <option value="Part-time">Part-time</option>
              <option value="Full-time">Full-time</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="requirements" className="font-medium text-gray-700">Requirements</label>
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Add a requirement"
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow transition-colors"
                value={requirementInput}
                onChange={(e) => setRequirementInput(e.target.value)}
              />
              <button
                type="button"
                className="bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700 transition-colors"
                onClick={handleAddRequirement}
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.requirements.map((requirement, index) => (
                <div key={index} className="bg-gray-200 px-3 py-1 rounded-full flex items-center text-sm">
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

          <div className="flex flex-col mb-4">
            <label htmlFor="salary" className="font-medium text-gray-700">Salary (LPA)</label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                name="salaryLow"
                placeholder="Low"
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/2 transition-colors"
                value={formData.salaryLow}
                onChange={handleInputChange}
                required
              />
              <input
                type="number"
                name="salaryHigh"
                placeholder="High"
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/2 transition-colors"
                value={formData.salaryHigh}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="flex flex-col mb-4 md:col-span-2">
            <label htmlFor="description" className="font-medium text-gray-700">Role Description</label>
            <textarea
              name="description"
              id="description"
              className="h-24 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 text-white rounded-lg px-10 py-3 mb-5 hover:bg-blue-700 transition-colors shadow-md"
            >
              Add Job
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddJobs;