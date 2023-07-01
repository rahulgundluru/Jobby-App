import {Link, Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }
  return (
    <div className="home-container">
      <Header />
      <div className="responsive-container">
        <h1 className="main-heading">
          Find The Job That
          <br /> Fits Your Life
        </h1>
        <p className="job-desc">
          Millions of people are searching for jobs, salary <br />
          Information, company reviews. Find the job that fits your abilities
          and potential.
        </p>
        <Link to="/jobs">
          <button className="find-jobs" type="button">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Home
