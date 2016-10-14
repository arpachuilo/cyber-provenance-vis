import React from 'react'
import { Link } from 'react-router'

import GridView from '../views/GridView'

class Vis extends React.Component {
  componentDidMount () {
    setTimeout(() => {
      // Redirect page predefined time limit
      // this.context.router.push('/irb')
    }, 6 * 1000)
  }
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

Vis.contextTypes = {
  router: React.PropTypes.any.isRequired
}

export default Vis
