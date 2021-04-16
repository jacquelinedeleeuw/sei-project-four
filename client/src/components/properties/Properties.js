import React from 'react'

const Properties = ({ listings }) => {
  return (
    <section className="column is-half">
      <div className="columns is-multiline">
        {listings.listing.map((item, index) => {
          return (
            <div key={index} className="column is-half-desktop is-full-tablet">
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
  )
}

export default Properties
