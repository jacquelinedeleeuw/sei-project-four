import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { getTokenFromLocalStorage } from '../../../helpers/auth'
import Pdf from 'react-to-pdf'
// import Logo from '../../assets/logo.svg'

import ApplicationNotes from './ApplicationNotes'
import Checkout from '../../stripe/Checkout'

import {
  faMoneyCheckAlt,
  faFileInvoiceDollar,
  faCoins,
  faChartPie,
  faChartLine,
  faHandHoldingUsd
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SavedYield = ({ user, propertyDetails, modal, propID }) => {

  const token = getTokenFromLocalStorage()

  const ref = React.createRef()

  const [yieldData, setYieldData] = useState({
    purchasePrice: '',
    deposit: '',
    loanTerms: '',
    refurb: '',
    purchaseCosts: '',
    monthlyRent: '',
    annualMaintenance: '',
    managementFee: '',
    mortgageInterest: '',
    saved_property: '',
  })

  useEffect(() => {
    if (propertyDetails) {
      setYieldData({
        purchasePrice: propertyDetails.yield_calculations[0].purchasePrice,
        deposit: propertyDetails.yield_calculations[0].deposit,
        loanTerms: propertyDetails.yield_calculations[0].loanTerms,
        refurb: propertyDetails.yield_calculations[0].refurb,
        purchaseCosts: propertyDetails.yield_calculations[0].purchaseCosts,
        monthlyRent: propertyDetails.yield_calculations[0].monthlyRent,
        annualMaintenance:
          propertyDetails.yield_calculations[0].annualMaintenance,
        managementFee: propertyDetails.yield_calculations[0].managementFee,
        mortgageInterest:
          propertyDetails.yield_calculations[0].mortgageInterest,
        saved_property: propertyDetails.yield_calculations[0].saved_property,
      })
    }
  }, [])

  // Form Submit
  const { register, handleSubmit } = useForm()
  const onSubmit = async () => {
    setYieldData({ ...yieldData })
    try {
      await axios.patch(
        `/api/yield/${propertyDetails.yield_calculations[0].id}/`,
        yieldData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
    } catch (err) {
      console.log(err.message)
    }
    modal.current.close()
  }

  // Handle change on form, recalculate data and set to state
  const handleChange = (event) => {
    const newYieldData = {
      ...yieldData,
      [event.target.name]: Number(event.target.value),
    }
    setYieldData(newYieldData)
  }

  // Financial Calcuations
  // const annualCost = (
  //   Number(yieldData.annualMaintenance) +
  //   Number(((yieldData.monthlyRent * 12) / 100) * yieldData.managementFee) +
  //   Number((yieldData.purchasePrice / 100) * yieldData.mortgageInterest)
  // ).toLocaleString()

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

  const reValue = Number(yieldData.purchasePrice).toLocaleString()

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

  if (!propertyDetails) return null
  return (
    <div className="applications-container applications">
      <form onSubmit={handleSubmit(onSubmit)} className=" applications">
        <div ref={ref}>
          <div className="container">
            {/* <div className="logo-container">
              <img src={Logo} />
              <h3 className="logo">yieldly</h3>
            </div> */}
            <br />
            <h3>Property Analytics</h3>
            <hr />
          </div>
          <div className="data-container-app">
            <div className="columns calculations">
              <div className="column">
                <FontAwesomeIcon
                  icon={faMoneyCheckAlt}
                  className=" fa-3x fa-fw"
                />
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
                <FontAwesomeIcon
                  icon={faHandHoldingUsd}
                  className=" fa-3x fa-fw"
                />
                <br />
                <br />
                <b>Net Yield</b>
                <p> {netYield}%</p>
              </div>
            </div>
            <br />
          </div>
          { user.pro &&
            <div className="columns">
              <div className="column">
                <div className="field">
                  <div className="form-label">
                    <label>Purchase Price</label>
                  </div>
                  <input
                    className="input"
                    defaultValue={
                      propertyDetails.yield_calculations[0].purchasePrice
                    }
                    placeholder={propertyDetails.yield_calculations[0].purchasePrice.toLocaleString()}
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
                    defaultValue={propertyDetails.yield_calculations[0].deposit}
                    placeholder={propertyDetails.yield_calculations[0].deposit.toLocaleString()}
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
                    defaultValue={yieldData.refurb}
                    placeholder={yieldData.refurb.toLocaleString()}
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
                    defaultValue={yieldData.purchaseCosts}
                    placeholder={yieldData.purchaseCosts.toLocaleString()}
                    name="purchaseCosts"
                    ref={register}
                    onChange={handleChange}
                  />
                </div>
                <hr />
                <p>
                  <b>Total Funds Required </b>
                  <br />£
                  {(
                    Number(yieldData.deposit) +
                  Number(yieldData.refurb) +
                  Number(yieldData.purchaseCosts)
                  ).toLocaleString()}
                </p>
              </div>
              <div className="column">
                <div className="field">
                  <div className="form-label">
                    <label>Annual Maintenance</label>
                  </div>
                  <input
                    className="input"
                    defaultValue={yieldData.annualMaintenance}
                    placeholder={yieldData.annualMaintenance}
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
                    defaultValue={yieldData.managementFee}
                    placeholder={yieldData.managementFee}
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
                    defaultValue={yieldData.mortgageInterest}
                    placeholder={yieldData.mortgageInterest}
                    name="mortgageInterest"
                    ref={register}
                    onChange={handleChange}
                  />
                </div>
                <div className="field">
                  <div className="form-label">
                    <label>Monthly rent</label>
                  </div>
                  <input
                    className="input"
                    defaultValue={yieldData.monthlyRent}
                    placeholder={yieldData.monthlyRent}
                    name="monthlyRent"
                    ref={register}
                    onChange={handleChange}
                  />
                </div>
                <hr />
                <p>
                  <b>Total Annual Costs</b> £
                  {(
                    Number(yieldData.annualMaintenance) +
                  Number(
                    ((yieldData.monthlyRent * 12) / 100) *
                      yieldData.managementFee
                  ) +
                  Number(
                    (yieldData.purchasePrice / 100) * yieldData.mortgageInterest
                  )
                  ).toLocaleString()}
                </p>
              </div>
              <div className="column">
                <div className="column">
                  <ApplicationNotes propID={propID} />
                </div>
              </div>
            </div>
          }
          <br />
        </div>
        { user.pro ?
          <button className="button form-button" onSubmit={handleSubmit}>
          Save yield calculations
          </button>
          :
          <Checkout />
        }
      </form>
      { user.pro &&
      <Pdf targetRef={ref} filename="yieldly.pdf">
        {({ toPdf }) => (
          <div className="applications">
            <button onClick={toPdf} className="button form-button">
              Generate Pdf
            </button>
          </div>
        )}
      </Pdf>
      }
    </div>
  )
}

export default SavedYield
