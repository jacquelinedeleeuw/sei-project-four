import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

//prettier-ignore
import {
  getTokenFromLocalStorage,
  getPayloadFromToken
} from '../../helpers/auth'

import axios from 'axios'

// components

const UpdateProfile = () => {
  const token = getTokenFromLocalStorage()

  const userID = getPayloadFromToken().sub

  const [errors, setErrors] = useState('')
  const { register, handleSubmit } = useForm()

  const onSubmit = async (data) => {
    try {
      await axios.patch(`/api/auth/${userID}/`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    } catch (err) {
      setErrors(err.response.data)
    }
  }

  return (
    <>
      {/* This is the form box here */}
      <div className="form-header">
        <br />
        <h2>Change Details</h2>
        <p>Use the form below to change your user details</p>
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
        <hr />
        <div className="field">
          <p className="control">
            <button className="button form-button" type="submit">
              Change Details
            </button>
          </p>
        </div>
      </form>
      <br />
    </>
  )
}

export default UpdateProfile
