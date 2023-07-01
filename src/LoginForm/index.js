import {Component} from 'react'

import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', showSubmitButton: false, errorMsg: ''}

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitButton: true, errorMsg})
  }

  getSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderPassword = () => {
    const {password} = this.state
    return (
      <>
        <label className="label-username" htmlFor="password">
          PASSWORD
        </label>
        <br />
        <input
          type="password"
          placeholder="Username"
          id="password"
          value={password}
          className="input-username"
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  renderUsername = () => {
    const {username} = this.state
    return (
      <>
        <label className="label-username" htmlFor="username">
          USERNAME
        </label>
        <br />
        <input
          type="text"
          placeholder="Username"
          id="username"
          value={username}
          className="input-username"
          onChange={this.onChangeUsername}
        />
      </>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const {showSubmitButton, errorMsg} = this.state
    return (
      <div className="div-container">
        <div className="div-sub-cont-jobby">
          <p className="personal">
            WebApp built by Rahul Gundluru <br />
            To see my LinkedIn Profile{' '}
            <a
              href="https://www.linkedin.com/in/rahulgundluru/"
              className="check"
              target="blank"
            >
              {' '}
              Click Here{' '}
            </a>
            <br />
            For Source Code{' '}
            <a
              href="https://github.com/rahulgundluru/Jobby-App"
              className="check"
              target="blank"
            >
              Click Here
            </a>
          </p>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="jobby-app-image"
          />

          <form onSubmit={this.getSubmit} className="form">
            <div>{this.renderUsername()}</div>
            <div>{this.renderPassword()}</div>
            <button className="button-login" type="submit">
              Login
            </button>
            {showSubmitButton && <p className="error_msg">*{errorMsg}</p>}
          </form>
          <div className="div-user">
            <p className="para">Username: rahul</p>
            <p className="para">Password: rahul@2021</p>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginForm
