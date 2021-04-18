import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
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
import YieldCalculation from './YieldCalculation'

const PropertyDetail = () => {

  const zooplaKey = process.env.REACT_APP_ZOOPLA_KEY
  const token = getTokenFromLocalStorage()
  const { id } = useParams()
  const { postcode } = useParams()
  const { beds } = useParams()
  console.log(postcode)
  const [listing, setListing] = useState(null)
  const [listings, setListings] = useState(null)
  const [user, setUser] = useState(null)

  const userID = getPayloadFromToken().sub

  const handleSaveProperty = () => {
    let favId
    user.saved_properties.map(item => {
      if (item.listing_id === listing.listing[0].listing_id) {
        favId = item.id
      }
    })
    if (listingIdArray.includes(listing.listing[0].listing_id)) {
      axios.delete(`/api/savedproperties/${favId}`)
    } else {
      try {
        axios.post('/api/savedproperties/', {
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
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`http://api.zoopla.co.uk/api/v1/property_listings.json?area=${postcode}&minimum_beds=${beds}&maximum_beds=${beds}&listing_status=rent&api_key=${zooplaKey}`)
        setListings(await res.json())
        console.log('test')
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])

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
  }, [handleSaveProperty])

  const history = useHistory()

  const goToPreviousPath = () => {
    history.goBack()
  }

  let listingIdArray

  if (!listing || !user || !listings) return null
  else {
    {listingIdArray = user.saved_properties.map((item) => item.listing_id)}
  }
  return (
    <div className="columns">
      <button onClick={goToPreviousPath} className="button get-started-button">Go back</button>
      <div className="column is-two-thirds property-detail-view">
        <img src={listing.listing[0].image_645_430_url} className="property-detail"/>
        <div className="property-details-spread">
          <p>Guide price</p>
          <div>
            {listingIdArray.includes(listing.listing[0].listing_id) ?
              <a onClick={handleSaveProperty}><FontAwesomeIcon icon={faHeartSolid} className="property-icon fa-2x fa-fw" /></a>
              :
              <a onClick={handleSaveProperty}><FontAwesomeIcon icon={faHeart} className="property-icon fa-2x fa-fw" /></a>
            }
          </div>
        </div>
        <h6>£{Number(listing.listing[0].price).toLocaleString()}</h6>
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
      <YieldCalculation
        listing={listing}
        listings={listings} 
      />
    </div>
  )
}

export default PropertyDetail
