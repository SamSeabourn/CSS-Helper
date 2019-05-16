import React from 'react';
import './App.css';
import Home from './Home'
import SignIn from './SignIn';
import axios from 'axios';
import SignUp from './SignUp';
import SlaveControlPanel from './SlaveControlPanel';
import SlaveMenu from './SlaveMenu';
import { Redirect } from 'react-router-dom'


function App() {
  return (
    <div className="container">
      <Home />
    </div>
  );
}

export default App;
