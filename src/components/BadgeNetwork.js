import React, { PropTypes } from 'react'
import * as d3 from 'd3' // TODO: Reduce what's needed here

// NOTE: This is visualization was created specifically for the vast 2009 dataset
class BadgeNetwork extends React.Component {
  constructor (props) {
    super(props)

    this.createChart = this.createChart.bind(this)
    this.updateChart = this.updateChart.bind(this)
    this.removeChart = this.removeChart.bind(this)
  }

  createChart () {
    let root = d3.select(this.refs.root)

    // Get real chart width/height
    let width = this.props.width
    let height = this.props.height
    if (this.props.autoWidth) {
      width = root.node().offsetWidth
    }

    let svg = root.append('svg')
      .attr('width', width)
      .attr('height', height)
    this.chart = svg.append('g')
    this.officeContainer = this.chart.append('g')
      .attr('class', 'offices')
    this.classifiedContainer = this.chart.append('g')
      .attr('class', 'offices')
  }

  updateChart () {
    // NOTE: Scale domains require a 'wrapped' index
    let xScale = d3.scaleBand()
      .domain(d3.range(0, 12))
      .range([0, this.props.width])

    let yScale = d3.scaleBand()
      .domain(d3.range(0, 5))
      .range([this.props.height, 0])

    let offices = this.officeContainer.selectAll('office')
      .data(this.props.data)

    offices = offices.enter()
      .append('g')
        .attr('class', 'office')
        .attr('transform', (d, i) => {
          let x = xScale(i % 12)
          let y = this.props.height - yScale(Math.floor(i / 12)) - yScale.bandwidth()
          return 'translate(' + x + ',' + y + ')'
        })
        .on('mouseover', (d, i) => {
          console.log(d)
        })
    offices.append('rect')
      .attr('fill', 'white')
      .attr('stroke', 'black')
      .attr('width', xScale.bandwidth())
      .attr('height', yScale.bandwidth())
    offices.append('text')
      .attr('x', xScale.bandwidth() / 2 - 16)
      .attr('y', yScale.bandwidth() / 2)
      .text((d) => {
        return d.Office + '-' + d.EmployeeID
      })
  }

  removeChart () {
    let root = d3.select(this.refs.root)
    root.selectAll('*').remove()
  }

  componentDidMount () {
    this.createChart()
    this.updateChart()
  }

  componentWillUnmount () {
    this.removeChart()
  }

  shouldComponentUpdate () {
    this.updateChart()
    return false
  }

  render () {
    return (
      <div ref='root' />
    )
  }
}

BadgeNetwork.defaultProps = {
  autoWidth: false,
  width: 640,
  height: 640
}

BadgeNetwork.propTypes = {
  data: PropTypes.array,
  autoWidth: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number
}

export default BadgeNetwork
