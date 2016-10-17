import React from 'react'

import GridView from '../views/GridView'

class Vis extends React.Component {
  componentDidMount () {
    setTimeout(() => {
      // Redirect page predefined time limit
      this.context.router.push('/end')
    }, 1000 * 60 * 10)
  }
  render () {
    return (
      <div className='container'>
        <div className='row'>
          <GridView />
        </div>
      </div>
    )
  }
}

Vis.contextTypes = {
  router: React.PropTypes.any.isRequired
}

export default Vis
