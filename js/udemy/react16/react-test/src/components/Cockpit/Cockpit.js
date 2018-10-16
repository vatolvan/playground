import React, {Fragment} from 'react';

import classes from './Cockpit.css'
import Aux from '../../hoc/Aux';

const cockpit = (props) => {
  let btnClass = classes.Button;

  if (props.showPersons) {
    btnClass = [classes.Button, classes.Red].join(' ');
  }

  const assignedClasses = [];
  if (props.persons.length <= 2) {
    assignedClasses.push(classes.red);
    if (props.persons.length <= 1) {
      assignedClasses.push(classes.bold);
    }
  }

  return (
    <Fragment>
      <h1>{props.appTitle}</h1>
      <p className={assignedClasses.join(' ')}>This is really working</p>
      <button className={btnClass}
        onClick={props.toggle}>Switch name</button>
      <button onClick={props.login}>Log in!</button>
    </Fragment>
  );
};

export default cockpit;
