import {Component} from 'react'

import Header from '../Header'
import JobDetailedpage from '../JobDetailedpage'
import './index.css'

class Jobs extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="job-profile-container">
          <JobDetailedpage />
        </div>
      </>
    )
  }
}

export default Jobs
