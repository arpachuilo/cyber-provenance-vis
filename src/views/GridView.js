import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import * as d3 from 'd3'
import moment from 'moment'

import { toggleFilter, updateFilter } from '../redux/actions'
import IpTable from '../components/ipTable'
import Histogram from '../components/histogram'
import BadgeNetwork from '../components/BadgeNetwork'
import SimpleNetworkGraph from '../components/SimpleNetworkGraph'

// NOTE: Constructs a date string for VAST 2009 dataset
const makeDateString = (day, hour, minute) => {
  let paddedDay = (day + '').length === 1 ? '0' + day : day
  let paddedHour = (hour + '').length === 1 ? '0' + hour : hour
  let paddedMinute = (minute + '').length === 1 ? '0' + minute : minute
  return '2008-01-' + paddedDay + 'T' + paddedHour + ':' + paddedMinute
}

class GridView extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      day: 1,
      hour: 0,
      minute: 0,
      selectedTime: moment(makeDateString(1, 0, 0))
    }

    this.detailXAxisTickFunc = (d, i) => {
      let timeFormat = d3.timeFormat('%H:%M:%S')
      return timeFormat(d)
    }

    this.onRowClick = this.onRowClick.bind(this)
    this.onHistogramBrushEnd = this.onHistogramBrushEnd.bind(this)
    this.onOfficeClick = this.onOfficeClick.bind(this)

    this.handleDayChange = this.handleDayChange.bind(this)
    this.handleHourChange = this.handleHourChange.bind(this)
    this.handleMinuteChange = this.handleMinuteChange.bind(this)
    this.onInputMouseUp = this.onInputMouseUp.bind(this)
  }

  onInputMouseUp (event) {
    let dateString = makeDateString(this.state.day, this.state.hour, this.state.minute)
    let selectedTime = moment(dateString)
    this.setState({
      selectedTime
    })
  }

  handleDayChange (event) {
    this.setState({
      day: event.target.value
    })
  }

  handleHourChange (event) {
    this.setState({
      hour: event.target.value
    })
  }

  handleMinuteChange (event) {
    this.setState({
      minute: event.target.value
    })
  }

  onOfficeClick (d, i) {
    this.props.toggleFilter({
      'SourceIP': [d.IP]
    })
  }

  onRowClick (d, i) {
    // Make on cell click to allow of filtering of ip vs filtering of office number
    this.props.toggleFilter({
      'Office': [d.Office]
    })
  }

  onHistogramBrushEnd (range) {
    console.log(range)
    let accessTimeFilter = {
      'AccessTime': range
    }
    accessTimeFilter.AccessTime.isRange = true
    this.props.updateFilter(accessTimeFilter)
  }

  render () {
    return (
      <div>
        <div className='row'>
          <Histogram data={this.props.ipDataFiltered}
            margin={{top: 8, left: 55, bottom: 8, right: 0}}
            yLabel='Event Count' autoWidth height={180}
            xAxisTickFunction={this.detailXAxisTickFunc} />
        </div>
        <div className='row'>
          <Histogram data={this.props.ipData}
            margin={{top: 0, left: 55, bottom: 20, right: 0}}
            yLabel='Event Count' xLabel='Access Time'
            autoWidth height={90} brushable
            onBrushEnd={this.onHistogramBrushEnd} />
        </div>
        <div className='row'>
          <div className='six columns'>
            <div>
              <span>{makeDateString(this.state.day, this.state.hour, this.state.minute)}</span>
            </div>
            <div className='badgeNetworkInput'>
              <span>{'Day: '}</span>
              <input type='range' onMouseUp={this.onInputMouseUp} onChange={this.handleDayChange} value={this.state.day} min='1' max='31' step='1' />
            </div>
            <div className='badgeNetworkInput'>
              <span>{'Hour: '}</span>
              <input type='range' onMouseUp={this.onInputMouseUp} onChange={this.handleHourChange} value={this.state.hour} min='0' max='23' step='1' /> <br />
            </div>
            <div className='badgeNetworkInput'>
              <span>{'Minute: '}</span>
              <input type='range' onMouseUp={this.onInputMouseUp} onChange={this.handleMinuteChange} value={this.state.minute} min='0' max='59' step='1' /> <br />
            </div>
            <BadgeNetwork
              employeeData={this.props.employeeData}
              proxData={this.props.proxData.reverse()}
              selectedTime={this.state.selectedTime}
              className='badgeNetwork'
              autoWidth
              onClick={this.onOfficeClick} />
          </div>
          <div className='six columns'>
            <SimpleNetworkGraph data={this.props.ipDataFiltered} autoWidth />
          </div>
        </div>
        <div className='row'>
          <IpTable
            data={this.props.ipDataFiltered} className='twelve columns ipTable' />
        </div>
      </div>
    )
  }
}

GridView.defaultProps = {
  toggleFilter: () => {},
  updateFilter: () => {},
  ipData: [],
  proxData: [],
  employeeData: [],
  ipDataFiltered: [],
  proxDataFiltered: [],
  employeeDataFiltered: []
}

GridView.propTypes = {
  toggleFilter: PropTypes.func,
  updateFilter: PropTypes.func,
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
  toggleFilter,
  updateFilter
}

export default connect(mapStateToProps, mapDispatchToProps)(GridView)
