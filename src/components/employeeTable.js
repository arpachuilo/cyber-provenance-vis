import React, { PropTypes } from 'react'
// import { connect } from 'react-redux'
// import { Link } from 'react-router'

import { Table, Column, Cell } from './table'
// import DraggableRow from './DraggableRow'
// import { updateTableSortBy } from '../actions'

// const SortTypes = {
//   ASC: 'ASC',
//   DESC: 'DESC'
// }

// Cell renderer that shows '↓' or '↑' when sorted by this column.
// class SortHeaderCell extends React.Component {
//   constructor (props) {
//     super(props)
//     this._onSortChange = this._onSortChange.bind(this)
//   }
//
//   _reverseSortDirection (sortDir) {
//     return sortDir === SortTypes.DESC ? SortTypes.ASC : SortTypes.DESC
//   }
//
//   _onSortChange (e) {
//     e.preventDefault()
//     if (this.props.onSortChange) {
//       this.props.onSortChange(
//         this.props.columnKey,
//         this.props.sortDir
//            ? this._reverseSortDirection(this.props.sortDir)
//            : SortTypes.DESC
//       )
//     }
//   }
//
//   render () {
//     const { sortDir, children } = this.props
//     return (
//       <Cell>
//         <a onClick={this._onSortChange}>
//           {children} {sortDir ? (sortDir === SortTypes.DESC ? '↓' : '↑') : ''}
//         </a>
//       </Cell>
//     )
//   }
// }
// SortHeaderCell.propTypes = {
//   columnKey: PropTypes.string,
//   sortDir: PropTypes.string,
//   onSortChange: PropTypes.func,
//   children: PropTypes.string
// }

// class HeaderCell extends React.Component {
//   render () {
//     return (
//       <Cell>
//         {this.props.children}
//       </Cell>
//     )
//   }
// }
// HeaderCell.propTypes = {
//   children: PropTypes.string
// }

// Cell renderer that displays the text.
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

// Cell renderer that displays the text.
// class LinkCell extends React.Component {
//   render () {
//     let { data, columnKey, toFunction, ...props } = this.props
//     let text = data[columnKey] !== ''
//       ? data[columnKey]
//       : props.defaultText
//
//     return (
//       <Cell data={data} {...props}>
//         <span title={text}>
//           <Link to={toFunction(data, columnKey)}>
//             {text}
//           </Link>
//         </span>
//       </Cell>
//     )
//   }
// }
// LinkCell.propTypes = {
//   toFunction: PropTypes.func,
//   data: PropTypes.any,
//   columnKey: PropTypes.any
// }

export class EmployeeTable extends React.Component {
  // constructor (props) {
  //   super(props)
  // }

  // Prevent row click handler from firing so the text of LinkCell can be clicked
  // _emptyClick () {}

  render () {
    return (
      <div className={this.props.className}>
        <Table
          data={this.props.data}>
          <Column
            columnKey='EmployeeID'
            header={
              <TextCell>
                Employee ID
              </TextCell>}>
            <TextCell />
          </Column>
          <Column
            columnKey='IP'
            header={
              <TextCell>
                IP
              </TextCell>}>
            <TextCell />
          </Column>
          <Column
            columnKey='Office'
            header={
              <TextCell>
                Office
              </TextCell>}>
            <TextCell />
          </Column>
        </Table>
      </div>
    )
  }
}

EmployeeTable.defaultProps = {
  data: []
}

EmployeeTable.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array
}

export default EmployeeTable
