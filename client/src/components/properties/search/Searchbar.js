import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { priceOptions, typeOptions, bedroomOptions, orderOptions, orderByOptions, customStyles } from './searchdata'

import { Link, useHistory, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import Logo from '../../assets/logo.svg'
import {
  userIsAuthenticated,
  getPayloadFromToken,
  getTokenFromLocalStorage
} from '../../../helpers/auth'

import axios from 'axios'

const Searchbar = ({ handleSubmit, handleChange, listingsLength }) => {

  const location = useLocation()

  useEffect(() => {}, [location.pathname])

  const history = useHistory()

  const token = getTokenFromLocalStorage()

  const [burger, setBurger] = useState('')
  const [searchBurger, setSearchBurger] = useState('')
  const [userName, setUserName] = useState(null)

  const toggleBurger = () => {
    if (burger === '') setBurger('is-active')
    if (burger === 'is-active') setBurger('')
  }

  const toggleSearchBurger = () => {
    if (searchBurger === '') setSearchBurger('is-active')
    if (searchBurger === 'is-active') setSearchBurger('')
  }

  const handleLogout = () => {
    window.localStorage.removeItem('token')
    history.push('/login')
  }

  const userID = getPayloadFromToken().sub

  useEffect(() => {
    if (userIsAuthenticated()) {
      const getData = async () => {
        const { data } = await axios.get(`api/auth/${userID}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setUserName(data.username)
      }
      getData()
    }
  }, [])

  return (
    <div className="nav-container-searchbar">
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            <img src={Logo} />
            <h1 className="logo">yieldly</h1>
          </Link>

          <div
            onClick={toggleSearchBurger}
            className={`search-navbar-burger navbar-burger ${searchBurger}`}
            data-target="yieldly-search-navbar"
          >
            <button className="button get-started-button" aria-hidden="true">
              <strong>Find your property</strong>
            </button>
          </div>
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

        <form onSubmit={handleSubmit} className={`navbar-menu searchbar-form ${searchBurger}`} id="yieldly-search-navbar">
          <div className="navbar-item">
            <input
              className="input"
              placeholder="Search for a postcode..."
              name="location"
              required={true}
            />
          </div>
          {listingsLength &&
          <div className="navbar-item">
            We found {listingsLength} properties
          </div>
          }
          <div className="navbar-item has-dropdown is-hoverable">
            <div className="navbar-link">
              Price
            </div>
            <div className="navbar-dropdown">
              <div className="navbar-item">
                <Select className="search-bar"
                  options={priceOptions}
                  styles={customStyles}
                  placeholder="No min"
                  name="minimum_price"
                  onChange={(selected) => handleChange(selected, 'minimum_price')}
                />
              </div>
              <div className="navbar-item">
                <Select className="search-bar"
                  options={priceOptions}
                  styles={customStyles}
                  placeholder="No max"
                  name="maximum_price"
                  onChange={(selected) => handleChange(selected, 'maximum_price')}
                />
              </div>
            </div>
          </div>
          <div className="navbar-item has-dropdown is-hoverable">
            <div className="navbar-link">
              Number of bedrooms
            </div>
            <div className="navbar-dropdown">
              <div className="navbar-item">
                <Select className="search-bar"
                  options={bedroomOptions}
                  styles={customStyles}
                  placeholder="No min"
                  name="minimum_beds"
                  onChange={(selected) => handleChange(selected, 'minimum_beds')}
                />
              </div>
              <div className="navbar-item">
                <Select className="search-bar"
                  options={bedroomOptions}
                  styles={customStyles}
                  placeholder="No max"
                  name="maximum_beds"
                  onChange={(selected) => handleChange(selected, 'maximum_beds')}
                />
              </div>
            </div>
          </div>
          <div className="navbar-item has-dropdown is-hoverable">
            <div className="navbar-link">
              Type of property
            </div>
            <div className="navbar-dropdown">
              <div className="navbar-item">
                <Select className="search-bar"
                  options={typeOptions}
                  styles={customStyles}
                  placeholder="Show all"
                  name="property_type"
                  onChange={(selected) => handleChange(selected, 'property_type')}
                />
              </div>
            </div>
          </div>
          <div className="navbar-item has-dropdown is-hoverable">
            <div className="navbar-link">
              Sort by
            </div>
            <div className="navbar-dropdown">
              <div className="navbar-item">
                <Select className="search-bar"
                  options={orderByOptions}
                  styles={customStyles}
                  placeholder="Price"
                  name="price"
                  onChange={(selected) => handleChange(selected, 'order_by')}
                />
              </div>
            </div>
          </div>
          <div className="navbar-item has-dropdown is-hoverable">
            <div className="navbar-link">
              Order by
            </div>
            <div className="navbar-dropdown">
              <div className="navbar-item">
                <Select className="search-bar"
                  options={orderOptions}
                  styles={customStyles}
                  placeholder="Descending"
                  name="ordering"
                  onChange={(selected) => handleChange(selected, 'ordering')}
                />
              </div>
            </div>
          </div>
          <button className="button get-started-button">
            <strong>Search</strong>
          </button>
        </form>

        <div id="yieldly-navbar" className={`navbar-menu ${burger}`}>
          <div className="navbar-end">
            {!userIsAuthenticated() && (
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
            )}
            {userIsAuthenticated() && (
              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">
                  <FontAwesomeIcon
                    icon={faUserCircle}
                    className="circle-space fa-2x"
                  />
                  <p>{userName}</p>
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
            )}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Searchbar
