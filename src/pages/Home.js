import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { GridView } from '../views/GridView'

class Home extends React.Component {
  render () {
    return (
      <div className='container'>
        <div className='row'>
          <GridView items={this.props.items} />
        </div>
      </div>
    )
  }
}

Home.defaultProps = {
  items: []
}

Home.propTypes = {
  items: PropTypes.any
}

const mapStateToProps = (state) => {
  return {
    items: state.list.items
  }
}

export default connect(mapStateToProps, {})(Home)
