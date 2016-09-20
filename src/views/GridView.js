import React from 'react'

import ipData from '../data/IPLog3.5.csv'
import proxData from '../data/proxLog.csv'
import employeeData from '../data/employeeData.csv'

import EmployeeTable from '../components/employeeTable'
import Histogram from '../components/histogram'

export class GridView extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      ipData: ipData,
      proxData: proxData,
      employeeData: employeeData
    }
  }

  render () {
    return (
      <div>
        <div>
          <Histogram data={this.state.ipData} autoWidth />
        </div>
        <div>
          <EmployeeTable data={this.state.employeeData} className='employeeTable' />
        </div>
      </div>
    )
  }
}

export default GridView
