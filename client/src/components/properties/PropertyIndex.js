import React, { useState, useEffect } from 'react'

//Components
import Searchbar from './search/Searchbar'
import Properties from './Properties'
import Map from './Map'
import IndexNav from './search/IndexNav'
import axios from 'axios'

const PropertyIndex = () => {
  const zooplaKey = process.env.REACT_APP_ZOOPLA_KEY

  const [search, setSearch] = useState({
    minimum_price: '',
    maximum_price: '',
    minimum_beds: '',
    maximum_beds: '',
    property_type: '',
    order_by: 'price',
    ordering: 'descending',
  })

  const [listings, setListings] = useState(null)
  const [listingsLength, setListingsLength] = useState(null)
  const [location, setLocation] = useState(null)
  const [viewPort, setViewPort] = useState(null)
  const [noProperties, setNoProperties] = useState('')

  const handleChange = (selected, name) => {
    const newSearchData = { ...search, [name]: selected.value }
    setSearch(newSearchData)
    setNoProperties('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (listings) {
      setLocation(event.target[0].value)
      setListingsLength(listings.listing.length)
    }
  }

  useEffect(() => {
    if (!location) {
      const getData = async () => {
        try {
          const { data } = await axios.get(
            `http://api.zoopla.co.uk/api/v1/property_listings.json?area=london&listing_status=sale&maximum_price=200000&page_size=100&api_key=${zooplaKey}`
          )
          setListings(data)
        } catch (err) {
          console.log(err)
        } 
      }
      getData()
    }
    if (location) {
      const getData = async () => {
        try {
          const { data } = await axios.get(
            `http://api.zoopla.co.uk/api/v1/property_listings.json?area=${location}&listing_status=sale&page_size=100&minimum_beds=${search.minimum_beds}&maximum_beds=${search.maximum_beds}&minimum_price=${search.minimum_price}&maximum_price=${search.maximum_price}&property_type=${search.property_type}&order_by=${search.order_by}&ordering=${search.ordering}&api_key=${zooplaKey}`
          )
          // handleViewport(data)
          const longitude = data.listing[0].longitude
          const latitude = data.listing[0].latitude
          setViewPort({ longitude, latitude })
          setListings(data)
        } catch (err) {
          console.log(err)
          setListings('')
          setNoProperties('No properties found')
        }
      }
      getData()
    }
  }, [location, search])

  return (
    <>
      <IndexNav />
      <Searchbar
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        listingsLength={listingsLength}
      />
      {noProperties}
      <div className="columns">
        {listings && (
          <>
            <Map
              listings={listings}
              viewPort={viewPort}
              setViewPort={setViewPort}
            />
            <Properties listings={listings} />
          </>
        )}
      </div>
    </>
  )
}

export default PropertyIndex
