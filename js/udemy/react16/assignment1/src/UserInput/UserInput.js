import React from 'react'

const userInput = (props) => {
  const style = {
    background: 'black',
    color: 'white'
  }
  return (
    <input
      style={style}
      type="text" onChange={props.changeName} value={props.name}/>
  );
}

export default userInput;
