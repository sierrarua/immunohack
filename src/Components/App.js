import React, { Component } from 'react';
import '../App.css';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { browserHistory } from 'react-router';
import HomePage from './HomePage';
import NavBar from './NavBar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">FACCINE: The most helpful tool for managing your family's health</h1>
          <h4> Managing your family's timeline for vaccinations </h4>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Router>
          <div>
            <NavBar />
            <Route name="home" exact path="/" component={HomePage} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
