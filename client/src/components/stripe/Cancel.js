import React from 'react'
import Checkout from '../stripe/Checkout'
import { Link } from 'react-router-dom'

const Cancel = () => {

  return (
    <div>
      <h1>Payment cancelled, try again or go back to Home</h1>
      <Checkout />
      <button className="button form-button"><Link to="/">Home</Link></button>
    </div>
  )
}

export default Cancel
