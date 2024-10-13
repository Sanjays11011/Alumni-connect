import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EventDetails = () => {
  const { id } = useParams();  // Get ObjectId from URL
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/events/${id}`);
        console.log(response.data); // Log the entire response for debugging
        setEvent(response.data.event); // Set the fetched event data (accessing 'event' property)
        setLoading(false);
      } catch (err) {
        console.error('Error fetching event details:', err);
        setError('Error fetching event details');
        setLoading(false);
      }
    };

    fetchEventDetails();  // Call the function to fetch event details
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!event) {
    return <p>Event not found</p>;
  }

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className="pt-24 w-full lg:w-3/4 mx-auto bg-white shadow-lg rounded-lg p-6 font-manrope">
        <div className="mb-10 border-b pb-5">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-semibold">{event.title}</h1>
              <p className="text-md text-gray-500 mt-1">{event.topic}</p>
            </div>
            <div>
              <span className="text-sm text-green-500 bg-green-100 px-3 py-1 rounded-md">
                {new Date(event.date).toLocaleDateString()} {/* Format date as needed */}
              </span>
            </div>
          </div>

          <div className="mt-4">
            <p>{event.location}</p>
          </div>

          {/* Display Image */}
          

          <div className="mt-8">
            <a
              href={event.link}
              className="bg-primary hover:bg-blue-500 duration-200 text-white px-4 py-2 rounded-lg"
            >
              Register Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
