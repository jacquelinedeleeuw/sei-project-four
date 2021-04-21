import React, { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import 'animate.css'
import axios from 'axios'
import Modal from '../../../Modal'
// import PropertySidebar from './PropertySidebar'

// components
import SavedYield from './SavedYield'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//prettier-ignore
import {
  faMapMarkerAlt,
  faTags,
  faBed,
  faChartLine
} from '@fortawesome/free-solid-svg-icons'


import { getPayloadFromToken, getTokenFromLocalStorage } from '../../../helpers/auth'

const Applications = () => {

  const location = useLocation()

  const modal = useRef(null)

  const [userDetails, setUserDetails] = useState(null)
  const [propertyDetails, setPropertyDetails] = useState(null)
  const [propID, setPropID] = useState('')

  const [sortType, setSortType] = useState('yield_percentage')

  const token = getTokenFromLocalStorage()
  const userID = getPayloadFromToken().sub

  useEffect(() => {}, [location.pathname])

  const sortProperties = (data) => {
    if (data) {
      const sortArray = (type) => {
        const types = {
          yield_percentage: 'yield_percentage',
          price: 'price',
          postcode: 'postcode',
        }
        const sortProperty = types[type]
        const sorted = [...data.saved_properties].sort(
          (a, b) => b[sortProperty] - a[sortProperty]
        )
        setUserDetails(sorted)
      }
      sortArray(sortType)
    }
  }

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`api/auth/${userID}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      sortProperties(data)
    }
    getData()
  }, [sortType])

  const openYield = async (id) => {
    const getData = async () => {
      const { data } = await axios.get(`api/savedproperties/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      openPopUp(data)
      setPropID(id)
    }
    getData()
  }

  const openPopUp = async (data) => {
    setPropertyDetails(data)
    await modal.current.open()
  }

  if (!userDetails) return null

  return (
    <div>
      <h2 className="column is-two-thirds">Applications</h2>
      <div className="select">
        <select onChange={(e) => setSortType(e.target.value)}>
          <option value="yield_percentage">Yield Percentage</option>
          <option value="price">Price</option>
          <option value="postcode">Postcode</option>
        </select>
      </div>
      <br />
      <br />
      <div className="dash-content-box">
        <div className="columns">
          <div className="column">
            {userDetails.map((property) => {
              return (
                <div
                  key={property.id}
                  className="container saved-property-card animate__animated animate__fadeInUp"
                  onClick={() => openYield(property.id)}
                >
                  <div className="columns">
                    <div className="column">
                      <img src={property.image}></img>
                    </div>
                    <div className="column is-four-fifths">
                      <div className="container">
                        <div className="saved-location">
                          <FontAwesomeIcon
                            icon={faMapMarkerAlt}
                            className="saved-location-icon fa-1x fa-fw"
                          />
                          {<h2>{property.address}</h2>}
                        </div>
                      </div>
                      <hr />
                      <div className="container">
                        <p>
                          {property.short_description.substring(0, 100)} ...
                        </p>
                      </div>
                      <br />
                      <div className="container">
                        <div className="columns saved-icons-container ">
                          <div className="column">
                            <div className="saved-icons">
                              <FontAwesomeIcon
                                icon={faTags}
                                className="saved-location-icon-card fa-1x fa-fw"
                              />
                              <div>
                                <p>Price</p>
                                <p>
                                  <strong>£ </strong>
                                  {property.price.toLocaleString()}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="column">
                            <div className="saved-icons">
                              <FontAwesomeIcon
                                icon={faBed}
                                className="saved-location-icon-card fa-1x fa-fw"
                              />
                              <div>
                                <p>Beds</p>
                                <p>{property.beds}</p>
                              </div>
                            </div>
                          </div>
                          <div className="column">
                            <div className="saved-icons">
                              <FontAwesomeIcon
                                icon={faChartLine}
                                className="saved-location-icon-card fa-1x fa-fw"
                              />
                              <div>
                                <p>Yield</p>
                                <p>
                                  {Number(property.yield_percentage).toFixed(2)}
                                  %
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <Modal ref={modal}>
        <SavedYield
          propertyDetails={propertyDetails}
          modal={modal}
          propID={propID}
        />
      </Modal>
    </div>
  )
}

export default Applications
