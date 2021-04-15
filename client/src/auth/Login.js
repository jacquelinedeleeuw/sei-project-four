import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const Login = () => {

  const history = useHistory()

  const [ errors, setErrors ] = useState('')
  const { register, handleSubmit } = useForm()
  const onSubmit = async data => {
    try {
      const response = await axios.post('/api/auth/login/', data)
      window.localStorage.setItem('token', response.data.token)
      history.push('/')
    } catch (err) {
      setErrors(err.response.data.detail)
    }
  }

  return (
    <div className="section">
      <form onSubmit={handleSubmit(onSubmit)} className="column box is-half is-offset-one-quarter">
        <div className="field">
          <div className="control">
            <input
              className={`input ${errors ? 'is-danger' : ''}`}
              placeholder='Email'
              name='email'
              ref={register}
              required={true}
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <input
              className={`input ${errors ? 'is-danger' : ''}`}
              placeholder='Enter password'
              name='password'
              type="password"
              ref={register}
              required={true}
            />
            <p className="help is-danger">{errors}</p>
          </div>
        </div>
        <div className="field">
          <p className="control">
            <button className="button is-info" type="submit">
              Login
            </button>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Login
