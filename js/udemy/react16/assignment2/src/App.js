import React, { Component } from 'react';
import './App.css';

import ValidationComponent from './ValidationComponent/ValidationComponent'
import CharComponent from './CharComponent/CharComponent'

class App extends Component {

  state = {
    input: "",
    inputLength: 0
  }

  inputChangeListener = (event) => {
    this.setState({
      input: event.target.value,
      inputLength: event.target.value.length
    });
  }

  deleteStateHandler = (index) => {
    let newInput = [...this.state.input];
    newInput.splice(index, 1);
    this.setState({
      input: newInput.join(""),
      inputLength: newInput.length
    });
  }

  render() {

    let chars = Array.prototype.map.call(this.state.input, (e, i) => {
      return <CharComponent
        value={e}
        click={() => this.deleteStateHandler(i)}
        key={e+i}/>
    });


    return (
      <div className="App">
        <h1>Assignment 2</h1>
        <input type="text"
          onChange={this.inputChangeListener}
          value={this.state.input}/>
        <ValidationComponent textLength={this.state.inputLength}/>
        {chars}
      </div>
    );
  }
}

export default App;
