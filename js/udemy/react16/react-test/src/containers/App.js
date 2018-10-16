import React, { PureComponent } from 'react';
import cssClasses from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import WithClass from '../hoc/withClass';

export const AuthContext = React.createContext(false);

class App extends PureComponent {
  constructor(props) {
    super(props);
    console.log('[App.js] Inside constructo())', props)
  }

  componentWillMount() {
    console.log('[App.js] Inside componentWillMount()')
  }


  componentDidMount() {
    console.log('[App.js] Inside componentDidMount()')
  }

  componentWillReceiveProps(nextProps) {
    console.log('[UPDATE App.js] inside componentWillReceiveProps');
    console.log(nextProps);
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('[UPDATE App.js] Inside componentWillUpdate', nextProps, nextState);
  }

  componentDidUpdate() {
    console.log('[UPDATE App.js] Inside componentDidUpdate');
  }

  state = {
    persons: [
      {id: '1', name: "Ville", age: 28},
      {id: '2', name: "Ville2", age: 29},
      {id: '3', name: "Ville3", age: 30}
    ],
    showPersons: false,
    toggleClicked: 0,
    authenticated: false
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
    this.setState( (previousState, props) => {
      return {
        showPersons: !previousState.showPersons,
        toggleClicked: previousState.toggleClicked + 1

      }
    })
  }

  loginHandler = () => {
    this.setState({authenticated: true});
  }

  render() {
    console.log('[App.js] Inside render()');
    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          <Persons
           persons={this.state.persons}
           clicked={this.deletePersonHandler}
           changed={this.nameChangedHandler} />
        </div>
      )
    }

    return (
      <WithClass classes={cssClasses.App}>
        <button onClick={() => {this.setState({showPersons: true})}}>Show persons</button>
        <Cockpit
          appTitle={this.props.title}
          showPersons={this.state.showPersons}
          persons={this.state.persons}
          login={this.loginHandler}
          toggle={this.togglePersonsHandler}/>
        <AuthContext.Provider value={this.state.authenticated}>
          {persons}
        </AuthContext.Provider>
      </WithClass>
    );
  }

}

export default App;
