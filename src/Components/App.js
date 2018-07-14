import React, { Component } from 'react';
import '../App.css';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { browserHistory } from 'react-router';
import HomePage from './HomePage';
import NavBar from './NavBar';
import Login from './Login';
import Register from './Register';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Login />
        <Register />
        <HomePage />
      </div>
    );
  }
}

export default App;
