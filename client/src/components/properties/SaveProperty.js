import React from 'react'
import {
  faHeart as faHeartSolid
} from '@fortawesome/free-solid-svg-icons'
import {
  faHeart
} from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SaveProperty = ({ propertyIndex, propertyIndexArray, handleSaveProperty }) => {

  if (!propertyIndexArray || !propertyIndex) return null
  return (
    <div>
      {propertyIndexArray.includes(propertyIndex) ?
        <a onClick={handleSaveProperty}><FontAwesomeIcon icon={faHeartSolid} className="property-icon fa-2x fa-fw" /></a>
        :
        <a onClick={handleSaveProperty}><FontAwesomeIcon icon={faHeart} className="property-icon fa-2x fa-fw" /></a>
      }
    </div>
  )
}

export default SaveProperty
