import React, { useEffect, useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { userIsAuthenticated } from '../helpers/auth'

const Navbar = () => {

  const location = useLocation()
  
  useEffect(() => {
  }, [location.pathname])

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
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          <img src="" />
        </Link>

        <div onClick={toggleBurger} className={`navbar-burger ${burger}`} data-target="yieldly-navbar">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </div>
      </div>

      <div id="yieldly-navbar" className={`navbar-menu ${burger}`}>
        <div className="navbar-start">
          <Link to="/" className="navbar-item">
        Home
          </Link>
          <Link to="/" className="navbar-item">
        Something else
          </Link>
        </div>

        <div className="navbar-end">
          { !userIsAuthenticated() &&
          <div className="navbar-item">
            <div className="buttons">
              <Link to="/login" className="button is-light">
            Log in
              </Link>
              <Link to="/getstarted" className="button is-info">
                <strong>Get Started</strong>
              </Link>
            </div>
          </div>
          }
          { userIsAuthenticated() &&
          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">
          User Name
            </a>
            <div className="navbar-dropdown">
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
          }
        </div>
      </div>
    </nav>
  )
}

export default Navbar
