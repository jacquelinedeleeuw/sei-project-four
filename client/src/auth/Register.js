import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const Register = () => {

  const history = useHistory()

  const [ errors, setErrors ] = useState('')
  const { register, handleSubmit } = useForm()
  const onSubmit = async data => {
    try {
      let response = await axios.post('/api/auth/register/', data)
      response = await axios.post('/api/auth/login/', { 'email': data.email, 'password': data.password })
      window.localStorage.setItem('token', response.data.token)
      history.push('/')
    } catch (err) {
      setErrors(err.response.data)
    }
  }

  return (
    <div className="section">
      <form onSubmit={handleSubmit(onSubmit)} className="column box is-half is-offset-one-quarter">
        <div className="field">
          <div className="control">
            <input
              className={`input ${errors.first_name ? 'is-danger' : ''}`}
              placeholder='First Name'
              name='first_name'
              ref={register}
              required={true}
            />
            <p className="help is-danger">{errors.first_name}</p>
          </div>
        </div>
        <div className="field">
          <div className="control">
            <input
              className={`input ${errors.last_name ? 'is-danger' : ''}`}
              placeholder='Last Name'
              name='last_name'
              ref={register}
              required={true}
            />
            <p className="help is-danger">{errors.last_name}</p>
          </div>
        </div>
        <div className="field">
          <div className="control">
            <input
              className={`input ${errors.username ? 'is-danger' : ''}`}
              placeholder='Username'
              name='username'
              ref={register}
              required={true}
            />
            <p className="help is-danger">{errors.username}</p>
          </div>
        </div>
        <div className="field">
          <div className="control">
            <input
              className={`input ${errors.email ? 'is-danger' : ''}`}
              placeholder='Email'
              name='email'
              ref={register}
              required={true}
            />
            <p className="help is-danger">{errors.email}</p>
          </div>
        </div>
        <div className="field">
          <div className="control">
            <input
              className={`input ${errors.password ? 'is-danger' : ''}`}
              placeholder='Enter password'
              name='password'
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
              placeholder='Confirm password'
              name='password_confirmation'
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
              className={`input ${errors.profile_image ? 'is-danger' : ''}`}
              placeholder='Profile Image'
              name='profile_image'
              ref={register}
              required={true}
            />
            <p className="help is-danger">{errors.profile_image}</p>
          </div>
        </div>
        <div className="field">
          <p className="control">
            <button className="button is-info" type="submit">
              Get Started
            </button>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Register
