import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddJobs from "./AddJobs";
import AddEvents from "./AddEvents";


const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEventsOpen, setIsEventsOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [events,setEvents] = useState([]);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    fetchJobs();
    fetchUserRole();
    fetchEvents();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/jobs");
      console.log(response.data); // Check the structure of the data
      setJobs(response.data.jobs || []); // Set jobs array
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/events");
      console.log(response.data); // Check the structure of the data
      setEvents(response.data.events || []); // Set events array
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const fetchUserRole = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3001/api/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserRole(response.data.role);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const calculateDaysAgo = (postedDate) => {
    const currentDate = new Date();
    const postDate = new Date(postedDate);
    const differenceInTime = currentDate - postDate;
    return Math.floor(differenceInTime / (1000 * 3600 * 24));
  };

  return (
    <div className="pt-16 w-svh h-svh flex flex-row font-manrope">
      <div className="w-3/5 p-3 h-svh overflow-y-auto custom-scrollbar border-r">
        <div className="flex gap-3">
          <h1 className="text-3xl font-manrope">Job & Intern Openings</h1>
          {userRole !== "Student" && (
            <button className=" bg-primary duration-200 hover:bg-blue-500 text-white rounded-xl px-4 py-2 mb-7" onClick={() => setIsOpen(true)}>
              Add Jobs
            </button>
          )}
          {isOpen && <AddJobs onClose={() => setIsOpen(false)} refreshJobs={fetchJobs} />}
        </div>
        <div>
          {jobs.map((job) => (
            <Link to={`/job/${job._id}`} key={job._id}>
              <div className="w-full h-1/2 p-3 border-2 rounded-lg mb-2 cursor-pointer hover:border-primary">
                <div className="w-1/2 h-10 m-6 flex items-center">
                  <Icon icon="gg:profile" className="w-10 h-10 rounded-full border" />
                  <div className="flex flex-col space-y-2">
                    <h3 className="ml-3 text-xl"></h3>
                    <p className="ml-3 items-center text-sm">{job.location}</p>
                  </div>
                </div>
                <h1 className="m-3 text-3xl flex items-center text-black font-bold">
                  <Icon
                    icon="arcticons:jobstreet"
                    width="3rem"
                    height="3rem"
                    className="text-[#D4A200] font-extrabold"
                  />
                  {job.jobName}
                </h1>
                <p className="ml-7 m-3 font-bold">{job.company}</p>
                <div className="ml-3 flex items-center">
                  <Icon icon="iconoir:suitcase" className="w-10 h-10 opacity-60" />
                  <p className="job-opening">{job.jobType}</p>
                  <Icon icon="material-symbols:location-on" className="w-10 h-10 opacity-60" />
                  <p className="job-opening">{job.location}</p>
                  <Icon icon="mdi:rupee" className="w-10 h-10 opacity-60" />
                  <p className="job-opening !border-none">{job.salaryLow}-{job.salaryHigh} LPA</p>
                </div>
                <p className="m-3 mb-3 text-lg font-bold">Requirements</p>
                <ul className="ml-10 list-disc text-lg font-semibold opacity-70 flex space-x-10">
                  {job.requirements.map((requirement, index) => (
                    <li key={index}>{requirement}</li>
                  ))}
                </ul>
                <p className="mt-5 !border-none job-opening">{calculateDaysAgo(job.posted)} days ago</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {/* AddEvents section */}
      <div className="w-2/5 p-3 h-svh overflow-y-auto custom-scrollbar">
        <div className="flex gap-3">
          <h1 className="text-3xl font-manrope">Events</h1>
          {userRole !== "Student" && (
            <button className=" bg-primary duration-200 hover:bg-blue-500 text-white rounded-xl px-4 py-2 mb-7" onClick={() => setIsEventsOpen(true)}>
              Add Events
            </button>
          )}
          {isEventsOpen && <AddEvents onClose={() => setIsEventsOpen(false)} refreshEvents={fetchEvents} />}
        </div>
        {/* Map Events data here */}
        {events.map((event) => (
        <Link to={`/events/${event._id}`} key={event._id}>
          <div
            className="w-full h-1/4 cursor-pointer border-2 duration-300 hover:border-primary rounded-lg mb-2 items-center flex"
          >
            <img
              src={`http://localhost:3001/api/events/${event._id}/image`}
              className="h-full w-1/4 p-3 rounded-lg"
              alt={event.title}
            />
            <div className="w-2/3 p-3 flex space-y-3 flex-col">
              <h4 className="text-xl font-semibold">{event.title}</h4>
              <p>{event.topic}</p>
              <p className="text-sm opacity-60 font-bold">{event.date}</p>
            </div>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
