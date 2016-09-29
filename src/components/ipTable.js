import React, { PropTypes } from 'react'

import { Table, Column, Cell } from './table'
import { ipToInt } from '../util'

class HeaderCell extends React.Component {
  constructor (props) {
    super(props)

    this.onClick = this.onClick.bind(this)
  }
  onClick () {
    this.props.onClick(this.props.columnKey)
  }
  render () {
    let { sortBy, sortOrder, columnKey } = this.props
    let symbol = ''
    if (sortBy === columnKey) {
      symbol = sortOrder === 'asc' ? '\u2191' : '\u2193'
    }
    return (
      <Cell>
        <a onClick={this.onClick}>{this.props.children + ' ' + symbol}</a>
      </Cell>
    )
  }
}
HeaderCell.propTypes = {
  onClick: PropTypes.func,
  sortBy: PropTypes.string,
  sortOrder: PropTypes.string,
  columnKey: PropTypes.string,
  children: PropTypes.string
}

class TextCell extends React.Component {
  render () {
    let { data, columnKey, ...props } = this.props
    let text = data[columnKey] !== ''
      ? data[columnKey]
      : props.defaultText

    return (
      <Cell data={data} {...props}>
        <span title={text}>{text}</span>
      </Cell>
    )
  }
}
TextCell.propTypes = {
  data: PropTypes.any,
  columnKey: PropTypes.any
}

export class ipTable extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      page: 0,
      pageSize: 20,
      sortBy: 'ReqSize',
      sortOrder: 'asc'
    }

    this.prevPage = this.prevPage.bind(this)
    this.nextPage = this.nextPage.bind(this)

    this.updateSort = this.updateSort.bind(this)
  }

  updateSort (sortKey) {
    // If currently selected, flip sortOrder
    if (sortKey === this.state.sortBy) {
      this.setState({
        sortOrder: this.state.sortOrder === 'asc' ? 'desc' : 'asc'
      })
    } else {
      this.setState({
        sortBy: sortKey,
        sortOrder: 'asc'
      })
    }
  }

  prevPage () {
    if (this.state.page > 0) {
      this.setState({
        page: this.state.page - 1
      })
    }
  }

  nextPage () {
    let maxPages = Math.floor(this.props.data.length / this.state.pageSize)
    if (this.state.page < maxPages) {
      this.setState({
        page: this.state.page + 1
      })
    }
  }

  render () {
    // Sort data
    // NOTE: Refactor later into shouldComponentUpdate
    let dataTransform = (d) => +d
    if (this.state.sortBy === 'AccessTime') {
      dataTransform = (d) => +new Date(d)
    } else if (this.state.sortBy === 'SourceIP' || this.state.sortBy === 'DestIP') {
      dataTransform = (d) => ipToInt(d)
    }
    let sortedData = this.props.data.sort((a, b) => {
      return this.state.sortOrder === 'asc'
        ? dataTransform(a[this.state.sortBy]) - dataTransform(b[this.state.sortBy])
        : dataTransform(b[this.state.sortBy]) - dataTransform(a[this.state.sortBy])
    })

    // Get page of data
    let start = this.state.page * this.state.pageSize
    let dataSubset = sortedData.slice(start, start + this.state.pageSize)
    return (
      <div className={this.props.className}>
        <Table
          onRowClick={this.props.onRowClick}
          data={dataSubset}>
          <Column
            columnKey='AccessTime'
            header={
              <HeaderCell onClick={this.updateSort}
                sortBy={this.state.sortBy}
                sortOrder={this.state.sortOrder}>
                Access Time
              </HeaderCell>}>
            <TextCell />
          </Column>
          <Column
            columnKey='SourceIP'
            header={
              <HeaderCell onClick={this.updateSort}
                sortBy={this.state.sortBy}
                sortOrder={this.state.sortOrder}>
                Source IP
              </HeaderCell>}>
            <TextCell />
          </Column>
          <Column
            columnKey='DestIP'
            header={
              <HeaderCell onClick={this.updateSort}
                sortBy={this.state.sortBy}
                sortOrder={this.state.sortOrder}>
                Destination IP
              </HeaderCell>}>
            <TextCell />
          </Column>
          <Column
            columnKey='Socket'
            header={
              <HeaderCell onClick={this.updateSort}
                sortBy={this.state.sortBy}
                sortOrder={this.state.sortOrder}>
                Socket
              </HeaderCell>}>
            <TextCell />
          </Column>
          <Column
            columnKey='ReqSize'
            header={
              <HeaderCell onClick={this.updateSort}
                sortBy={this.state.sortBy}
                sortOrder={this.state.sortOrder}>
                Request Size
              </HeaderCell>}>
            <TextCell />
          </Column>
          <Column
            columnKey='RespSize'
            header={
              <HeaderCell onClick={this.updateSort}
                sortBy={this.state.sortBy}
                sortOrder={this.state.sortOrder}>
                Response Size
              </HeaderCell>}>
            <TextCell />
          </Column>
        </Table>
        <button className='prevBtn' onClick={this.prevPage}>
          Previous
        </button>
        <div className='info'>
          <span>
            {'Page' + ' ' + this.state.page + ' of ' + Math.floor(this.props.data.length / this.state.pageSize)}
          </span>
          <span>
            {' || ' + this.props.data.length + ' results'}
          </span>
        </div>
        <button className='nextBtn' onClick={this.nextPage}>
          Next
        </button>
      </div>
    )
  }
}

ipTable.defaultProps = {
  onRowClick: () => {},
  className: '',
  data: []
}

ipTable.propTypes = {
  onRowClick: PropTypes.func,
  className: PropTypes.string,
  data: PropTypes.array
}

export default ipTable
