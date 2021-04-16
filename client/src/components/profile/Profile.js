import React, { useEffect, useState, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//prettier-ignore
import {
  faUserCircle,
  faHome,
  faFileAlt,
  faCog
} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
// components
import Logo from '.././assets/logo.svg'
import Upload from './UploadImage'
import Modal from '../../Modal'
//prettier-ignore
import {
  getPayloadFromToken,
  getTokenFromLocalStorage
} from '../../helpers/auth'

const Profile = () => {
  const location = useLocation()

  const modal = useRef(null)

  useEffect(() => {}, [location.pathname])

  const [userDetails, setUserDetails] = useState(null)

  // eslint-disable-next-line no-unused-vars

  console.log(userDetails)

  const token = getTokenFromLocalStorage()

  const userID = getPayloadFromToken().sub

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
        <div className="column dash-col">
          <div className="dash-nav-box">
            <div className="dash-logo-box">
              <Link to="/" className="login-logo">
                <img src={Logo} />
                <h1 className="logo">yieldly</h1>
              </Link>
            </div>

            <div className="dash-nav-item">
              <FontAwesomeIcon
                icon={faUserCircle}
                className="nav-icon fa-2x fa-fw"
              />
              <p>Profile</p>
            </div>
            <div className="dash-nav-item">
              <FontAwesomeIcon icon={faHome} className="nav-icon fa-2x fa-fw" />
              <p>Properties</p>
            </div>
            <div className="dash-nav-item">
              <FontAwesomeIcon
                icon={faFileAlt}
                className="nav-icon fa-2x fa-fw"
              />
              <p>Applications</p>
            </div>
            <div className="dash-nav-item">
              <FontAwesomeIcon icon={faCog} className="nav-icon fa-2x fa-fw" />
              <p>Settings</p>
            </div>
          </div>
        </div>
        <div className="column is-four-fifths dash-content">
          <h2>Profile</h2>
          <br />
          <div className="columns dash-content-box">
            <div className="column is-one-quarter">
              <div className="profile-col">
                <div className="profile-image">
                  <img src={userDetails.profile_image}></img>
                </div>

                <div
                  onClick={() => modal.current.open()}
                  className="change-image"
                >
                  <p>Change profile photo</p>
                </div>
              </div>
            </div>
            <div className="column is-two-quarter">
              <div className="profile-col"></div>
            </div>
          </div>
        </div>
      </div>
      <Modal ref={modal}>
        <Upload />
      </Modal>
    </div>
  )
}

export default Profile
