// src/pages/UserDetails/UserDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UserDetails = () => {
  const { userId } = useParams(); // Get the userId from the URL
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the user data based on userId
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/user/${userId}`);
        setUserData(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Unable to fetch user details');
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) {
    return <p>Loading user details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!userData) {
    return <p>No user data found</p>;
  }

  return (
    <div className="container mx-auto p-6 mt-12">
      <h1 className="text-3xl font-bold mb-6">{userData.firstname} {userData.lastname}</h1>
      
      <div className="grid grid-cols-2 gap-6">
        <div className="col-span-1">
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Role:</strong> {userData.role}</p>
          <p><strong>Years of Experience:</strong> {userData.yearsofexperience || 'N/A'}</p>
        </div>

        <div className="col-span-1">
          <p><strong>Company:</strong> {userData.workingcompany || 'N/A'}</p>
          <p><strong>Domain:</strong> {userData.workingdomain || 'N/A'}</p>
          <p><strong>Degree:</strong> {userData.degree || 'N/A'}</p>
        </div>
      </div>

      <div className="mt-6">
        <p><strong>Passing Out Year:</strong> {userData.passingoutyear || 'N/A'}</p>
        <p><strong>Study Year:</strong> {userData.studyyear || 'N/A'}</p>
      </div>
    </div>
  );
};

export default UserDetails;
