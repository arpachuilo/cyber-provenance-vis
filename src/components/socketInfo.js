import React, { PropTypes } from 'react'

class SocketInfo extends React.Component {
  render () {
    return (
      <div className={this.props.className}>
        <span>Socket Info</span>
        <dl>
          <dt>25</dt>
          <dd>Used for Simple Mail Transfer Protocol (SMTP), an Internet standard for electronic mail (email) transmission. Mail applications typically use SMTP only for sending messages to a mail server for relaying emails</dd>
          <dt>80</dt>
          <dd>Used for Hypertext Transfer Protocol (HTTP), an application protocol for distributed, collaborative, hypermedia information systems (webpages in the browser).</dd>
          <dt>8080</dt>
          <dd>Popular alternative to port 80 for offering web services. Above the restricted well known service port range (ports 1-1023)</dd>
        </dl>
      </div>
    )
  }
}

SocketInfo.defaultProps = {
  className: ''
}

SocketInfo.propTypes = {
  className: PropTypes.string
}

export default SocketInfo
