import React from 'react'
import { Link } from 'react-router'

import GridView from '../views/GridView'

class Vis extends React.Component {
  render () {
    return (
      <div className='container'>
        <div className='row'>
          <GridView />
        </div>
        <div className='row'>
          <Link to='/questionnaire'>NEXT</Link>
        </div>
      </div>
    )
  }
}

export default Vis
