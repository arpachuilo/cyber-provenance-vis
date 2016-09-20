import React, { PropTypes, Children, cloneElement } from 'react'

class Row extends React.Component {
  constructor (props) {
    super(props)

    this.onClick = this.onClick.bind(this)
  }

  onClick (event) {
    this.props.onClick(this.props.data, this.props.index)
  }

  render () {
    let { Component, data, children } = this.props
    return (
      <Component onClick={this.onClick} data={data}>
        {children}
      </Component>
    )
  }
}

Row.defaultProps = {
  onClick: () => {}
}
Row.propTypes = {
  onClick: PropTypes.func,
  data: PropTypes.any,
  index: PropTypes.number,
  Component: PropTypes.any,
  children: PropTypes.any
}

class Column extends React.Component {
  constructor (props) {
    super(props)

    this.onClick = this.onClick.bind(this)
  }

  onClick (event) {
    event.stopPropagation() // Prevent row click handler from firing
    this.props.onColumnClick(this.props.data, this.props.columnKey)
  }

  render () {
    let { Component, data, index, columnKey, children } = this.props

    let conditionalProp = {}
    if (this.props.onColumnClick !== null) {
      conditionalProp.onClick = this.onClick
    }

    return (
      <Component {...conditionalProp} className={columnKey}>
        {cloneElement(Children.only(children), {
          data,
          index,
          columnKey
        })}
      </Component>
    )
  }
}

Column.defaultProps = {
  onColumnClick: null
}

Column.propTypes = {
  onColumnClick: PropTypes.func,
  Component: PropTypes.any,
  children: PropTypes.any,
  index: PropTypes.any,
  data: PropTypes.any,
  columnKey: PropTypes.string
}

class Cell extends React.Component {
  render () {
    let { Component, children } = this.props
    return (
      <Component>
        {children}
      </Component>
    )
  }
}

Cell.defaultProps = {
  Component: 'span'
}

Cell.propTypes = {
  Component: PropTypes.any,
  className: PropTypes.any,
  children: PropTypes.any
}

class Table extends React.Component {
  render () {
    let { RowComponent, onRowClick, children, data } = this.props
    return (
      <table>
        <thead>
          <Row Component='tr'>
            {children.map((e, i) => {
              return (
                <Column key={i} Component='th' columnKey={e.props.columnKey}>
                  {e.props.header}
                </Column>
              )
            })}
          </Row>
        </thead>
        <tbody>
          {data.map((d, i) => {
            return (
              <Row key={i} Component={RowComponent} onClick={onRowClick} data={d} index={i}>
                {children.map((e, j) => {
                  return cloneElement(e, {
                    key: j,
                    Component: 'td',
                    data: d,
                    index: i
                  })
                })}
              </Row>
            )
          })}
        </tbody>
      </table>
    )
  }
}

Table.defaultProps = {
  data: [],
  RowComponent: 'tr'
}

Table.propTypes = {
  RowComponent: PropTypes.any,
  onRowClick: PropTypes.any,
  children: PropTypes.any,
  data: PropTypes.array
}

export { Table, Row, Column, Cell }
