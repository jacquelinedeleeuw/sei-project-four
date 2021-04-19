import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'
import { faBath, faBed, faCouch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//prettier-ignore
import {
  getPayloadFromToken,
  getTokenFromLocalStorage
} from '../../helpers/auth'
import YieldCalculation from './YieldCalculation'
import SaveProperty from './SaveProperty'

const PropertyDetail = () => {
  const zooplaKey = process.env.REACT_APP_ZOOPLA_KEY
  const token = getTokenFromLocalStorage()
  const userID = getPayloadFromToken().sub

  const { id } = useParams()
  const { postcode } = useParams()
  const { beds } = useParams()

  const [listing, setListing] = useState(null)
  const [listings, setListings] = useState(null)
  const [user, setUser] = useState(null)
  const [propertyIndex, setPropertyIndex] = useState(null)
  const [propertyIndexArray, setPropertyIndexArray] = useState(null)
  // const [propId, setPropId] = useState(null)

  // Like and save properties
  const handleSaveProperty = () => {
    updateUserData()
    let favId
    user.saved_properties.map((item) => {
      if (item.listing_id === listing.listing[0].listing_id) {
        favId = item.id
        // setPropId(item.id)
      }
    })
    if (propertyIndexArray.includes(propertyIndex)) {
      axios.delete(`/api/savedproperties/${favId}`)
      updateUserData()
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
        updateUserData()
      } catch (err) {
        console.log(err)
      }
    }
  }

  // Get data for details of property
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(
        `http://api.zoopla.co.uk/api/v1/property_listings.json?listing_id=${id}&api_key=${zooplaKey}`
      )
      setListing(data)
      setPropertyIndex(data.listing[0].listing_id)
    }
    getData()
  }, [])

  // GET data for user saved properties
  useEffect(() => {
    const getUserData = async () => {
      const { data } = await axios.get(`/api/auth/${userID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setUser(data)
      setPropertyIndexArray(
        data.saved_properties.map((item) => item.listing_id)
      )
    }
    getUserData()
  }, [])

  const updateUserData = async () => {
    const { data } = await axios.get(`/api/auth/${userID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    setUser(data)
    setPropertyIndexArray(data.saved_properties.map((item) => item.listing_id))
  }

  // Get properties data for calculations
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          `http://api.zoopla.co.uk/api/v1/property_listings.json?area=${postcode}&minimum_beds=${beds}&maximum_beds=${beds}&listing_status=rent&api_key=${zooplaKey}`
        )
        setListings(data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])

  const history = useHistory()

  const goToPreviousPath = () => {
    history.goBack()
  }

  if (!listing || !user || !listings) return null
  return (
    <div className="columns">
      <button onClick={goToPreviousPath} className="button get-started-button">
        Go back
      </button>
      <div className="column is-two-thirds property-detail-view">
        <img
          src={listing.listing[0].image_645_430_url}
          className="property-detail"
        />
        <div className="property-details-spread">
          <p>Guide price</p>
          <SaveProperty
            handleSaveProperty={handleSaveProperty}
            propertyIndex={propertyIndex}
            propertyIndexArray={propertyIndexArray}
          />
        </div>
        <h6>£{Number(listing.listing[0].price).toLocaleString()}</h6>
        <p>
          <b>
            {listing.listing[0].num_bedrooms} bed{' '}
            {listing.listing[0].property_type} for{' '}
            {listing.listing[0].listing_status}
          </b>
        </p>
        <p>{listing.listing[0].short_description}</p>
        <hr />
        <div className="property-details-spread">
          <p>{listing.listing[0].displayable_address}</p>
          <div className="property-details">
            <FontAwesomeIcon
              icon={faBed}
              className="property-icon fa-1x fa-fw"
            />
            <p>{listing.listing[0].num_bedrooms} beds</p>
            <FontAwesomeIcon
              icon={faBath}
              className="property-icon fa-1x fa-fw"
            />
            <p>{listing.listing[0].num_bathrooms} baths </p>
            <FontAwesomeIcon
              icon={faCouch}
              className="property-icon fa-1x fa-fw"
            />
            <p>{listing.listing[0].num_recepts} reception</p>
          </div>
        </div>
      </div>
      {/* <button onClick={handleCalculations}>Click for calculations</button> */}
      <YieldCalculation
        listing={listing}
        listings={listings}
        user={user}
        propertyIndex={propertyIndex}
        propertyIndexArray={propertyIndexArray}
      />
    </div>
  )
}

export default PropertyDetail
