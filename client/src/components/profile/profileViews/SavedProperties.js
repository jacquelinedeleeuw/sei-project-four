import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import 'animate.css'
import axios from 'axios'
// components

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//prettier-ignore
import {
  faMapMarkerAlt
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

  useEffect(() => {}, [location.pathname])

  console.log(userDetails)

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
  function openNav() {
    document.getElementById('mySidebar').style.width = '400px'
  }

  /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
  function closeNav() {
    document.getElementById('mySidebar').style.width = '0'
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
                <>
                  <div
                    key={property.id}
                    className="container saved-property-card animate__animated animate__fadeInUp"
                    onClick={openNav}
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
                                {property.address}, {property.postcode}
                              </h2>
                            }
                          </div>
                        </div>
                        <hr />
                        <div className="container">
                          <p>{property.short_description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )
            })}
          </div>
          <div classNameName="column">
            <div id="mySidebar" className="sidebar">
              <a
                href="javascript:void(0)"
                className="closebtn"
                onClick={closeNav}
              >
                &times;
              </a>

              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SavedProperties
