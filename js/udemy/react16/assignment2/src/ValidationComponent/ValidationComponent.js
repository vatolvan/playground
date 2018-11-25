import React from 'react'

const validationComponent = (props) => {
  const minLength = 5;
  let d = <div><p>Text too short</p></div>;
  if (props.textLength > minLength) {
    d = <div><p>Text long enough</p></div>;
  }
  return d;
}

export default validationComponent;
