import React, { useState } from 'react'
import ReactMapGL, { Popup, Marker } from 'react-map-gl'
import { Link } from 'react-router-dom'
import {
  faHome,
  faBath,
  faBed
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Map = ({ viewPort, setViewPort, listings }) => {

  //map
  const [popup, setPopup] = useState(null)
  if (!listings) return null
  return (
    <div className="column is-half-desktop is-hidden-touch is-hidden-mobile">
      {viewPort ?
        <div className="map-container">
          {viewPort ?
            <ReactMapGL
              mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
              height="100vh"
              width="50vw"
              mapStyle="mapbox://styles/mapbox/light-v10"
              zoom={15}
              {...viewPort}
              onViewportChange={(viewPort) => setViewPort(viewPort)}
            >
              {listings.listing.map((listing, index) => {
                return <Marker 
                  key={index} 
                  longitude={listing.longitude} 
                  latitude={listing.latitude}>
                  <span onClick={() => setPopup(listing)}>
                    <FontAwesomeIcon icon={faHome} className="nav-icon fa-1x fa-fw" />
                  </span>
                </Marker>
              })}
              {popup &&
        <Link to={`/properties/${popup.listing_id}`}>
          <Popup
            latitude={popup.latitude}
            longitude={popup.longitude}
            closeOnClick={false}
            onClose={() => setPopup(null)}
          >
            <img key={popup.index} src={popup.image_354_255_url} alt={popup.displayable_address} />
            {popup.price === 0 ?
              <h2>TBC</h2>
              :
              <h2>£{Number(popup.price).toLocaleString()}</h2>
            }
            <div className="property-details">
              <p>{popup.num_bedrooms} </p>
              <FontAwesomeIcon icon={faBed} className="property-icon fa-1x fa-fw" />
              <p>{popup.num_bathrooms} </p>
              <FontAwesomeIcon icon={faBath} className="property-icon fa-1x fa-fw" />
            </div>
            <hr />
            <p>{popup.displayable_address}</p>
          </Popup>
        </Link>
              }
            </ReactMapGL>
            :
            <p>Loading the location…</p>
          }
        </div>
        :
        <div className="map-container">
          <ReactMapGL
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
            height="100vh"
            width="50vw"
            mapStyle="mapbox://styles/mapbox/light-v10"
            zoom={10}
            latitude={51.4934}
            longitude={0.0098}
          >
          </ReactMapGL>
        </div>
      }
    </div>
  )
}

export default Map
