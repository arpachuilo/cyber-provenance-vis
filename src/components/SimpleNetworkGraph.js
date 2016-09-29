import React, { PropTypes } from 'react'
import has from 'lodash.has'
import * as d3 from 'd3' // TODO: Reduce what's needed here

class SimpleNetworkGraph extends React.Component {
  constructor (props) {
    super(props)

    this.nodes = []
    this.links = []

    this.createChart = this.createChart.bind(this)
    this.updateChart = this.updateChart.bind(this)
    this.removeChart = this.removeChart.bind(this)
    this.generateGraph = this.generateGraph.bind(this)
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
    this.srcNodeContainer = this.chart.append('g')
      .attr('class', 'source node')
    this.dstNodeContainer = this.chart.append('g')
      .attr('class', 'dest node')
    this.linkContainer = this.chart.append('g')
      .attr('class', 'dest node')
  }

  updateChart () {
    this.generateGraph()

    // Create source nodes
    let srcScale = d3.scalePoint()
      .domain(this.nodes.filter((d) => d.type === 'SourceIP').map((d) => d.key))
      .range([0, this.chartWidth])

    let srcNodes = this.srcNodeContainer.selectAll('.node')
      .data(srcScale.domain(), (d) => d)

    srcNodes.exit().remove()

    srcNodes.enter().append('circle')
      .attr('class', 'node')
      .attr('cx', (d) => srcScale(d))
      .attr('cy', 0)
      .attr('r', 4)

    // Create dest nodes
    let dstScale = d3.scalePoint()
      .domain(this.nodes.filter((d) => d.type === 'DestIP').map((d) => d.key))
      .range([0, this.chartWidth])

    let dstNodes = this.dstNodeContainer.selectAll('.node')
      .data(dstScale.domain(), (d) => d)

    dstNodes.exit().remove()

    dstNodes.enter().append('circle')
      .attr('class', 'node')
      .attr('cx', (d) => dstScale(d))
      .attr('cy', this.chartHeight)
      .attr('r', 4)

    // Create links
    let links = this.linkContainer.selectAll('.links')
      .data(this.links, (d) => d.sourc + ' ' + d.target)

    links.exit().remove()

    let line = d3.line()
      .x((d) => srcScale(d.source))
      .y((d) => dstScale(d.target))

    links.enter().append('path')
      .attr('class', 'link')
      .attr('d', line)
  }

  generateGraph () {
    // Generate nodes
    let nodeFlags = {}
    for (let i = 0; i < this.props.data.length; i++) {
      let datum = this.props.data[i]
      // Get source
      let sourceFlagKey = datum.SourceIP.replace('.', '')
      if (!has(nodeFlags, sourceFlagKey)) {
        nodeFlags[sourceFlagKey] = true
        this.nodes.push({
          'key': datum.SourceIP,
          'type': 'SourceIP'
        })
      }

      // Get dest
      let destFlagKey = datum.DestIP.replace('.', '')
      if (!has(nodeFlags, destFlagKey)) {
        nodeFlags[destFlagKey] = true
        this.nodes.push({
          'key': datum.DestIP,
          'type': 'DestIP'
        })
      }
    }

    // Generate links
    let linkFlags = {}
    for (let i = 0; i < this.props.data.length; i++) {
      let datum = this.props.data[i]

      let linkFlagKey = datum.SourceIP.replace('.', '') +
        '-' + datum.DestIP.replace('.', '')
      if (!has(linkFlags, linkFlagKey)) {
        linkFlags[linkFlagKey] = true
        this.links.push({
          'source': datum.SourceIP,
          'target': datum.DestIP,
          'ReqSize': +datum.ReqSize,
          'RespSize': +datum.RespSize
        })
      } else {
        for (let j = 0; j < this.links.length; j++) {
          if (this.links[j].source === datum.SourceIP && this.links[j].target === datum.DestIP) {
            this.links[j].ReqSize += (+datum.ReqSize)
            this.links[j].RespSize += (+datum.RespSize)
            break
          }
        }
      }
    }
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

SimpleNetworkGraph.defaultProps = {
  data: [],
  margin: {
    top: 15,
    left: 15,
    bottom: 15,
    right: 15
  },
  autoWidth: false,
  width: 640,
  height: 640,
  keyAccessor: 'key',
  valueAccessor: 'ReqSize'
}

SimpleNetworkGraph.propTypes = {
  data: PropTypes.array,
  margin: PropTypes.object,
  autoWidth: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
  numBins: PropTypes.number,
  keyAccessor: PropTypes.string,
  valueAccessor: PropTypes.string
}

export default SimpleNetworkGraph
