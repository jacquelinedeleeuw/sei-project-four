import React from 'react'
import { Link } from 'react-router-dom'
import { faBath, faBed } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Properties = ({ listings }) => {

  return (
    <section className="column is-half-desktop">
      <div className="columns card-box is-multiline ">
        {listings &&
          listings.listing.map((item, index) => {
            return (
              <div
                className="column card-container is-half-desktop is-half-tablet is-full-mobile  animate__animated animate__fadeInUp"
                key={index}
              >
                <Link
                  to={`/properties/${item.listing_id}/${item.outcode}/${item.num_bedrooms}`}
                >
                  <div className="">
                    <div className="card-image">
                      <img src={item.image_354_255_url} />
                    </div>
                  </div>
                  <div className="card-content">
                    <div className="card-property-details">
                      <p>For {item.listing_status}</p>
                      <p>{item.property_type}</p>
                    </div>
                    <hr />
                    {item.price === 0 ? (
                      <h2>TBC</h2>
                    ) : (
                      <h2>£{Number(item.price).toLocaleString()}</h2>
                    )}
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
                </Link>
              </div>
            )
          })}
      </div>
      <div className="load-more-box">
        {/* <div
          className="button load-button"
          onClick={() => SetMoreProperties(moreProperties + 10)}
        >
          Load more
        </div> */}
      </div>
    </section>
  )
}

export default Properties
