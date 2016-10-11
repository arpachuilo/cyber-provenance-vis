import React from 'react'
import { Link } from 'react-router'

import redis from '../redis'

class Background extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      gender: null,
      highestDegree: null
    }

    this.handleGender = this.handleGender.bind(this)
    this.handleHighestDegree = this.handleHighestDegree.bind(this)

    this.addDemographics = this.addDemographics.bind(this)
  }

  addDemographics (e) {
    // Make sure there is no null demographic
    for (let key in this.state) {
      if (this.state[key] === null) {
        e.preventDefault()
      }
    }

    redis.demographics(this.state)
  }

  handleGender (e) {
    this.setState({
      gender: e.currentTarget.value
    })
  }

  handleHighestDegree (e) {
    this.setState({
      highestDegree: e.currentTarget.value
    })
  }

  render () {
    return (
      <div className='container'>
        <div className='row'>
          <h5>Gender: </h5>
          <input type='radio' value='female' checked={this.state.gender === 'female'} onChange={this.handleGender} /><span>Female</span><br />
          <input type='radio' value='male' checked={this.state.gender === 'male'} onChange={this.handleGender} /><span>Male</span><br />
          <input type='radio' value='other' checked={this.state.gender === 'other'} onChange={this.handleGender} /><span>Prefer not to say</span><br />
        </div>
        <div className='row'>
          <h5>Highest Degree Obtained: </h5>
          <input type='radio' value='highSchool' checked={this.state.highestDegree === 'highSchool'} onChange={this.handleHighestDegree} /><span>High School</span><br />
          <input type='radio' value='bachelors' checked={this.state.highestDegree === 'bachelors'} onChange={this.handleHighestDegree} /><span>Bachelors</span><br />
          <input type='radio' value='masters' checked={this.state.highestDegree === 'masters'} onChange={this.handleHighestDegree} /><span>Masters</span><br />
          <input type='radio' value='phd' checked={this.state.highestDegree === 'phd'} onChange={this.handleHighestDegree} /><span>PhD</span><br />
          <input type='radio' value='other' checked={this.state.highestDegree === 'other'} onChange={this.handleHighestDegree} /><span>Other</span><br />
        </div>
        <div className='row'>
          <h5><Link to='/info' onClick={this.addDemographics}>NEXT</Link></h5>
        </div>
      </div>
    )
  }
}

export default Background
