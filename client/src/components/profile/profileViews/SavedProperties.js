import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

//prettier-ignore

import axios from 'axios'
// components

// import Upload from '../UploadImage'
// import Modal from '../../../Modal'
// import UpdateProfile from '../UpdateProfile'

//helpers

// import { convertTimestamp } from '../../../helpers/helpersFunctions'
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

      <div className="columns dash-content-box">hello</div>
    </div>
  )
}

export default SavedProperties
