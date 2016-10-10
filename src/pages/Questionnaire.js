import React from 'react'
import { Link } from 'react-router'

class Background extends React.Component {
  render () {
    return (
      <div className='container'>
        <div className='row'>
          <Link to='/end'>NEXT</Link>
        </div>
      </div>
    )
  }
}

export default Background
