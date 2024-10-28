import React, { useState, useEffect } from "react";
import axios from "axios";
import AddDonation from "./AddDonation";

const Donation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [donations, setDonations] = useState([]);

  const fetchDonations = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/donation");
      setDonations(response.data.donation.reverse() || []); // Set donations array
    } catch (error) {
      console.error("Error fetching donations:", error);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  return (
    <div className="ml-36 w-3/4 min-h-screen mt-20 font-manrope custom-scrollbar">
      <div className="flex justify-between">
        <h1 className="m-4 text-3xl font-semibold">Donation Requests</h1>
        <button
          className="bg-primary duration-200 hover:bg-blue-500 text-white rounded-xl px-4 py-2 mb-7"
          onClick={() => setIsOpen(true)}
        >
          Add Donation Request
        </button>
        {isOpen && <AddDonation onClose={() => setIsOpen(false)} refreshDonations={fetchDonations} />}
      </div>
      <div>
        <h2 className="text-xl ">We are excited to invite you to be a part of something transformative! Our students are working on groundbreaking projects and innovations that have the potential to make a real impact on industries and communities worldwide</h2>
      </div>

      {donations.map((donation, index) => (
        <div key={index} className="relative border border-black mb-4 rounded-md p-4">
          <h2 className="text-2xl font-semibold">Request for Student Innovation Project - {donation.title}</h2>
          <p className="text-xl">{donation.intro}</p>
          <h3 className="text-xl font-semibold">Review</h3>
          <p className="text-xl">{donation.review}</p>

          <h3 className="mt-5 text-xl font-semibold">Requirements</h3>
          <ol className="text-xl list-disc list-inside">
            {donation.requirements.map((req, reqIndex) => (
              <li key={reqIndex}>{req}</li>
            ))}
          </ol>

          <h3 className="text-xl font-semibold mt-4">Amount Needed</h3>
          <p className="text-xl">{donation.amount}</p>
          <h3 className="text-xl font-semibold mt-4">Payment method</h3>
          <p className="text-xl">Google Pay - <span className="text-xl font-semibold">6381101158</span></p>
          <p className="text-xl">For more details about the project or to discuss potential collaborations, feel free to reach out to us at <span className='text-xl font-semibold'>studentinnovation@ksrct.net</span></p>
        </div>
      ))}
    </div>
  );
};

export default Donation;
