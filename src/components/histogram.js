import React, { PropTypes } from 'react'
import * as d3 from 'd3' // Reduce what's needed here

class Histogram extends React.Component {
  constructor (props) {
    super(props)

    this.createChart = this.createChart.bind(this)
    this.updateChart = this.updateChart.bind(this)
    this.removeChart = this.removeChart.bind(this)
  }

  createChart () {
    let root = d3.select(this.refs.root)
    let svg = root.append('svg')
      .attr('width', this.props.width)
      .attr('height', this.props.height)
    this.chart = svg.append('g')
      .attr('transform', 'translate(' + this.props.margin.left + ',' + this.props.margin.top + ')')
  }

  updateChart () {
    console.log(this.props.data)
    let xScale = d3.scaleTime()
      .domain(d3.extent(this.props.data, (d) => +(new Date(d.AccessTime))))
      .range([0, this.props.width])

    let yScale = d3.scaleLinear()
      .domain([0, d3.max(this.props.data, (d) => parseInt(d.ReqSize))])
      .range([this.props.height, 0])

    let histogram = d3.histogram()
      .value((d) => +(new Date(d.AccessTime)))
      .domain(xScale.domain())
      .thresholds(xScale.ticks(20))

    console.log(xScale.domain(), yScale.domain(), histogram(this.props.data))
    // let xScale = d3.scaleOrdinalBand()
    //   .range([0, this.props.width])
    //
    // let histogram = d3.histogram()
    //   .domain(this.xScale())
    //   (this.props.data)
    //
    // let yScale = d3.scaleLinear()
    //   .range([this.props.height, 0])
    //
    //
    // // let bar = this.chart.selectAll('.bar')
    // this.chart.selectAll('.bar')
    //   .data(this.histogramData)
  }

  removeChart () {

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
    left: 20,
    bottom: 0,
    right: 0
  },
  width: 640,
  height: 360,
  xAccessor: 'key',
  yAccessor: 'value'
}

Histogram.propTypes = {
  data: PropTypes.array,
  margin: PropTypes.object,
  width: PropTypes.number,
  height: PropTypes.number,
  xAccessor: PropTypes.string,
  yAccessor: PropTypes.string
}

export default Histogram
