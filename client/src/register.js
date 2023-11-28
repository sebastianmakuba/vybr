import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TextField, Button, Typography } from '@mui/material';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [interests, setInterests] = useState('');

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
          interests: interests,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Registration successful:', data.message);
        // Optionally, redirect the user to the login page
      } else {
        console.error('Registration failed:', data.message);
        // Display an error message to the user
      }
    } catch (error) {
      console.error('Error during registration:', error);
      // Handle other potential errors (e.g., network issues)
    }
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>Register</Typography>
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Interests"
        value={interests}
        onChange={(e) => setInterests(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleRegister}>
        Register
      </Button>
      <Typography variant="body2" style={{ marginTop: '1rem' }}>
        Already have an account? <Link to="/login">Login</Link>
      </Typography>
    </div>
  );
};

export default Register;
