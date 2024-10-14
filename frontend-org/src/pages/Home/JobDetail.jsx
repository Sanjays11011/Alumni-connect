import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const JobDetails = () => {
  const apiUrl = import.meta.env.REACT_APP_API_URL;
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() =>  {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/jobs/${id}`);
        console.log(response.data);
        setJob(response.data.jobs);
        setLoading(false);
      }
      catch (err){
        console.error('Error fetching job details:', err);
        setError('Error fetching job details');
        setLoading(false);
      }
  };

  fetchJobDetails();
}, [id]);

if(loading) {
  return <p>Loading...</p>
}

if(error) {
  return <p>{error}</p>
}

if(!job) {
  return <p>Event not found</p>
}

const HandleClick = () => {
  window.open(`https://${job.link}`, '_blank');
}
  return (
    <div className='flex justify-center items-center h-screen'>
    <div className="pt-24 w-full lg:w-3/4 mx-auto bg-white shadow-lg rounded-lg p-6 font-manrope">
        <div className="mb-10 border-b pb-5">
          {/* Job Title and Company */}
          <div className="flex items-start justify-between">
            <div className='space-y-6'>
              <h1 className="text-4xl font-semibold">{job.jobName}</h1>
              <p className="text-xl text-gray-600 mt-1">{job.company} - {job.location}</p>
              <p className="text-xl text-gray-500 mt-1">{job.jobType}</p>
            </div>
            <div>
              <span className="text-lg text-green-500 bg-green-100 px-3 py-1 rounded-md">
              {new Date(job.posted).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Alumni Name */}
          {/* <div className="mt-2 text-gray-500 font-bold ">
            <span className="font-medium">Alumni: </span>{job.alumniName}
          </div> */}

          {/* Salary */}
          <div className="mt-2 text-gray-600">
            <span className="font-medium">Salary: </span>{job.salaryLow} - {job.salaryHigh} LPA
          </div>

          {/* Job Requirements */}
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Requirements:</h2>
            <ul className="list-disc list-inside flex space-x-5  mt-2 text-gray-700 text-lg">
              {job.requirements.map((requirement, index) => (
                <li key={index}>{requirement}</li>
              ))}
            </ul>
          </div>

          {/* Job Description */}
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Job Description:</h2>
            <p className="mt-2 text-gray-700 text-lg">{job.description}</p>
          </div>

          {/* Apply button */}
          <div className="mt-8">
            <button onClick={HandleClick} className="bg-primary hover:bg-blue-500 duration-200 text-white px-4 py-2 rounded-lg">
              Apply Now
            </button>
          </div>
        </div>
    </div>
    </div>
  );
};

export default JobDetails;