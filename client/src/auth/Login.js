import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory, Link } from 'react-router-dom'
import axios from 'axios'
import 'animate.css'

import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// components
import Logo from '../components/assets/logo.svg'

const Login = () => {
  const history = useHistory()

  const [errors, setErrors] = useState('')
  const { register, handleSubmit } = useForm()
  const onSubmit = async (data) => {
    try {
      const response = await axios.post('/api/auth/login/', data)
      window.localStorage.setItem('token', response.data.token)
      history.push('/')
    } catch (err) {
      setErrors(err.response.data.detail)
    }
  }

  return (
    <>
      <div className="columns">
        <div className="column login-left">
          <div className="columns">
            <div className="column">
              <Link to="/" className="login-logo">
                <img src={Logo} />
                <h1 className="logo">yieldly</h1>
              </Link>
              <br />
              <div className="yield-box">
                <h2>
                  Find yields like <br />
                  never before
                </h2>
              </div>
              <div className="container check-boxes-login animate__animated animate__fadeInLeft">
                <ul>
                  <li>
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className="check-icon fa-1x fa-fw"
                    />
                    Find exciting new opportunies
                  </li>
                  <li>
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className="check-icon fa-1x fa-fw"
                    />
                    Find all the hot properties
                  </li>
                  <li>
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className="check-icon fa-1x fa-fw"
                    />
                    Find yields like never before
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="column login-form-box is-two-thirds">
          <div className="form-container">
            {/* This is the form box here */}
            <div className="form-header">
              <h2>Sign in</h2>
            </div>

            <br />
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="column login-form-form"
            >
              <div className="field">
                <div className="control">
                  <div className="form-label">
                    <label>Email</label>
                  </div>

                  <input
                    className={`input ${errors ? 'is-danger' : ''}`}
                    placeholder="alex@example.com"
                    name="email"
                    ref={register}
                    required={true}
                  />
                </div>
              </div>
              <br />
              <div className="field">
                <div className="control">
                  <div className="form-label">
                    <label>Password</label>
                  </div>
                  <input
                    className={`input ${errors ? 'is-danger' : ''}`}
                    placeholder="password"
                    name="password"
                    type="password"
                    ref={register}
                    required={true}
                  />
                  <p className="help is-danger">{errors}</p>
                </div>
              </div>
              <br />
              <div className="field">
                <p className="control">
                  <button className="button form-button " type="submit">
                    <strong>Sign in</strong>
                  </button>
                </p>
              </div>
              <hr />
            </form>
            <div className="login-sign-up">
              <p>
                Don’t have an account?{' '}
                <Link to="/getstarted">
                  <span>Sign up</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
