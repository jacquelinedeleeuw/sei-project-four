import React, { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'

//prettier-ignore

import axios from 'axios'
// components

import Upload from '../UploadImage'
import Modal from '../../../Modal'
import UpdateProfile from '../UpdateProfile'

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
      <h2>Profile</h2>
      <br />
      <div className="columns dash-content-box">
        <div className="column is-one-quarter">
          <div className="profile-col">
            <div className="profile-image">
              <img src={userDetails.profile_image}></img>
            </div>

            <div onClick={() => modal.current.open()} className="change-image">
              <p>Change profile photo</p>
            </div>
            <hr />
            <div className="username-text">
              <h2>Hello, {userDetails.username}</h2>
            </div>

            <div className="member-since">
              <p>Member since, {convertTimestamp(userDetails.date_joined)}</p>
            </div>
            <hr />
            <div className="user-email">
              <p>{userDetails.email}</p>
            </div>
          </div>
        </div>
        <div className="column is-two-quarter">
          <div className="profile-col">
            <UpdateProfile 
              userDetails={userDetails}
            />
          </div>
        </div>
      </div>
      <Modal ref={modal}>
        <Upload />
      </Modal>
    </div>
  )
}

export default profilePage
