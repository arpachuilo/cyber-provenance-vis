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

export class EmployeeTable extends React.Component {
  render () {
    return (
      <div className={this.props.className}>
        <Table
          data={this.props.data}>
          <Column
            columnKey='EmployeeID'
            header={
              <HeaderCell>
                Employee ID
              </HeaderCell>}>
            <TextCell />
          </Column>
          <Column
            columnKey='IP'
            header={
              <HeaderCell>
                IP
              </HeaderCell>}>
            <TextCell />
          </Column>
          <Column
            columnKey='Office'
            header={
              <HeaderCell>
                Office
              </HeaderCell>}>
            <TextCell />
          </Column>
        </Table>
      </div>
    )
  }
}

EmployeeTable.defaultProps = {
  className: '',
  data: []
}

EmployeeTable.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array
}

export default EmployeeTable
