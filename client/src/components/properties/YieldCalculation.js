import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { getTokenFromLocalStorage } from '../../helpers/auth'

const YieldCalculation = ({ user, listings, listing, propertyIndex, propertyIndexArray }) => {

  const history = useHistory()
  const token = getTokenFromLocalStorage()
  
  const [calculations, setCalculations] = useState(false)
  const [property, setProperty] = useState(null)
  
  const avgPriceArray = listings.listing.map((item) => item.rental_prices.per_month)
  const price = avgPriceArray.reduce((acc, item) => {
    const price = acc += Number(item)
    return price
  }, 0)
  const avgPrice = (price === 0) ? 0 : price / avgPriceArray.length
  const propId = user.saved_properties.filter(item => (item.listing_id === listing.listing[0].listing_id) ?? item)

  const [yieldData, setYieldData] = useState({
    purchasePrice: Number(listing.listing[0].price),
    deposit: Number(listing.listing[0].price * 0.10),
    loanTerms: 25,
    refurb: 0,
    purchaseCosts: 0,
    monthlyRent: Number(avgPrice),
    annualMaintenance: 500,
    managementFee: 6,
    mortgageInterest: 3,
    saved_property: '',
  })
  

  // Form Submit
  const { register, handleSubmit } = useForm()
  const onSubmit = async () => {
    setYieldData({ ...yieldData })
    try {
      await axios.patch(`/api/yield/${property.yield_calculations[0].id}/`, yieldData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      history.push('/myprofile')
    } catch (err) {
      console.log(err.message)
    }
  }

  // Handle change on form, recalculate data and set to state
  const handleChange = (event) => {
    const newYieldData = { ... yieldData, [event.target.name]: Number(event.target.value) }
    setYieldData(newYieldData)
  }

  // Submit calculations, set to state, get yield ID and property ID
  const handleCalculations = () => {
    if (propertyIndexArray.includes(propertyIndex)) {
      setYieldData({ ...yieldData, saved_property: propId[0].id })
      setCalculations(true)
    }
    const propID = user.saved_properties.filter(item => (item.listing_id === listing.listing[0].listing_id) ?? item)
    const getUserData = async () => {
      const { data } = await axios.get(`/api/savedproperties/${propID[0].id}`)
      setProperty(data)
    }
    getUserData()
  }

  return (
    <div className="column is-one-third">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="column login-form-form"
      >
        {propertyIndexArray.includes(propertyIndex) ?
          <>
            <div className="field">
              <div className="form-label">
                <label>Purchase Price</label>
              </div>
              <input
                className="input"
                defaultValue={Number(listing.listing[0].price)}
                placeholder={Number(yieldData.purchasePrice).toLocaleString()}
                name="purchasePrice"
                ref={register}
                onChange={handleChange}
              />
            </div>
            <div className="field">
              <div className="form-label">
                <label>Deposit</label>
              </div>
              <input
                className="input"
                defaultValue={Number(listing.listing[0].price * 0.10)}
                placeholder={Number(yieldData.deposit).toLocaleString()}
                name="deposit"
                ref={register}
                onChange={handleChange}
              />
            </div>
            <div className="field">
              <div className="form-label">
                <label>Loan terms in years</label>
              </div>
              <input
                className="input"
                defaultValue={25}
                placeholder={25}
                name="loanTerms"
                ref={register}
                onChange={handleChange}
              />
            </div>
            <div className="field">
              <div className="form-label">
                <label>Refurb</label>
              </div>
              <input
                className="input"
                defaultValue={Number(yieldData.refurb)}
                placeholder={Number(yieldData.refurb).toLocaleString()}
                name="refurb"
                ref={register}
                onChange={handleChange}
              />
            </div>
            <div className="field">
              <div className="form-label">
                <label>Purchase Costs</label>
              </div>
              <input
                className="input"
                defaultValue={Number(yieldData.purchaseCosts)}
                placeholder={Number(yieldData.purchaseCosts).toLocaleString()}
                name="purchaseCosts"
                ref={register}
                onChange={handleChange}
              />
            </div>
            <p>Total Funds Required £{(Number(yieldData.deposit) + Number(yieldData.refurb) + Number(yieldData.purchaseCosts)).toLocaleString()}</p>
            <hr />
            <div className="field">
              <div className="form-label">
                <label>Annual Maintenance</label>
              </div>
              <input
                className="input"
                defaultValue={500}
                placeholder={0}
                name="annualMaintenance"
                ref={register}
                onChange={handleChange}
              />
            </div>
            <div className="field">
              <div className="form-label">
                <label>Annual Management Fee %</label>
              </div>
              <input
                className="input"
                defaultValue={6}
                placeholder={6}
                name="managementFee"
                ref={register}
                onChange={handleChange}
              />
            </div>
            <div className="field">
              <div className="form-label">
                <label>Annual Mortgage Interest %</label>
              </div>
              <input
                className="input"
                defaultValue={3}
                placeholder={3}
                name="mortgageInterest"
                ref={register}
                onChange={handleChange}
              />
            </div>
            <p>Total Annual Costs £{(Number(yieldData.annualMaintenance) + Number(((yieldData.monthlyRent * 12) / 100 * yieldData.managementFee)) + Number(yieldData.purchasePrice / 100 * yieldData.mortgageInterest)).toFixed(2)}</p>
            <hr />
            <div className="field">
              <div className="form-label">
                <label>Monthly rent</label>
              </div>
              <input
                className="input"
                defaultValue={Number(avgPrice)}
                placeholder={Number(avgPrice)}
                name="monthlyRent"
                ref={register}
                onChange={handleChange}
              />
            </div>
            <hr />
          </>
          :
          <div>Like the property to save and amend calculations</div>
        }
        <p>Predicted Returns</p>
        <p>Monthly Cashflow £{(yieldData.monthlyRent - (Number(yieldData.purchasePrice / 100 * yieldData.mortgageInterest) / 12)).toFixed(2)}</p>
        <p>Net Annual Income £{((yieldData.monthlyRent * 12) - ((Number(yieldData.annualMaintenance) - Number(((yieldData.monthlyRent * 12) / 100 * yieldData.managementFee)) - Number(yieldData.purchasePrice / 100 * yieldData.mortgageInterest)))).toFixed(2)}</p>
        <p>Revaluation £{Number(listing.listing[0].price).toLocaleString()}</p>
        <p>Equity Tied Up £{(Number(yieldData.deposit) + Number(yieldData.refurb) + Number(yieldData.purchaseCosts)).toLocaleString()}</p>
        <p>Gross Yield {(((yieldData.monthlyRent * 12)) / (Number(yieldData.deposit) + Number(yieldData.refurb) + Number(yieldData.purchaseCosts)) * 100).toFixed(2)}%</p>
        <p>Net Yield {(((yieldData.monthlyRent * 12) - (Number(yieldData.annualMaintenance) - Number(((yieldData.monthlyRent * 12) / 100 * yieldData.managementFee)) - Number(yieldData.purchasePrice / 100 * yieldData.mortgageInterest))) / Number(Number(yieldData.deposit) + Number(yieldData.refurb) + Number(yieldData.purchaseCosts)) * 100).toFixed(2)}%</p>
        {propertyIndexArray.includes(propertyIndex) &&
        <>
          {!calculations &&
          <button className="button get-started-button" onClick={handleCalculations}> Calculate</button>
          }
        </>
        }
        {propertyIndexArray.includes(propertyIndex) &&
        <>
          {calculations &&
          <button className="button get-started-button" onSubmit={handleSubmit}>Save yield calculations</button>
          }
        </>
        }
      </form>
    </div>
  )
}

export default YieldCalculation
