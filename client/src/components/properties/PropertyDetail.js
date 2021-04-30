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

//Components

import YieldCalculation from './YieldCalculation'
import SaveProperty from './SaveProperty'
import Footer from '../Footer'
import DetailNavbar from './search/DetailNav'

const PropertyDetail = () => {
  const zooplaKey = process.env.REACT_APP_ZOOPLA_KEY
  const token = getTokenFromLocalStorage()
  const userID = getPayloadFromToken().sub
  const history = useHistory()
  const goToPreviousPath = () => {
    history.goBack()
  }

  const { id } = useParams()
  const { postcode } = useParams()
  const { beds } = useParams()

  const [listing, setListing] = useState(null)
  const [listings, setListings] = useState(null)
  const [user, setUser] = useState(null)
  const [propertyIndex, setPropertyIndex] = useState(null)
  const [propertyIndexArray, setPropertyIndexArray] = useState(null)

  // Like and save properties (delete or post depending on user)
  const handleSaveProperty = () => {
    updateUserData()
    let favId
    user.saved_properties.map((item) => {
      if (item.listing_id === listing.listing[0].listing_id) {
        favId = item.id
      }
    })
    if (propertyIndexArray.includes(propertyIndex)) {
      axios.delete(`/api/savedproperties/${favId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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
        updateUserDataWithYield()
      } catch (err) {
        console.log(err)
      }
    }
  }

  // Get data for details of property
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(
        `https://api.zoopla.co.uk/api/v1/property_listings.json?listing_id=${id}&api_key=${zooplaKey}`
      )
      setListing(data)
      setPropertyIndex(data.listing[0].listing_id)
    }
    getData()
  }, [])

  // Get properties data for calculations
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          `https://api.zoopla.co.uk/api/v1/property_listings.json?area=${postcode}&minimum_beds=${beds}&maximum_beds=${beds}&listing_status=rent&api_key=${zooplaKey}`
        )
        setListings(data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])

  // GET data for user saved properties
  useEffect(() => {
    const getUserData = async () => {
      const { data } = await axios.get(`/api/auth/${userID}/`, {
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

  // Update user data for saved properties ONLY when unlike
  const updateUserData = async () => {
    const { data } = await axios.get(`/api/auth/${userID}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    setUser(data)
    setPropertyIndexArray(data.saved_properties.map((item) => item.listing_id))
  }

  // Update user data for saved properties when like and run yield post function
  const updateUserDataWithYield = async () => {
    const { data } = await axios.get(`/api/auth/${userID}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    setUser(data)
    setPropertyIndexArray(data.saved_properties.map((item) => item.listing_id))
    const propID = data.saved_properties.filter(
      (item) => item.listing_id === listing.listing[0].listing_id ?? item
    )
    handleYieldCalculations(propID)
  }

  // Function to post yield calculations to the saved property
  const handleYieldCalculations = async (propID) => {
    const avgPriceArray = listings.listing.map(
      (item) => item.rental_prices.per_month
    )
    const price = avgPriceArray.reduce((acc, item) => {
      const price = (acc += Number(item))
      return price
    }, 0)
    const avgPrice = price === 0 ? 0 : price / avgPriceArray.length
    try {
      await axios.post('/api/yield/', {
        purchasePrice: Number(listing.listing[0].price),
        deposit: Number(listing.listing[0].price * 0.1),
        loanTerms: 25,
        refurb: 0,
        purchaseCosts: 0,
        monthlyRent: Number(avgPrice),
        annualMaintenance: 500,
        managementFee: 6,
        mortgageInterest: 3,
        saved_property: propID[0].id,
      })
    } catch (err) {
      console.log(err.message)
    }
    const yieldly =
      ((Number(avgPrice) * 12 -
        Number(((avgPrice * 12) / 100) * 6) -
        Number((Number(listing.listing[0].price) / 100) * 3)) /
        Number(Number(Number(listing.listing[0].price * 0.1)))) *
      100
    try {
      await axios.patch(
        `/api/savedproperties/${propID[0].id}/`,
        { yield_percentage: yieldly },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
    } catch (err) {
      console.log(err.message)
    }
  }

  if (!listing || !user || !listings) return null
  return (
    <>
      <DetailNavbar user={user} />
      <div className="detail-container">
        <div className="columns">
          <div className="column property-detail-view">
            <div className="back-button" onClick={goToPreviousPath}>
              <p>{'<'} Back to search</p>
            </div>

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
            <div>
              <h3>
                {listing.listing[0].num_bedrooms} bed{' '}
                {listing.listing[0].property_type} for{' '}
                {listing.listing[0].listing_status}
              </h3>
            </div>
            <br />

            <p>{listing.listing[0].short_description}</p>
            <br />

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
            <hr />
            <br />
            <h3>More information</h3>
            <a
              href={`https://www.zoopla.co.uk/for-sale/details/${listing.listing[0].listing_id}/`}
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="https://www.zoopla.co.uk/static/images/mashery/powered-by-zoopla-150x73.png"
                width="150"
                height="73"
                title="Property information powered by Zoopla"
                alt="Property information powered by Zoopla"
                border="0"
              />
            </a>

            <br />
            <div className="yield-box-container">
              <YieldCalculation
                listing={listing}
                listings={listings}
                user={user}
                propertyIndex={propertyIndex}
                propertyIndexArray={propertyIndexArray}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default PropertyDetail
