import React from 'react'

import employeeData from '../data/IPLog3.5.csv'

import EmployeeTable from '../components/employeeTable'
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
        <div>
          <Histogram data={this.state.data} />
        </div>
        <div>
          <EmployeeTable data={this.state.data} />
        </div>
      </div>
    )
  }
}

export default GridView
