import React from 'react';
import { useParams } from 'react-router-dom';
import eventsData from '../../Datas/eventsData.json';

const EventDetails = () => {
  const { id } = useParams(); // Extract the `id` parameter from the URL
  const event = eventsData.events.find((event) => event.id === parseInt(id));

  if (!event) {
    return <p>Event not found</p>;
  }

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className="pt-24 w-full lg:w-3/4 mx-auto bg-white shadow-lg rounded-lg p-6 font-manrope">
        <div className="mb-10 border-b pb-5">
          {/* Event Title and Topic */}
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-semibold">{event.title}</h1>
              <p className="text-md text-gray-500 mt-1">{event.topic}</p>
            </div>
            <div>
              <span className="text-sm text-green-500 bg-green-100 px-3 py-1 rounded-md">
                {event.date}
              </span>
            </div>
          </div>

          {/* Event Image */}
         

          {/* Register button */}
          <div className="mt-8">
            <button className="bg-primary hover:bg-blue-500 duration-200 text-white px-4 py-2 rounded-lg">
              Register Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
