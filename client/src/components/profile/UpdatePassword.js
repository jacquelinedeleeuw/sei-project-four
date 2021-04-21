import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

//prettier-ignore
import {
  getTokenFromLocalStorage,
  getPayloadFromToken
} from '../../helpers/auth'

import axios from 'axios'

// components

const UpdateProfile = ({ passChange }) => {
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
      window.location.reload()
    } catch (err) {
      setErrors(err.response.data)
    }
    passChange.current.close()
  }

  const closePopUp = () => {
    passChange.current.close()
  }

  return (
    <>
      {/* This is the form box here */}
      <div className="change-details-box">
        <div className="form-header">
          <br />
          <h2>Change Password</h2>
          <p>Use the form below to change your password</p>
        </div>
        <br />
        <form onSubmit={handleSubmit(onSubmit)} className="column change-form">
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
              />
              <p className="help is-danger">{errors.password}</p>
            </div>
          </div>
          <hr />
          <div className="detail-button-box ">
            <button
              className="button form-button-cancel"
              onClick={closePopUp}
              type="reset"
            >
              Cancel
            </button>
            <button className="button form-button" type="submit">
              Change Details
            </button>
          </div>
        </form>
        <br />
      </div>
    </>
  )
}

export default UpdateProfile
