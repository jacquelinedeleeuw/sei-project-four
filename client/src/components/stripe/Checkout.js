import React, { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)

const ProductDisplay = ({ handleClick }) => (
  <section>
    <p>Subscribe to pro for lifetime access to view, amend and save calculations</p>
    <br />
    <button className="button setting-button yieldly-plan-button" type="button" id="checkout-button" role="link" onClick={handleClick}>
      Upgrade to Pro £149.99 
    </button>
  </section>
)

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
)

export default function Checkout () {
  const [message, setMessage] = useState('')
  useEffect( async () => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search)
    if (query.get('success')) {
      setMessage('Order placed! You will receive an email confirmation.')
    }
    if (query.get('canceled')) {
      setMessage('Order canceled -- continue to shop around and checkout when you\'re ready.')
    }
  }, [])
  const handleClick = async () => {
    const stripe = await stripePromise
    console.log('promise', stripePromise)
    const response = await fetch('/api/checkout/', {
      method: 'POST',
    })
    console.log('response', response)
    const session = await response.json()
    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    })
    console.log('result', result)
  }
  return message ? (
    <Message message={message} />
  ) : (
    <ProductDisplay handleClick={handleClick} />
  )
}