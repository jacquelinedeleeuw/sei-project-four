import React, { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory, Link } from 'react-router-dom'
import axios from 'axios'
import 'animate.css'
import ReCAPTCHA from 'react-google-recaptcha'

import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// components
import Logo from '../components/assets/logo.svg'
import Google from './Google'

const Register = () => {
  const history = useHistory()
  const reRef = useRef()

  const [errors, setErrors] = useState('')
  const { register, handleSubmit } = useForm()
  const onSubmit = async (data) => {
    const googleToken = await reRef.current.getValue()
    reRef.current.reset()
    const human = await validateHuman(googleToken)
    if (!human) {
      return
    }
    try {
      let response = await axios.post('/api/auth/register/', data)
      response = await axios.post('/api/auth/login/', {
        email: data.email,
        password: data.password,
      })
      window.localStorage.setItem('token', response.data.token)
      history.push('/')
    } catch (err) {
      setErrors(err.response.data)
    }
  }

  const validateHuman = async (googleToken) => {
    const secret = process.env.REACT_APP_RECAPTCHA_SECRET_KEY
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${googleToken}`
    )
    return response.data.success
  }

  const [googleLogin, setGoogleLogin] = useState(null)

  useEffect(async () => {
    if (googleLogin) {
      try {
        let response = await axios.post('/api/auth/register/', {
          email: googleLogin.profileObj.email,
          username: googleLogin.profileObj.email,
          first_name: googleLogin.profileObj.givenName,
          last_name: googleLogin.profileObj.familyName,
          password: googleLogin.tokenObj.login_hint,
          password_confirmation: googleLogin.tokenObj.login_hint,
          profile_image: googleLogin.profileObj.imageUrl,
        })
        response = await axios.post('/api/auth/login/', {
          email: googleLogin.profileObj.email,
          password: googleLogin.tokenObj.login_hint,
        })
        window.localStorage.setItem('token', response.data.token)
        history.push('/')
      } catch (err) {
        console.log(err.message)
      }
    }
  }, [googleLogin])

  return (
    <>
      <div className="columns">
        <div className="column login-left">
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
        <div className="column is-two-thirds">
          <div className="form-container">
            {/* This is the form box here */}
            <div className="form-header">
              <h2>Sign Up</h2>
              <p>Sign up to start your full-featured 30-day free trial</p>
            </div>
            <br />
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="column login-form-form"
            >
              <div className="field">
                <div className="control">
                  <div className="form-label">
                    <label>First Name</label>
                  </div>
                  <input
                    className={`input ${errors.first_name ? 'is-danger' : ''}`}
                    placeholder="First Name"
                    name="first_name"
                    ref={register}
                    required={true}
                  />
                  <p className="help is-danger">{errors.first_name}</p>
                </div>
              </div>
              <br />

              <div className="field">
                <div className="control">
                  <div className="form-label">
                    <label>Last Name</label>
                  </div>
                  <input
                    className={`input ${errors.last_name ? 'is-danger' : ''}`}
                    placeholder="Last Name"
                    name="last_name"
                    ref={register}
                    required={true}
                  />
                  <p className="help is-danger">{errors.last_name}</p>
                </div>
              </div>
              <br />

              <div className="field">
                <div className="control">
                  <div className="form-label">
                    <label>Username</label>
                  </div>
                  <input
                    className={`input ${errors.username ? 'is-danger' : ''}`}
                    placeholder="Username"
                    name="username"
                    ref={register}
                    required={true}
                  />
                  <p className="help is-danger">{errors.username}</p>
                </div>
              </div>
              <br />
              <div className="field">
                <div className="control">
                  <div className="form-label">
                    <label>Email</label>
                  </div>
                  <input
                    className={`input ${errors.email ? 'is-danger' : ''}`}
                    placeholder="Email"
                    name="email"
                    ref={register}
                    required={true}
                  />
                  <p className="help is-danger">{errors.email}</p>
                </div>
              </div>

              <hr />
              <div className="field">
                <div className="control">
                  <div className="form-label">
                    <label>Password</label>
                  </div>
                  <input
                    className={`input ${errors.password ? 'is-danger' : ''}`}
                    placeholder="Enter password"
                    name="password"
                    type="password"
                    ref={register}
                    required={true}
                  />
                  <p className="help is-danger">{errors.password}</p>
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <input
                    className={`input ${errors.password ? 'is-danger' : ''}`}
                    placeholder="Confirm password"
                    name="password_confirmation"
                    type="password"
                    ref={register}
                    required={true}
                  />
                  <p className="help is-danger">{errors.password}</p>
                </div>
              </div>
              <div className="container captcha">
                <ReCAPTCHA
                  sitekey={process.env.REACT_APP_PUBLIC_RECAPTCHA_SITE_KEY}
                  ref={reRef}
                />
              </div>

              <br />
              <div className="field">
                <p className="control">
                  <button className="button form-button" type="submit">
                    Sign Up
                  </button>
                </p>
              </div>
              <hr />
              <div className="login-sign-up">
                <p> OR </p>
                <Google setGoogleLogin={setGoogleLogin} />
                {/* < Facebook /> */}
                <br />
                <p>
                  Already registered?
                  <Link to="/login">
                    <span> Sign in</span>
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register
