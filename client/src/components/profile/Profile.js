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

import ProfilePage from '../profile/profileViews/profilePage'
import SavedProperties from './profileViews/SavedProperties'
import Applications from './profileViews/Applications'

//helpers

//prettier-ignore
import {
  getPayloadFromToken,
  getTokenFromLocalStorage
} from '../../helpers/auth'

const Profile = () => {
  const location = useLocation()
  const modal = useRef(null)
  const [userDetails, setUserDetails] = useState(null)
  const token = getTokenFromLocalStorage()
  const userID = getPayloadFromToken().sub

  const [profileShow, setProfileShow] = useState(true)
  const [propertyShow, setPropertyShow] = useState(false)
  const [applicationShow, setApplicationShow] = useState(false)

  const editProfileShow = () => {
    setProfileShow(true)
    setPropertyShow(false)
  }
  const editPropertyShow = () => {
    setProfileShow(false)
    setPropertyShow(true)
  }

  const editApplicationShow = () => {
    setProfileShow(false)
    setPropertyShow(false)
    setApplicationShow(true)
  }

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
        <div className="column dash-col">
          <div className="dash-nav-box">
            <div className="dash-logo-box">
              <Link to="/" className="login-logo">
                <img src={Logo} />
                <h1 className="logo">yieldly</h1>
              </Link>
            </div>
            {/* <Link to="/myprofile"> */}
            <div onClick={editProfileShow} className="dash-nav-item">
              <FontAwesomeIcon
                icon={faUserCircle}
                className="nav-icon fa-2x fa-fw"
              />{' '}
              <p>Profile</p>
            </div>
            {/* </Link> */}
            {/* <Link to="/savedproperties"> */}
            <div onClick={editPropertyShow} className="dash-nav-item">
              <FontAwesomeIcon
                icon={('far', faHome)}
                className="nav-icon fa-2x fa-fw"
              />
              <p>Properties</p>
            </div>
            {/* </Link> */}
            <div onClick={editApplicationShow} className="dash-nav-item">
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
          {/* Start of Content */}
          {profileShow && <ProfilePage />}
          {propertyShow && <SavedProperties />}
          {applicationShow && <Applications />}
          {/* End of content */}
        </div>
      </div>
      <Modal ref={modal}>
        <Upload />
      </Modal>
    </div>
  )
}

export default Profile
