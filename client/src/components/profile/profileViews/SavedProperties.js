import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import axios from 'axios'
// components

//prettier-ignore
import {
  getPayloadFromToken,
  getTokenFromLocalStorage
} from '../../../helpers/auth'

const SavedProperties = () => {
  const location = useLocation()

  const [userDetails, setUserDetails] = useState(null)
  const token = getTokenFromLocalStorage()
  const userID = getPayloadFromToken().sub

  useEffect(() => {}, [location.pathname])

  console.log(userDetails)

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`api/auth/${userID}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setUserDetails(data)
    }
    getData()
  }, [])

  if (!userDetails) return null

  return (
    <div>
      <h2>Saved Properties</h2>
      <br />

      <div className="dash-content-box">
        <div className="container saved-property-card">hello</div>
      </div>
    </div>
  )
}

export default SavedProperties
