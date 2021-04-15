import React, { useEffect, useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import Logo from './assets/logo.svg'

const Navbar = () => {
  const location = useLocation()

  useEffect(() => {}, [location.pathname])

  const history = useHistory()

  const [burger, setBurger] = useState('')

  const toggleBurger = () => {
    if (burger === '') setBurger('is-active')
    if (burger === 'is-active') setBurger('')
  }

  const handleLogout = () => {
    window.localStorage.removeItem('token')
    history.push('/')
  }

  return (
    <div className="nav-container">
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            <img src={Logo} />
            <h1 className="logo">yieldly</h1>
          </Link>

          <div
            onClick={toggleBurger}
            className={`navbar-burger ${burger}`}
            data-target="yieldly-navbar"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </div>
        </div>

        <div id="yieldly-navbar" className={`navbar-menu ${burger}`}>
          {/* <div className="navbar-start">
            <Link to="/" className="navbar-item">
              Home
            </Link>
            <Link to="/" className="navbar-item">
              About
            </Link>
          </div> */}

          <div className="navbar-end">
            {/* { !userIsAuthenticated() && */}
            <div className="navbar-item">
              <div className="buttons">
                <Link to="/login" className="sign-in ">
                  Sign in
                </Link>
                <Link to="/getstarted" className="button get-started-button">
                  <strong>Get Started</strong>
                </Link>
              </div>
            </div>
            {/* } */}
            {/* { userIsAuthenticated() && */}
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">
                <FontAwesomeIcon
                  icon={faUserCircle}
                  className="circle-space fa-2x"
                />
                <p>User Name</p>
              </a>
              <div className="navbar-dropdown dropdown-shape">
                <Link to="/myprofile" className="navbar-item">
                  Profile
                </Link>
                <Link to="/savedproperties" className="navbar-item">
                  My Properties
                </Link>
                <Link to="/applications" className="navbar-item">
                  My applications
                </Link>
                <hr className="navbar-divider" />
                <a onClick={handleLogout} className="navbar-item">
                  Log out
                </a>
              </div>
            </div>
            {/* } */}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
