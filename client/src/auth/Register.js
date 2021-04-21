import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory, Link } from 'react-router-dom'
import axios from 'axios'

// components
import Logo from '../components/assets/logo.svg'
import Google from './Google'

const Register = () => {
  const history = useHistory()

  const [errors, setErrors] = useState('')
  const { register, handleSubmit } = useForm()
  const onSubmit = async (data) => {
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

  const [googleLogin, setGoogleLogin] = useState(null)

  useEffect( async () => {
    if (googleLogin) {
      try {
        const response = await axios.post('/api/auth/register/', {
          email: googleLogin.profileObj.email,
          username: googleLogin.profileObj.givenName,
          first_name: googleLogin.profileObj.givenName,
          last_name: googleLogin.profileObj.familyName,
          password: googleLogin.tokenObj.login_hint,
          password_confirmation: googleLogin.tokenObj.login_hint,
          profile_image: googleLogin.profileObj.imageUrl,
        })
        window.localStorage.setItem('token', response.data.token)
        history.push('/')
      } catch (err) {
        console.log(err.message)
        // console.log(err.response.data)
        console.log(googleLogin)
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
                < Google 
                  setGoogleLogin={setGoogleLogin}
                />
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
