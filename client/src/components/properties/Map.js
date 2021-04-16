import React, { useState } from 'react'
import ReactMapGL, { Popup, Marker } from 'react-map-gl'
import {
  faHome
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Map = ({ viewPort, setViewPort, listings }) => {

  //map
  const [popup, setPopup] = useState(null)

  return (
    <div className="column is-half">
      <div className="map-container">
        {viewPort ?
          <ReactMapGL
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
            height="100vh"
            width="50vw"
            mapStyle="mapbox://styles/mapbox/streets-v11"
            zoom={15}
            {...viewPort}
            onViewportChange={(viewPort) => setViewPort(viewPort)}
          >
            {listings.listing.map(listing => {
              return <Marker 
                key={listing.id} 
                longitude={listing.longitude} 
                latitude={listing.latitude}>
                <span onClick={() => setPopup(listing)}>
                  <FontAwesomeIcon icon={faHome} className="nav-icon fa-1x fa-fw" />
                </span>
              </Marker>
            })}
            {popup &&
        <Popup
          latitude={popup.latitude}
          longitude={popup.longitude}
          closeOnClick={true}
          onClose={() => setPopup(null)}
        >
          <div>{popup.displayable_address}</div>
          <img key={popup.id} src={popup.image_354_255_url} alt={popup.displayable_address} />
        </Popup>
            }
          </ReactMapGL>
          :
          <p>Loading your location…</p>
        }
      </div>
    </div>
  )
}

export default Map
