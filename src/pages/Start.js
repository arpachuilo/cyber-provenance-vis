import React from 'react'
import { Link } from 'react-router'

class Start extends React.Component {
  render () {
    return (
      <div className='container'>
        <div className='row'>
          <p>Click 'START' whenever you are ready</p>
        </div>
        <div className='row'>
          <h5><Link to='/vis'>START</Link></h5>
        </div>
      </div>
    )
  }
}

export default Start
