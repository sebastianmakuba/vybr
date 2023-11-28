import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch('http://localhost:5000/profile/<user_id>', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setUserData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const getPopularityText = (vibesReceived) => {
    if (vibesReceived <= 10) {
      return 'Quite popular... Autographs? 😄';
    } else if (vibesReceived <= 50) {
      return "Almost there. Soon we'll be influencing 😉";
    } else if (vibesReceived <= 100) {
      return 'We are there. Vibes pon di vibes 💃';
    } else {
      return 'Superstar! 🌟';
    }
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>Profile</Typography>
      {loading ? (
        <Typography variant="body1">Loading...</Typography>
      ) : userData ? (
        <>
          <Typography variant="body1">Username: {userData.username}</Typography>
          <Typography variant="body1">Vibes Received: {userData.vibes_received}</Typography>
          <Typography variant="body1">Popularity: {getPopularityText(userData.vibes_received)}</Typography>
          {/* Display other profile information */}
        </>
      ) : (
        <Typography variant="body1">Failed to load profile data</Typography>
      )}
    </div>
  );
};

export default Profile;
