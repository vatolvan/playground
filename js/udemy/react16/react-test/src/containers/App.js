import React, { Component } from 'react';
import cssClasses from './App.css';
import Person from '../components/Persons/Person/Person';

class App extends Component {
  state = {
    persons: [
      {id: '1', name: "Ville", age: 28},
      {id: '2', name: "Ville2", age: 29},
      {id: '3', name: "Ville3", age: 30}
    ],
    showPersons: false
  }

  nameChangedHandler = (event, id) => {
    const person = this.state.persons.findIndex(e => e.id === id);
    const persons = [...this.state.persons];
    persons[person].name = event.target.value;

    this.setState({persons: persons})
  }

  deletePersonHandler = (personIndex) => {
    const persons = this.state.persons.slice();
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  togglePersonsHandler = () => {
    this.setState({
      showPersons: !this.state.showPersons
    })
  }

  render() {
    let persons = null;
    let btnClass = '';

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((e, i) => {
            return <Person
                  click={this.deletePersonHandler.bind(this, i)}
                  key={e.id}
                  name={e.name}
                  age={e.age}
                  changed={(event) => this.nameChangedHandler(event, e.id)}/>
          })}
        </div>
      )
      btnClass = cssClasses.Red;
    }

    const classes = [];
    if (this.state.persons.length <= 2) {
      classes.push(cssClasses.red);
      if (this.state.persons.length <= 1) {
        classes.push(cssClasses.bold);
      }
    }

    return (
      <div className={cssClasses.App}>
        <h1>Hello</h1>
        <p className={classes.join(' ')}>This is really working</p>
        <button className={btnClass}
          onClick={this.togglePersonsHandler}>Switch name</button>
        {persons}
      </div>
    );
  }
}

export default App;
