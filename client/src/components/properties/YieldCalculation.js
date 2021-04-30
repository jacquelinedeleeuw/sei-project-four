import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { getTokenFromLocalStorage } from '../../helpers/auth'

import {
  faMoneyCheckAlt,
  faFileInvoiceDollar,
  faCoins,
  faChartPie,
  faChartLine,
  faHandHoldingUsd
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Checkout from '../stripe/Checkout'

const YieldCalculation = ({
  user,
  listings,
  listing,
  propertyIndex,
  propertyIndexArray,
}) => {
  const history = useHistory()
  const token = getTokenFromLocalStorage()

  const [calculations, setCalculations] = useState(false)
  const [property, setProperty] = useState(null)
  const [yieldly, setYieldly] = useState(null)

  const avgPriceArray = listings.listing.map(
    (item) => item.rental_prices.per_month
  )
  const price = avgPriceArray.reduce((acc, item) => {
    const price = (acc += Number(item))
    return price
  }, 0)
  const avgPrice = price === 0 ? 0 : price / avgPriceArray.length
  const propId = user.saved_properties.filter(
    (item) => item.listing_id === listing.listing[0].listing_id ?? item
  )

  const [yieldData, setYieldData] = useState({
    purchasePrice: Number(listing.listing[0].price),
    deposit: Number(listing.listing[0].price * 0.1),
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
      await axios.patch(
        `/api/yield/${property.yield_calculations[0].id}/`,
        yieldData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      history.push('/myprofile')
    } catch (err) {
      console.log(err.message)
    }
    try {
      await axios.patch(
        `/api/savedproperties/${property.id}/`, { yield_percentage: yieldly },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
    } catch (err) {
      console.log(err.message)
    }
  }

  // Handle change on form, recalculate data and set to state
  const handleChange = (event) => {
    setYieldly(((yieldData.monthlyRent * 12 -
      Number(yieldData.annualMaintenance) -
      Number(((yieldData.monthlyRent * 12) / 100) * yieldData.managementFee) -
      Number((yieldData.purchasePrice / 100) * yieldData.mortgageInterest)) /
      Number(
        Number(yieldData.deposit) +
          Number(yieldData.refurb) +
          Number(yieldData.purchaseCosts)
      )) *
    100)
    const newYieldData = {
      ...yieldData,
      [event.target.name]: Number(event.target.value),
    }
    setYieldData(newYieldData)
  }

  // Submit calculations, set to state, get yield ID and property ID
  const handleCalculations = () => {
    setYieldly(((yieldData.monthlyRent * 12 -
      Number(yieldData.annualMaintenance) -
      Number(((yieldData.monthlyRent * 12) / 100) * yieldData.managementFee) -
      Number((yieldData.purchasePrice / 100) * yieldData.mortgageInterest)) /
      Number(
        Number(yieldData.deposit) +
          Number(yieldData.refurb) +
          Number(yieldData.purchaseCosts)
      )) *
    100)
    if (propertyIndexArray.includes(propertyIndex)) {
      setYieldData({ ...yieldData, saved_property: propId[0].id })
      setCalculations(true)
    }
    const propID = user.saved_properties.filter(
      (item) => item.listing_id === listing.listing[0].listing_id ?? item
    )
    const getUserData = async () => {
      const { data } = await axios.get(`/api/savedproperties/${propID[0].id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setProperty(data)
    }
    getUserData()
  }

  // Financial Calcuations
  const annualCost = (
    Number(yieldData.annualMaintenance) +
    Number(((yieldData.monthlyRent * 12) / 100) * yieldData.managementFee) +
    Number((yieldData.purchasePrice / 100) * yieldData.mortgageInterest)
  ).toLocaleString()

  const monthlyCashFlow = (
    yieldData.monthlyRent -
    Number((yieldData.purchasePrice / 100) * yieldData.mortgageInterest) / 12
  ).toFixed(2)

  const annualIncome = (
    yieldData.monthlyRent * 12 -
    Number(yieldData.annualMaintenance) -
    Number(((yieldData.monthlyRent * 12) / 100) * yieldData.managementFee) -
    Number((yieldData.purchasePrice / 100) * yieldData.mortgageInterest)
  ).toFixed(2)

  const reValue = Number(listing.listing[0].price).toLocaleString()

  const equityTied = (
    Number(yieldData.deposit) +
    Number(yieldData.refurb) +
    Number(yieldData.purchaseCosts)
  ).toLocaleString()

  const grossYield = (
    ((yieldData.monthlyRent * 12) /
      (Number(yieldData.deposit) +
        Number(yieldData.refurb) +
        Number(yieldData.purchaseCosts))) *
    100
  ).toFixed(2)

  const netYield = (
    ((yieldData.monthlyRent * 12 -
      Number(yieldData.annualMaintenance) -
      Number(((yieldData.monthlyRent * 12) / 100) * yieldData.managementFee) -
      Number((yieldData.purchasePrice / 100) * yieldData.mortgageInterest)) /
      Number(
        Number(yieldData.deposit) +
          Number(yieldData.refurb) +
          Number(yieldData.purchaseCosts)
      )) *
    100
  ).toFixed(2)

  return (
    <div className="column ">
      <div className="data-container">
        <h3>Predicted Returns</h3>
        <div>Like the property to save and amend calculations</div>
        <br />
        <br />
        <div className="columns calculations">
          <div className="column">
            <FontAwesomeIcon icon={faMoneyCheckAlt} className=" fa-3x fa-fw" />
            <br />
            <br />
            <b>Monthly Cashflow</b>
            <p>£{monthlyCashFlow}</p>
          </div>
          <div className="column">
            <FontAwesomeIcon
              icon={faFileInvoiceDollar}
              className=" fa-3x fa-fw"
            />
            <br />
            <br />
            <b>Net Annual Income</b>
            <p>£{annualIncome}</p>
          </div>
          <div className="column">
            <FontAwesomeIcon icon={faCoins} className=" fa-3x fa-fw" />
            <br />
            <br />
            <b>Revaluation</b>
            <p>£{reValue}</p>
          </div>
          <div className="column">
            <FontAwesomeIcon icon={faChartPie} className=" fa-3x fa-fw" />
            <br />
            <br />
            <b>Equity Tied Up</b>
            <p> £{equityTied}</p>
          </div>
          <div className="column">
            <FontAwesomeIcon icon={faChartLine} className=" fa-3x fa-fw" />
            <br />
            <br />
            <b>Gross Yield</b>
            <p> {grossYield}%</p>
          </div>
          <div className="column">
            <FontAwesomeIcon icon={faHandHoldingUsd} className=" fa-3x fa-fw" />
            <br />
            <br />
            <b>Net Yield</b>
            <p> {netYield}%</p>
          </div>
        </div>
        <br />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className=" analytics-form ">
        {user.pro ?
          <>
            <>
              {propertyIndexArray.includes(propertyIndex) && (
                <>
                  <br />
                  <h3>Investment Parameters</h3>
                  <br />
                  <div className="columns">
                    <div className="column">
                      {' '}
                      <div className="field">
                        <div className="form-label">
                          <label>Purchase Price</label>
                        </div>
                        <input
                          className="input"
                          defaultValue={Number(listing.listing[0].price)}
                          placeholder={Number(
                            yieldData.purchasePrice
                          ).toLocaleString()}
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
                          defaultValue={Number(listing.listing[0].price * 0.1)}
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
                          placeholder={Number(
                            yieldData.purchaseCosts
                          ).toLocaleString()}
                          name="purchaseCosts"
                          ref={register}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="column">
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
                      <div className="field">
                        <div className="form-label">
                          <label>Monthly Average Rent</label>
                        </div>
                        <input
                          className="input"
                          defaultValue={Number(avgPrice).toFixed(2)}
                          placeholder={Number(avgPrice.toFixed(2))}
                          name="monthlyRent"
                          ref={register}
                          onChange={handleChange}
                        />
                      </div>
                      <p>
                        <br />
                        <b>Total Investment Funds Required</b> £
                        {(
                          Number(yieldData.deposit) +
                        Number(yieldData.refurb) +
                        Number(yieldData.purchaseCosts)
                        ).toLocaleString()}
                      </p>
                      <p>
                        <b>Total Annual Running Costs</b> £{annualCost}
                      </p>
                    </div>
                  </div>
                  <hr />
                </>
              )}
            </>
            <>
              {propertyIndexArray.includes(propertyIndex) && (
                <>
                  {!calculations && (
                    <button
                      className="button get-started-button"
                      onClick={handleCalculations}
                    >
                      {' '}
                    Calculate
                    </button>
                  )}
                </>
              )}
            </>
            <>
              {propertyIndexArray.includes(propertyIndex) && (
                <>
                  {calculations && (
                    <button
                      className="button get-started-button"
                      onSubmit={handleSubmit}
                    >
                    Save yield calculations
                    </button>
                  )}
                </>
              )}
            </>
          </>
          :
          <Checkout />
        }
      </form>
    </div>
  )
}

export default YieldCalculation
