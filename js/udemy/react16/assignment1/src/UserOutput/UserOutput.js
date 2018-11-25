import React from 'react'

import './UserOutput.css'

const userOutput = (props) => {
  return (
    <div className="UserOutput">
      <p>Username: {props.name}</p>
      <p>This is a second line of userOutput</p>
    </div>
  )
}

export default userOutput;
