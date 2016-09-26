import React, { PropTypes } from 'react'

import { Table, Column, Cell } from './table'

class HeaderCell extends React.Component {
  render () {
    return (
      <Cell>
        {this.props.children}
      </Cell>
    )
  }
}
HeaderCell.propTypes = {
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
      pageSize: 20
    }

    this.prevPage = this.prevPage.bind(this)
    this.nextPage = this.nextPage.bind(this)
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
    let start = this.state.page * this.state.pageSize
    let pagedSubset = this.props.data.slice(start, start + this.state.pageSize)
    return (
      <div className={this.props.className}>
        <Table
          onRowClick={this.props.onRowClick}
          data={pagedSubset}>
          <Column
            columnKey='AccessTime'
            header={
              <HeaderCell>
                Access Time
              </HeaderCell>}>
            <TextCell />
          </Column>
          <Column
            columnKey='SourceIP'
            header={
              <HeaderCell>
                Source IP
              </HeaderCell>}>
            <TextCell />
          </Column>
          <Column
            columnKey='DestIP'
            header={
              <HeaderCell>
                Destination IP
              </HeaderCell>}>
            <TextCell />
          </Column>
          <Column
            columnKey='Socket'
            header={
              <HeaderCell>
                Socket
              </HeaderCell>}>
            <TextCell />
          </Column>
          <Column
            columnKey='ReqSize'
            header={
              <HeaderCell>
                Request Size
              </HeaderCell>}>
            <TextCell />
          </Column>
          <Column
            columnKey='RespSize'
            header={
              <HeaderCell>
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
