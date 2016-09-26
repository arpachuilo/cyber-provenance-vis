import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { toggleFilter } from '../redux/actions'
import EmployeeTable from '../components/employeeTable'
import IpTable from '../components/ipTable'
import Histogram from '../components/histogram'
import SimpleNetworkGraph from '../components/SimpleNetworkGraph'

class GridView extends React.Component {
  constructor (props) {
    super(props)

    this.onRowClick = this.onRowClick.bind(this)
  }

  onRowClick (d, i) {
    // Make on cell click to allow of filtering of ip vs filtering of office number
    this.props.toggleFilter({
      'Office': [d.Office]
    })
  }

  render () {
    return (
      <div>
        <div>
          <Histogram data={this.props.ipData} autoWidth />
        </div>
        <div className='row'>
          <EmployeeTable
            onRowClick={this.onRowClick}
            data={this.props.employeeData} className='four columns employeeTable' />
          <IpTable
            data={this.props.ipData} className='eight columns ipTable' />
        </div>
        <div>
          <EmployeeTable data={this.props.employeeDataFiltered} className='employeeTable' />
        </div>
        <div>
          <SimpleNetworkGraph data={this.props.ipData} />
        </div>
      </div>
    )
  }
}

GridView.defaultProps = {
  toggleFilter: () => {},
  ipData: [],
  proxData: [],
  employeeData: [],
  ipDataFiltered: [],
  proxDataFiltered: [],
  employeeDataFiltered: []
}

GridView.propTypes = {
  toggleFilter: PropTypes.func,
  ipData: PropTypes.array,
  proxData: PropTypes.array,
  employeeData: PropTypes.array,
  ipDataFiltered: PropTypes.array,
  proxDataFiltered: PropTypes.array,
  employeeDataFiltered: PropTypes.array
}

const mapStateToProps = (state) => {
  return {
    ipData: state.vast.ipData,
    proxData: state.vast.proxData,
    employeeData: state.vast.employeeData,
    ipDataFiltered: state.vast.ipDataFiltered,
    proxDataFiltered: state.vast.proxDataFiltered,
    employeeDataFiltered: state.vast.employeeDataFiltered
  }
}

const mapDispatchToProps = {
  toggleFilter
}

export default connect(mapStateToProps, mapDispatchToProps)(GridView)
