import React, { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'

//prettier-ignore

import axios from 'axios'
// components

import Upload from '../UploadImage'
import Modal from '../../../Modal'
import UpdateProfile from '../UpdateProfile'
import UpdatePassword from '../UpdatePassword'

//helpers

import { convertTimestamp } from '../../../helpers/helpersFunctions'
//prettier-ignore
import {
  getPayloadFromToken,
  getTokenFromLocalStorage
} from '../../../helpers/auth'

const profilePage = () => {
  const location = useLocation()
  const modal = useRef(null)
  const details = useRef(null)
  const passChange = useRef(null)
  const [userDetails, setUserDetails] = useState(null)
  const token = getTokenFromLocalStorage()
  const userID = getPayloadFromToken().sub

  useEffect(() => {}, [location.pathname])

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`api/auth/${userID}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setUserDetails(data)
    }
    getData()
  }, [])

  if (!userDetails) return null

  return (
    <div>
      <div className="columns">
        <h2 className="column">Profile</h2>
        {/* <div className="dash-logo-box">
          <div className="login-logo">
            <img src={Logo} />
            <h1 className="logo">yieldly</h1>
            {userDetails.pro ?
              <h1 className="logo yieldly-plan">pro</h1>
              :
              <h1 className="logo yieldly-plan">basic</h1>
            }
          </div>
        </div> */}
      </div>
      <br />
      <div className="container change-card animate__animated animate__fadeInUp">
        <div className="columns">
          <div className="column is-one-quarter">
            <div className="profile-image">
              <img src={userDetails.profile_image}></img>
            </div>
            <div onClick={() => modal.current.open()} className="change-image">
              <p>Change profile photo</p>
            </div>
          </div>
          <div className="column is-one-quarter">
            <div className="profile-info">
              <br />
              <h3>Personal Information</h3>
              <hr />
              <div className="username-text">
                <h3>Hello, {userDetails.username}</h3>
              </div>
              <div className="user-email">
                <p>{userDetails.email}</p>
              </div>
              <div className="member-since">
                <p>Member since, {convertTimestamp(userDetails.date_joined)}</p>
              </div>
              <div className="member-plan">
                {userDetails.pro ?
                  <p>Plan: pro</p>
                  :
                  <p>Plan: basic</p>
                }
              </div>
            </div>
          </div>
          <div className="column">
            <div className="modal-button-box">
              <button
                className="button modal-button setting-button yieldly-plan-button"
                onClick={() => details.current.open()}
              >
                Change Details
              </button>
              <button
                className="button modal-button setting-button yieldly-plan-button"
                onClick={() => passChange.current.open()}
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal ref={modal}>
        <Upload modal={modal} />
      </Modal>
      <Modal ref={details}>
        <UpdateProfile userDetails={userDetails} details={details} />
      </Modal>
      <Modal ref={passChange}>
        <UpdatePassword userDetails={userDetails} passChange={passChange} />
      </Modal>
    </div>
  )
}

export default profilePage
