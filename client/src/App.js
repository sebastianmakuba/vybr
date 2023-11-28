import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Logout from './components/Logout';
import NotFound from './components/NotFound';
import NavBar from './components/NavBar';
import { Container } from '@mui/material';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Container maxWidth="md">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/profile" component={Profile} />
            <Route path="/logout" component={Logout} />
            <Route component={NotFound} />
          </Switch>
        </Container>
      </div>
    </Router>
  );
}

export default App;
