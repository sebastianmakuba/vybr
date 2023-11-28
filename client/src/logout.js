import React from 'react';
import { Typography } from '@mui/material';

const Logout = () => {
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5000/logout', {
        method: 'POST',
        credentials: 'include', // Send cookies along with the request
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      // Log out was successful, do additional actions if needed
      console.log('User logged out');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>Logout</Typography>
      <Typography variant="body1">Are you sure you want to logout?</Typography>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
