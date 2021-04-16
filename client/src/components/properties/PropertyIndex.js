import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar'
import Searchbar from './search/Searchbar'

const PropertyIndex = () => {

  const [listings, setListings] = useState(null)

  useEffect(() => {
    const getData = async () => {
      const res = await fetch('http://api.zoopla.co.uk/api/v1/property_listings.json?area=london&listing_status=sale&page_size=100&api_key=yqxm693k28r6vn3pmm2r4fvm')
      setListings(await res.json())
    }
    getData()
  }, [])

  if (!listings) return null
  return (
    <>
      <Navbar />
      <Searchbar />
      <section>
        <div className="columns is-multiline">
          {listings.listing.map((item, index) => {
            return (
              <div key={index} className="column is-one-quarter-desktop is-one-third-tablet">
                <div className="card">
                  <div className="card-image">
                    <img src={item.image_354_255_url} />
                  </div>
                  <div className="card-content">
                    <p>{item.displayable_address}</p>
                    <p>£{item.price}</p>
                    <p>{item.property_type}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}

export default PropertyIndex
