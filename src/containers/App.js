import React, { PropTypes } from 'react'
import { Link } from 'react-router'

class App extends React.Component {
  render () {
    return (
      <div>
        <header>
          <div className='row'>
            <nav>
              <ul>
                <li><Link className='brand' to='/'> App </Link></li>
                <li><Link to='/home' activeClassName='active'>Home</Link></li>
              </ul>
            </nav>
          </div>
        </header>
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.any
}

export default App
