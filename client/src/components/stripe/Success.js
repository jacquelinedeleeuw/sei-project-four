import React, { useEffect } from 'react'
import { getTokenFromLocalStorage, getPayloadFromToken } from '../../helpers/auth'
import axios from 'axios'

const Success = () => {
  
  const userID = getPayloadFromToken().sub

  const token = getTokenFromLocalStorage()

  useEffect( async () => {
    try {
      await axios.patch(`/api/auth/${userID}/`, { pro: 'True' }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    } catch (err) {
      console.log(err.response.data)
    }
    window.location.replace('/myprofile')
  }, [])

  return (
    <div>
      Success! You will be redirected to your profile
    </div>
  )
}

export default Success
