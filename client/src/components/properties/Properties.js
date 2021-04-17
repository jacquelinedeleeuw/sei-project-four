import React from 'react'
import { Link } from 'react-router-dom'
import { faBath, faBed } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Properties = ({ listings }) => {
  return (
    <section className="column is-half-desktop">
      <div className="columns is-multiline">
        {listings.listing.map((item, index) => {
          return (
            <div
              key={index}
              className="column is-half-desktop is-half-tablet is-full-mobile"
            >
              <Link to={`/properties/${item.listing_id}`}>
                <div className="card">
                  <div className="card-image">
                    <img src={item.image_354_255_url} />
                  </div>
                  <div className="card-content">
                    <div className="card-property-details">
                      <p>For {item.listing_status}</p>
                      <p>{item.property_type}</p>
                    </div>
                    <hr />
<<<<<<< HEAD
                    {item.price === 0 ? <h2>TBC</h2> : <h2>£{item.price}</h2>}
=======
                    {item.price === 0 ?
                      <h2>TBC</h2>
                      :
                      <h2>£{Number(item.price).toLocaleString()}</h2>
                    }
>>>>>>> 535cf3433965e24c359ee4cd1245bbc4572619e5
                    <div className="property-details">
                      {item.num_bedrooms > 0 ? (
                        <>
                          <p>{item.num_bedrooms}</p>
                          <FontAwesomeIcon
                            icon={faBed}
                            className="property-icon fa-1x fa-fw"
                          />
                        </>
                      ) : (
                        <></>
                      )}
                      {item.num_bathrooms > 0 ? (
                        <>
                          <p>{item.num_bathrooms}</p>
                          <FontAwesomeIcon
                            icon={faBath}
                            className="property-icon fa-1x fa-fw"
                          />
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                    <hr />
                    <p>{item.displayable_address}</p>
                  </div>
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Properties
