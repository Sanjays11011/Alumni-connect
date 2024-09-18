import React from 'react'
import '../../App.css'

const AddJobs = ({onClose}) => {
  return (
    <>
    <div className='fixed w-[100vw] h-screen top-0 left-0 bg-black opacity-60'>
    </div>
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-3/4 w-3/4 bg-white z-20 shadow-lg rounded-md">
        <button className="absolute top-3 right-3" onClick={onClose}>X</button>
        <p className="m-3 text-xl border-b">Add Jobs</p>
        <form className='grid grid-cols-2'>
            <div className="flex flex-col m-3 gap-4 w-1/2">
                <label htmlFor="name">Job Name</label>
                <input type="text" name="jobName" id="jobName" className="input-style "/>
                <label>Company Name</label>
                <input type='text' className='input-style'></input>
                <label>Requirements</label>
                <input type='text' className='input-style'></input>
                <label>Location</label>
                <input type='text' className='input-style'></input>
                <label>Timing</label>
                <input type='text' className='input-style'></input>
                <button className="bg-primary duration-200 hover:bg-blue-500  text-white rounded-xl px-4 py-2 mb-7">Add</button>
            </div>
        </form>
    </div>
   </>
  )
}

export default AddJobs
