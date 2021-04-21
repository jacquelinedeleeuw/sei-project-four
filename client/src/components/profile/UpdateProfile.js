import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

//prettier-ignore
import {
  getTokenFromLocalStorage,
  getPayloadFromToken
} from '../../helpers/auth'

import axios from 'axios'

// components

const UpdateProfile = ({ userDetails, details }) => {
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
    details.current.close()
  }

  const closePopUp = () => {
    details.current.close()
  }

  return (
    <>
      {/* This is the form box here */}
      <div className="change-details-box">
        <div className="form-header">
          <br />
          <h2>Change Details</h2>
          <p>Use the form below to change your user details</p>
        </div>
        <br />
        <form onSubmit={handleSubmit(onSubmit)} className="column change-form">
          <div className="field">
            <div className="control">
              <div className="form-label">
                <label>First Name</label>
              </div>
              <input
                className={`input ${errors.first_name ? 'is-danger' : ''}`}
                placeholder="First Name"
                defaultValue={userDetails.first_name}
                name="first_name"
                ref={register}
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
                defaultValue={userDetails.last_name}
                name="last_name"
                ref={register}
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
                defaultValue={userDetails.username}
                name="username"
                ref={register}
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
                defaultValue={userDetails.email}
                name="email"
                ref={register}
              />
              <p className="help is-danger">{errors.email}</p>
            </div>
          </div>

          <hr />
          <br />
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
