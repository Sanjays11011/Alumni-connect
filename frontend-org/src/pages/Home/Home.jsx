import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import jobData from "../../Datas/jobData.json";
import eventsData from "../../Datas/eventsData.json";
import { Link } from "react-router-dom";
import AddJobs from "./AddJobs";
import AddEvents from "./AddEvents";
import axios from "axios"; // Assuming you're using axios for API calls

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEventsOpen, setIsEventsOpen] = useState(false);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    // Fetch user data (assuming you store the token in localStorage)
    const fetchUserRole = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3001/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserRole(response.data.role); // Set the role from the response
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserRole();
  }, []);

  const OpenModel = () => {
    setIsOpen(true);
  };

  const CloseModel = () => {
    setIsOpen(false);
  };

  return (
    <div className="pt-16 w-svh h-svh flex flex-row font-manrope">
      {/* Job List Section */}
      <div className="w-3/5 p-3 h-svh overflow-y-auto custom-scrollbar border-r">
        <div className="flex gap-3">
          <h1 className="text-3xl font-manrope">Job & Intern Openings</h1>
          {/* Conditionally render Add Jobs button based on user role */}
          {userRole !== "Student" && (
            <button
              className=" bg-primary duration-200 hover:bg-blue-500 text-white rounded-xl px-4 py-2 mb-7"
              onClick={OpenModel}
            >
              Add Jobs
            </button>
          )}
          {isOpen && <AddJobs onClose={CloseModel} />}
        </div>
        <div>
          {jobData.jobs.map((job) => (
            <Link to={`/job/${job.id}`} key={job.id}>
              <div className="w-full h-1/2 p-3 border-2 top-3 left-4 rounded-lg mb-2 duration-300 cursor-pointer hover:border-primary">
                <div className="w-1/2 h-10 m-6 flex items-center">
                  <Icon icon="gg:profile" className="w-10 h-10 rounded-full border" />
                  <div className="flex flex-col space-y-2">
                    <h3 className="ml-3 text-xl">{job["alumni-name"]}</h3>
                    <p className="ml-3 items-center text-sm">{job.company}</p>
                  </div>
                </div>
                <h1 className="m-3 text-3xl flex items-center text-black font-bold">
                  <Icon
                    icon="arcticons:jobstreet"
                    width="3rem"
                    height="3rem"
                    className="text-[#D4A200] font-extrabold"
                  />
                  {job.name}
                </h1>
                <p className="ml-3 mb-3 text-lg font-bold opacity-60">{job.company}</p>
                <div className="ml-3 flex items-center">
                  <Icon icon="iconoir:suitcase" className="w-10 h-10 opacity-60" />
                  <p className="job-opening">{job.timing}</p>
                  <Icon icon="material-symbols:location-on" className="w-10 h-10 opacity-60" />
                  <p className="job-opening">{job.location}</p>
                  <Icon icon="mdi:rupee" className="w-10 h-10 opacity-60" />
                  <p className="job-opening !border-none">{job.salary}</p>
                </div>
                <p className="m-3 mb-3 text-lg font-bold">Requirements</p>
                <ul className="ml-10 list-disc text-lg font-semibold opacity-70 flex space-x-10">
                  {job.requirements.map((requirement, index) => (
                    <li key={index}>{requirement}</li>
                  ))}
                </ul>
                <p className="mt-5 !border-none job-opening">{job.posted}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Events Section */}
      <div className="w-2/5 p-3 h-svh overflow-y-auto custom-scrollbar">
        <div className="flex gap-3">
          <h1 className="text-3xl font-manrope ">Events</h1>
          {/* Conditionally render Add Events button based on user role */}
          {userRole !== "Alumni" && (
            <button
              className=" bg-primary duration-200 hover:bg-blue-500  text-white rounded-xl px-4 py-2 mb-7"
              onClick={() => setIsEventsOpen(true)}
            >
              Add Events
            </button>
          )}
          {isEventsOpen && <AddEvents onClose={() => setIsEventsOpen(false)} />}
        </div>
        {eventsData.events.map((event, index) => (
        <Link to={`/events/${event.id}`} key={event.id}>
          <div
            key={index}
            className="w-full h-1/4 cursor-pointer border-2 duration-300 hover:border-primary rounded-lg mb-2 items-center flex"
          >
            <img
              src={event.image}
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
