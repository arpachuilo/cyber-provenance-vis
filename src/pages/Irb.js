import React from 'react'
import { Link } from 'react-router'

class Irb extends React.Component {
  render () {
    return (
      <div className='container'>
        <div className='row'>
          <p>This is where IRB information will go . . .</p>
        </div>
        <div className='row'>
          <Link to='/background'>NEXT</Link>
        </div>
      </div>
    )
  }
}

export default Irb
