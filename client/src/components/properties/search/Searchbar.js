import React from 'react'
import Select from 'react-select'
import { priceOptions, typeOptions, bedroomOptions, customStyles } from './searchdata'

const Searchbar = ({ handleSubmit, handleChange }) => {

  return (
    <div className="nav-container">
      <nav className="navbar">
        <form onSubmit={handleSubmit} className="searchbar-form">
          <div className="navbar-item">
            <input
              className="input"
              placeholder="Search..."
              name="location"
              required={true}
            />
          </div>
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
          <button className="button get-started-button">
            <strong>Search</strong>
          </button>
        </form>
      </nav>
    </div>
  )
}

export default Searchbar
