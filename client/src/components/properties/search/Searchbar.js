import React, { useEffect, useState } from 'react'
import Select from 'react-select'

//prettier-ignore
import {
  priceOptions,
  typeOptions,
  bedroomOptions,
  orderOptions,
  orderByOptions,
  customStyles
} from './searchdata'

//prettier-ignore
import {  useLocation } from 'react-router-dom'

// import Logo from '../../assets/logo.svg'
//prettier-ignore

const Searchbar = ({ handleSubmit, handleChange, listingsLength }) => {
  const location = useLocation()

  useEffect(() => {}, [location.pathname])

  const [searchBurger, setSearchBurger] = useState('')



  const toggleSearchBurger = () => {
    if (searchBurger === '') setSearchBurger('is-active')
    if (searchBurger === 'is-active') setSearchBurger('')
  }

  return (
    <div className="index-search-container">
      <div className="index-search-content">
        <div className="nav-container-searchbar">
          <nav
            className="navbar"
            role="navigation"
            aria-label="main navigation"
          >
            <div className="navbar-brand">
              <div
                onClick={toggleSearchBurger}
                data-target="yieldly-search-navbar"
              >
                <button
                  className="button get-started-button search-button-mobile"
                  aria-hidden="true"
                >
                  <strong>Find your property</strong>
                </button>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className={`navbar-menu searchbar-form ${searchBurger}`}
              id="yieldly-search-navbar"
            >
              <div className="navbar-item">
                <input
                  className="input index-search-box"
                  placeholder="Search for a postcode..."
                  name="location"
                  required={true}
                />
              </div>
              {listingsLength && (
                <div className="navbar-item">
                  We found {listingsLength} properties
                </div>
              )}
              <div className="navbar-item has-dropdown is-hoverable">
                <div className="navbar-link">Price</div>
                <div className="navbar-dropdown">
                  <div className="navbar-item">
                    <Select
                      className="search-bar"
                      options={priceOptions}
                      styles={customStyles}
                      placeholder="No min"
                      name="minimum_price"
                      onChange={(selected) =>
                        handleChange(selected, 'minimum_price')
                      }
                    />
                  </div>
                  <div className="navbar-item">
                    <Select
                      className="search-bar"
                      options={priceOptions}
                      styles={customStyles}
                      placeholder="No max"
                      name="maximum_price"
                      onChange={(selected) =>
                        handleChange(selected, 'maximum_price')
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="navbar-item has-dropdown is-hoverable">
                <div className="navbar-link">Number of bedrooms</div>
                <div className="navbar-dropdown">
                  <div className="navbar-item">
                    <Select
                      className="search-bar"
                      options={bedroomOptions}
                      styles={customStyles}
                      placeholder="No min"
                      name="minimum_beds"
                      onChange={(selected) =>
                        handleChange(selected, 'minimum_beds')
                      }
                    />
                  </div>
                  <div className="navbar-item">
                    <Select
                      className="search-bar"
                      options={bedroomOptions}
                      styles={customStyles}
                      placeholder="No max"
                      name="maximum_beds"
                      onChange={(selected) =>
                        handleChange(selected, 'maximum_beds')
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="navbar-item has-dropdown is-hoverable">
                <div className="navbar-link">Type of property</div>
                <div className="navbar-dropdown">
                  <div className="navbar-item">
                    <Select
                      className="search-bar"
                      options={typeOptions}
                      styles={customStyles}
                      placeholder="Show all"
                      name="property_type"
                      onChange={(selected) =>
                        handleChange(selected, 'property_type')
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="navbar-item has-dropdown is-hoverable">
                <div className="navbar-link">Sort by</div>
                <div className="navbar-dropdown">
                  <div className="navbar-item">
                    <Select
                      className="search-bar"
                      options={orderByOptions}
                      styles={customStyles}
                      placeholder="Price"
                      name="price"
                      onChange={(selected) =>
                        handleChange(selected, 'order_by')
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="navbar-item has-dropdown is-hoverable">
                <div className="navbar-link">Order by</div>
                <div className="navbar-dropdown">
                  <div className="navbar-item">
                    <Select
                      className="search-bar"
                      options={orderOptions}
                      styles={customStyles}
                      placeholder="Descending"
                      name="ordering"
                      onChange={(selected) =>
                        handleChange(selected, 'ordering')
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="container nav-button-container">
                <button className="button get-started-button">
                  <strong>Search</strong>
                </button>
              </div>
            </form>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Searchbar
