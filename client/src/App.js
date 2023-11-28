import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Register from './register';
import Profile from './profile';
import Logout from './components/login';
import NotFound from './notfound';
import NavBar from './navbar';
import { Container } from '@mui/material';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Container maxWidth="md">
          <Routes>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/profile" component={Profile} />
            <Route path="/logout" component={Logout} />
            <Route component={NotFound} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;
