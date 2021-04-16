import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar'
import Searchbar from './search/Searchbar'
import Properties from './Properties'
import Map from './Map'

const PropertyIndex = () => {

  const zooplaKey = process.env.REACT_APP_ZOOPLA_KEY

  const [search, setSearch] = useState({
    minimum_price: '',
    maximum_price: '',
    minimum_beds: '',
    maximum_beds: '',
    property_type: '',
  })

  const [listings, setListings] = useState(null)
  const [listingsLength, setListingsLength] = useState('')
  const [location, setLocation] = useState(null)
  const [viewPort, setViewPort] = useState()

  const handleChange = (selected, name) => {
    const newSearchData = { ...search, [name]: selected.value }
    setSearch(newSearchData)
  }

  const handleSubmit = event => {
    event.preventDefault()    
    setLocation(event.target[0].value)
    setListingsLength(listings.listing.length)
  }

  useEffect(() => {
    if (!location) {
      const getData = async () => {
        const res = await fetch(`http://api.zoopla.co.uk/api/v1/property_listings.json?area=london&listing_status=sale&page_size=100&api_key=${zooplaKey}`)
        setListings(await res.json())
      }
      getData()
    }
    if (location) {
      const getData = async () => {
        const res = await fetch(`http://api.zoopla.co.uk/api/v1/property_listings.json?area=${location}&listing_status=sale&page_size=100&minimum_beds=${search.minimum_beds}&maximum_beds=${search.maximum_beds}&minimum_price=${search.minimum_price}&maximum_price=${search.maximum_price}&property_type=${search.property_type}&api_key=${zooplaKey}`)
        setListings(await res.json())
      }
      getData()
    }
  }, [location, search])

  useEffect(() => {
    if (listings) {
      const longitude = listings.listing[0].longitude
      const latitude = listings.listing[0].latitude
      setViewPort({ longitude, latitude })
    }
  }, [listings])

  if (!listings) return null
  return (
    <>
      <Navbar />
      <Searchbar 
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        listingsLength={listingsLength}
      />
      <div className="columns">
        <Map 
          listings={listings}
          viewPort={viewPort}
          setViewPort={setViewPort}
        />
        <Properties
          listings={listings}
        />
      </div>
    </>
  )
}

export default PropertyIndex
