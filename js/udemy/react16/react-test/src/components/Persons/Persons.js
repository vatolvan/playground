import React, {PureComponent} from 'react';

import Person from './Person/Person';

class Persons extends PureComponent {
  constructor(props) {
    super(props);
    console.log('[Persons.js] Inside constructo())', props)
    this.lastPersonRef = React.createRef();
  }

  componentWillMount() {
    console.log('[Persons.js] Inside componentWillMount()')
  }

  componentDidMount() {
    console.log('[Persons.js] Inside componentDidMount()')
    this.lastPersonRef.current.focus();
  }

  componentWillReceiveProps(nextProps) {
    console.log('[UPDATE Persons.js] inside componentWillReceiveProps');
    console.log(nextProps);
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('[UPDATE Persons.js] Inside componentWillUpdate', nextProps, nextState);
  }

  componentDidUpdate() {
    console.log('[UPDATE Persons.js] Inside componentDidUpdate');
  }

  render() {
    console.log('[Persons.js] Inside render()')
    return (this.props.persons.map((e, i) => {
        console.log(i);
        return <Person
              click={() => this.props.clicked(i)}
              key={e.id}
              name={e.name}
              age={e.age}
              position={i}
              ref={this.lastPersonRef}
              changed={(event) => this.props.changed(event, e.id)}/>
      }));
  }
}

export default Persons;
