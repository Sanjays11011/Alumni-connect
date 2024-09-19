import React from 'react';
import { useParams } from 'react-router-dom';
import  jobData  from '../../Datas/jobData.json';


const JobDetails = () => {
  const { id } = useParams();
  const job = jobData.jobs.find((job) => job.id === parseInt(id));

  if (!job) {
    return <p>Job not found</p>;
  }
  return (
    <div className='flex justify-center items-center h-screen'>
    <div className="pt-24 w-full lg:w-3/4 mx-auto bg-white shadow-lg rounded-lg p-6 font-manrope">
        <div className="mb-10 border-b pb-5">
          {/* Job Title and Company */}
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-semibold">{job.name}</h1>
              <p className="text-lg text-gray-600 mt-1">{job.company} - {job.location}</p>
              <p className="text-md text-gray-500 mt-1">Posted {job.posted}</p>
            </div>
            <div>
              <span className="text-sm text-green-500 bg-green-100 px-3 py-1 rounded-md">
                {job.timing}
              </span>
            </div>
          </div>

          {/* Alumni Name */}
          <div className="mt-2 text-gray-500 font-bold ">
            <span className="font-medium">Alumni: </span>{job.alumniName}
          </div>

          {/* Salary */}
          <div className="mt-2 text-gray-600">
            <span className="font-medium">Salary: </span>{job.salary}
          </div>

          {/* Job Requirements */}
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Requirements:</h2>
            <ul className="list-disc list-inside mt-2 text-gray-700 text-lg">
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
            <button className="bg-primary hover:bg-blue-500 duration-200 text-white px-4 py-2 rounded-lg">
              Apply Now
            </button>
          </div>
        </div>
    </div>
    </div>
  );
};

export default JobDetails;