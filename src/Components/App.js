import React, { Component } from 'react';
import '../App.css';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { browserHistory } from 'react-router';
import HomePage from './HomePage';
import NavBar from './NavBar';
import Login from './Login';
import Register from './Register';
<<<<<<< HEAD
import UserPage from './UserPage';
=======
>>>>>>> bcb8fcecc78a5cd2b40f5aef45da81e3d6f54e3f

class App extends Component {
  constructor() {
    super();
    this.state = {
      login: false,
      register: false,
      homepage: true,
      userpage: false
    }
  }

  toLogin = () => {
    this.setState({
      login: true,
      register: false,
      homepage: false
    });
  }
  toRegister = () => {
    this.setState({
      login: false,
      register: true,
      homepage: false
    });
  }
  toHomepage = () => {
    this.setState({
      login: false,
      register: false,
      homepage: true
    });
  }

  render() {
    return (
      <div className="App">
        {this.state.login ? <Login toHomepage={this.toHomepage} /> : null}
        {this.state.register ? <Register toHomepage={this.toHomepage}/> : null}
        {this.state.homepage ? <HomePage toLogin={this.toLogin} toRegister={this.toRegister}/> : null}
        {this.state.userpage ? <UserPage/> : null}
      </div>
    );
  }
}

export default App;
