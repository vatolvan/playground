import React, { Component } from 'react';

import './App.css';
import UserInput from './UserInput/UserInput'
import UserOutput from './UserOutput/UserOutput'

class App extends Component {
  state = {
    username: "Username"
  }

  changeUserNameHandler = (event) => {
    this.setState({
      username: event.target.value
    })
  }

  render() {
    return (
      <div className="App">
        <h1>Assignment 1</h1>
        <UserInput changeName={this.changeUserNameHandler} name={this.state.username}/>
        <UserOutput name={this.state.username}/>
      </div>
    );
  }
}

export default App;
