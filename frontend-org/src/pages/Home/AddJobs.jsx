import React from 'react'
import '../../App.css'
import { Icon } from '@iconify/react'

const AddJobs = ({onClose}) => {
  const inputfields = [
    { label: "Job Name", name: "jobName" },
    { label: "Requirements", name: "requirements" },
    { label: "Location", name: "location" },
    { label: "Job type", name: "jobtype" },
    { label: "Company", name: "company" },
    { label: "Link", name: 'link' }
  ];

  return (
    <>
      <div className='fixed w-[100vw] h-screen top-0 left-0 bg-black opacity-60'></div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-3/4 w-3/4 bg-white z-20 shadow-lg rounded-md ">
        <button className="absolute top-3 right-3" onClick={onClose}><Icon icon="iconamoon:close-bold" width="2rem" height="2rem"/></button>
        <p className="m-3 text-xl border-b">Add Jobs</p>
        <form className='grid grid-cols-2 '>
          {inputfields.map((input) => (
            <div className="flex flex-col m-3 gap-4 w-3/4" key={input.name}>
              <label htmlFor={input.name}>{input.label}</label>
              <input type="text" name={input.name} id={input.name} className="input-style "/>
            </div>
          ))}

          {/* Salary input field with low-high range and LPA suffix */}
          <div className="flex flex-col m-3 gap-4 w-3/4">
            <label htmlFor="salary">Salary (Low - High)</label>
            <div className="flex items-center gap-3">
              <input type="number" name="salaryLow" placeholder="Low" className="input-style w-1/2" />
              <input type="number" name="salaryHigh" placeholder="High" className="input-style w-1/2" />
              <span>LPA</span>
            </div>
          </div>
          <div className="flex flex-col m-3 gap-4 w-3/4">
              <label htmlFor="description">Role Description</label>
              <textarea type="text" name="description" id="description" className="h-10 input-style"/>
            </div>
        </form>
        <button type="submit" className="bg-primary duration-200 hover:bg-blue-500 text-white rounded-xl px-10 py-2 m-7 w-1/4">
          Add
        </button>
      </div>
    </>
  )
}

export default AddJobs;
