import React, { PropTypes } from 'react'
import * as d3 from 'd3' // TODO: Reduce what's needed here

class Histogram extends React.Component {
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

    this.chartWidth = width - this.props.margin.left - this.props.margin.right
    this.chartHeight = height - this.props.margin.top - this.props.margin.bottom

    let svg = root.append('svg')
      .attr('width', width + this.props.margin.left + this.props.margin.right)
      .attr('height', height + this.props.margin.top + this.props.margin.bottom)
    this.chart = svg.append('g')
      .attr('transform', 'translate(' + this.props.margin.left + ',' + this.props.margin.top + ')')
    this.xAxis = this.chart.append('g')
      .attr('class', 'axis x-axis')
      .attr('transform', 'translate(0,' + this.chartHeight + ')')
    this.yAxis = this.chart.append('g')
      .attr('class', 'axis y-axis')
  }

  updateChart () {
    let xScale = d3.scaleTime()
      .domain(d3.extent(this.props.data, (d) => +(new Date(d.AccessTime))))
      .range([0, this.chartWidth])

    let yScale = d3.scaleLinear()
      .range([this.chartHeight, 0])

    let bins = d3.histogram()
      .value((d) => +(new Date(d.AccessTime)))
      .domain(xScale.domain())
      .thresholds(xScale.ticks(100))(this.props.data)

    yScale
      .domain([0, d3.max(bins, (d) => d.length)])

    let barContainer = this.chart.append('g')
        .attr('class', 'bars')

    barContainer.selectAll('.bar')
        .data(bins)
      .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', (d) => xScale(d.x0))
        .attr('y', (d) => yScale(d.length))
        .attr('width', (d) => xScale(d.x1) - xScale(d.x0))
        .attr('height', (d) => this.chartHeight - yScale(d.length))

    this.xAxis.call(d3.axisBottom(xScale))
    this.yAxis.call(d3.axisLeft(yScale))
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

Histogram.defaultProps = {
  data: [],
  margin: {
    top: 15,
    left: 45,
    bottom: 15,
    right: 0
  },
  numBins: 10,
  autoWidth: false,
  width: 640,
  height: 360,
  xAccessor: 'key',
  yAccessor: 'value'
}

Histogram.propTypes = {
  data: PropTypes.array,
  margin: PropTypes.object,
  autoWidth: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
  numBins: PropTypes.number,
  xAccessor: PropTypes.string,
  yAccessor: PropTypes.string
}

export default Histogram
