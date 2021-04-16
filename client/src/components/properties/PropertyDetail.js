import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  faBath,
  faBed,
  faCouch
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const PropertyDetail = () => {

  const zooplaKey = process.env.REACT_APP_ZOOPLA_KEY

  const { id } = useParams()

  const [listing, setListing] = useState(null)

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`http://api.zoopla.co.uk/api/v1/property_listings.json?listing_id=${id}&api_key=${zooplaKey}`)
      setListing(await res.json())
    }
    getData()
  }, [])

  if (!listing) return null
  return (
    <>
      <div className="columns">
        <div className="column is-two-thirds property-detail-view">
          <img src={listing.listing[0].image_645_430_url} className="property-detail"/>
          <p>Guide price</p>
          <h6>£{listing.listing[0].price}</h6>
          <p><b>{listing.listing[0].num_bedrooms} bed {listing.listing[0].property_type} for {listing.listing[0].listing_status}</b></p>
          <p>{listing.listing[0].short_description}</p>
          <hr />
          <div className="property-details-spread">
            <p>{listing.listing[0].displayable_address}</p>
            <div className="property-details">
              <FontAwesomeIcon icon={faBed} className="property-icon fa-1x fa-fw" />
              <p>{listing.listing[0].num_bedrooms} beds</p>
              <FontAwesomeIcon icon={faBath} className="property-icon fa-1x fa-fw" />
              <p>{listing.listing[0].num_bathrooms} baths </p>
              <FontAwesomeIcon icon={faCouch} className="property-icon fa-1x fa-fw" />
              <p>{listing.listing[0].num_recepts} reception</p>
            </div>   
          </div>   
        </div>
        <div className="column is-one-third">
          Lots of amazing calulations and stuff
        </div>
      </div>
    </>
  )
}

export default PropertyDetail
