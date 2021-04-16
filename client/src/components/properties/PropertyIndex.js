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
  const [location, setLocation] = useState(null)

  const handleChange = (selected, name) => {
    const newSearchData = { ...search, [name]: selected.value }
    setSearch(newSearchData)
  }

  const handleSubmit = event => {
    event.preventDefault()    
    setLocation(event.target[0].value)
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
  }, [location])

  if (!listings) return null
  return (
    <>
      <Navbar />
      <Searchbar 
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
      <div className="columns">
        <Map />
        <Properties
          listings={listings}
        />
      </div>
    </>
  )
}

export default PropertyIndex
