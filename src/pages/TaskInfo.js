import React from 'react'
import { Link } from 'react-router'

class TaskInfo extends React.Component {
  render () {
    return (
      <div className='container'>
        <div className='row'>
          <h5>Your Task</h5>
          <p>You will be given 1 hour once you hit start to find as many suspicious events as possible.</p>
        </div>
        <div className='row'>
          <Link to='/vis'>START</Link>
        </div>
      </div>
    )
  }
}

export default TaskInfo
