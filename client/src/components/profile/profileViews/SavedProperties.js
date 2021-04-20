import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import 'animate.css'
import axios from 'axios'
// components
import PropertySidebar from './PropertySidebar'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//prettier-ignore
import {
  faMapMarkerAlt,
  faTags,
  faBed,
  faChartLine
} from '@fortawesome/free-solid-svg-icons'

//prettier-ignore
import {
  getPayloadFromToken,
  getTokenFromLocalStorage
} from '../../../helpers/auth'

const SavedProperties = () => {
  const location = useLocation()

  const [userDetails, setUserDetails] = useState(null)
  const token = getTokenFromLocalStorage()
  const userID = getPayloadFromToken().sub

  const [propID, setPropID] = useState('')

  const [content, setContent] = useState(false)

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

  /* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
  function openNav(id) {
    document.getElementById('mySidebar').style.width = '400px'

    setTimeout(() => {
      setContent(true)
    }, 400)

    setPropID(id)
  }

  /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
  function closeNav() {
    document.getElementById('mySidebar').style.width = '0'

    setContent(false)
  }

  if (!userDetails) return null

  return (
    <div>
      <h2>Saved Properties</h2>
      <br />

      <div className="dash-content-box">
        <div className="columns">
          <div className="column">
            {userDetails.saved_properties.map((property) => {
              return (
                <div
                  key={property.id}
                  className="container saved-property-card animate__animated animate__fadeInUp"
                  onClick={() => openNav(property.id)}
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
                                <p>{Number(property.yield_percentage).toFixed(2)}%</p>
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
          <div>
            <div id="mySidebar" className="sidebar">
              <a className="closebtn" onClick={closeNav}>
                &times;
              </a>
              <div className="side-bar-container">
                {content && <PropertySidebar propID={propID} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SavedProperties
