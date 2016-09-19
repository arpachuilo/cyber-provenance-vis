import React from 'react'

import employeeData from '../data/IPLog3.5.csv'

import Histogram from '../components/histogram'

export class GridView extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      data: employeeData
    }
  }

  render () {
    return (
      <div>
        <span>GridView</span>
        <ul>
          <Histogram data={this.state.data} />
        </ul>
      </div>
    )
  }
}

export default GridView
