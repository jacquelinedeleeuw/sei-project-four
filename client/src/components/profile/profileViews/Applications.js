import React, { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import 'animate.css'
import axios from 'axios'
import Modal from '../../../Modal'

// components
import SavedYield from './SavedYield'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  faMapMarkerAlt,
  faTags,
  faBed,
  faChartLine
} from '@fortawesome/free-solid-svg-icons'


import {
  getPayloadFromToken,
  getTokenFromLocalStorage
} from '../../../helpers/auth'

const Applications = () => {

  const location = useLocation()
  
  const modal = useRef(null)

  const [userDetails, setUserDetails] = useState(null)
  const [propertyDetails, setPropertyDetails] = useState(null)
  const token = getTokenFromLocalStorage()
  const userID = getPayloadFromToken().sub

  const [propID, setPropID] = useState('')

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

  const openYield = (id) => {
    modal.current.open()
    const getData = async () => {
      const { data } = await axios.get(`api/savedproperties/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setPropertyDetails(data)
    }
    getData()
    setPropID(id)
  }

  if (!userDetails) return null

  return (
    <div>
      <h2>Applications</h2>
      <br />

      <div className="dash-content-box">
        <div className="columns">
          <div className="column">
            {userDetails.saved_properties.map((property) => {
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
                          {
                            <h2>
                              {property.address}
                            </h2>
                          }
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
          propID={propID}
          propertyDetails={propertyDetails}
        />
      </Modal>
    </div>
  )
}

export default Applications
