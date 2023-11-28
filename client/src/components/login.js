import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TextField, Button, Typography } from '@mui/material';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      // Login successful, perform necessary actions (redirect, set session, etc.)
      console.log('Login successful!');
    } catch (err) {
      setError(err.message || 'An error occurred during login.');
    }
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>Login</Typography>
      {error && <Typography variant="body2" color="error">{error}</Typography>}
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
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login
      </Button>
      <Typography variant="body2" style={{ marginTop: '1rem' }}>
        Don't have an account? <Link to="/register">Register</Link>
      </Typography>
    </div>
  );
};

export default Login;
