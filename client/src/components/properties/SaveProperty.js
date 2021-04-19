import React, { useEffect } from 'react'
import {
  faHeart as faHeartSolid
} from '@fortawesome/free-solid-svg-icons'
import {
  faHeart
} from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SaveProperty = ({ user, setListingIdArray, listingIdArray, listing, handleSaveProperty }) => {

  useEffect(() => {
    const listingArray = user.saved_properties.map((item) => item.listing_id)
    setListingIdArray(listingArray)
  }, [])

  if (!listingIdArray) return null
  return (
    <div>
      {listingIdArray.includes(listing.listing[0].listing_id) ?
        <a onClick={handleSaveProperty}><FontAwesomeIcon icon={faHeartSolid} className="property-icon fa-2x fa-fw" /></a>
        :
        <a onClick={handleSaveProperty}><FontAwesomeIcon icon={faHeart} className="property-icon fa-2x fa-fw" /></a>
      }
    </div>
  )
}

export default SaveProperty
