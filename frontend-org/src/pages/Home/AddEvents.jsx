import React from 'react'
import { Icon } from '@iconify/react'

const AddEvents = ({ onClose }) => {
  const inputfields = [
    { label: "Event name", name: "eventName" },
    { label: "Topic", name: "topic" },
    { label: "Event Date", name: "date" },
    { label: "Location of the Event", name: "location" },
    { label: "Registration Link", name: 'link' }
  ];

  return (
    <>
      <div className='fixed w-[100vw] h-screen top-0 left-0 bg-black opacity-60'>
      </div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-3/4 w-3/4 bg-white z-20 shadow-lg rounded-md">
        <button className="absolute top-3 right-3" onClick={onClose}>
          <Icon icon="iconamoon:close-bold" width="2rem" height="2rem" />
        </button>
        <p className="m-3 text-xl border-b">Add Events</p>
        <form className='grid grid-cols-2 '>
          {inputfields.map((input) => (
            <div className="flex flex-col m-3 gap-4 w-3/4" key={input.name}>
              <label htmlFor={input.name}>{input.label}</label>
              <input type="text" name={input.name} id={input.name} className="input-style " />
            </div>
          ))}

          {/* Event Poster Field */}
          <div className="flex flex-col m-3 gap-4 w-3/4">
            <label htmlFor="poster">Event Poster</label>
            <input type="file" name="poster" id="poster" className="input-style" accept="image/*" />
          </div>
        </form>
        <button type="submit" className="bg-primary duration-200 hover:bg-blue-500 text-white rounded-xl px-10 py-2 m-7 w-1/4">
          Add
        </button>
      </div>
    </>
  )
}

export default AddEvents;
