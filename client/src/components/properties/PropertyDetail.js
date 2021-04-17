import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {
  faBath,
  faBed,
  faCouch,
  faHeart as faHeartSolid
} from '@fortawesome/free-solid-svg-icons'
import {
  faHeart
} from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getPayloadFromToken, getTokenFromLocalStorage } from '../../helpers/auth'

const PropertyDetail = () => {

  const zooplaKey = process.env.REACT_APP_ZOOPLA_KEY

  const token = getTokenFromLocalStorage()

  const { id } = useParams()

  const [listing, setListing] = useState(null)
  const [user, setUser] = useState(null)

  const userID = getPayloadFromToken().sub

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`http://api.zoopla.co.uk/api/v1/property_listings.json?listing_id=${id}&api_key=${zooplaKey}`)
      setListing(await res.json())
    }
    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`/api/auth/${userID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setUser(await res.json())
    }
    getData()
  }, [])

  console.log(user.saved_properties)

  const handleSaveProperty = async () => {
    try {
      await axios.post('/api/savedproperties/', {
        address: listing.listing[0].displayable_address,
        postcode: listing.listing[0].outcode,
        short_description: listing.listing[0].short_description,
        property_type: listing.listing[0].property_type,
        image: listing.listing[0].image_645_430_url,
        price: listing.listing[0].price,
        beds: listing.listing[0].num_bedrooms,
        baths: listing.listing[0].num_bathrooms,
        receptions: listing.listing[0].num_recepts,
        listing_id: listing.listing[0].listing_id,
        user: userID,
      })
    } catch (err) {
      console.log(err)
    }
  }

  if (!listing) return null
  return (
    <>
      <div className="columns">
        <div className="column is-two-thirds property-detail-view">
          <img src={listing.listing[0].image_645_430_url} className="property-detail"/>
          <div className="property-details-spread">
            <p>Guide price</p>
            <a onClick={handleSaveProperty}><FontAwesomeIcon icon={faHeart} className="property-icon fa-2x fa-fw" /></a>
            <a onClick={handleSaveProperty}><FontAwesomeIcon icon={faHeartSolid} className="property-icon fa-2x fa-fw" /></a>
          </div>
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
