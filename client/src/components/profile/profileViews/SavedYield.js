import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { getTokenFromLocalStorage } from '../../../helpers/auth'

const SavedYield = ({ propertyDetails, modal }) => {

  const token = getTokenFromLocalStorage()

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
        annualMaintenance: propertyDetails.yield_calculations[0].annualMaintenance,
        managementFee: propertyDetails.yield_calculations[0].managementFee,
        mortgageInterest: propertyDetails.yield_calculations[0].mortgageInterest,
        saved_property: propertyDetails.yield_calculations[0].saved_property,
      })
    }
  }, [])

  // Form Submit
  const { register, handleSubmit } = useForm()
  const onSubmit = async () => {
    setYieldData({ ...yieldData })
    try {
      await axios.patch(`/api/yield/${propertyDetails.yield_calculations[0].id}/`, yieldData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    } catch (err) {
      console.log(err.message)
    }
    modal.current.close()
  }

  // Handle change on form, recalculate data and set to state
  const handleChange = (event) => {
    const newYieldData = { ... yieldData, [event.target.name]: Number(event.target.value) }
    setYieldData(newYieldData)
  }

  if (!propertyDetails) return null
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="columns applications"
    >
      <div className="column">
        <div className="field">
          <div className="form-label">
            <label>Purchase Price</label>
          </div>
          <input
            className="input"
            defaultValue={propertyDetails.yield_calculations[0].purchasePrice}
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
        <p>Total Funds Required £{(Number(yieldData.deposit) + Number(yieldData.refurb) + Number(yieldData.purchaseCosts)).toLocaleString()}</p>
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
        <p>Total Annual Costs £{(Number(yieldData.annualMaintenance) + Number(((yieldData.monthlyRent * 12) / 100 * yieldData.managementFee)) + Number(yieldData.purchasePrice / 100 * yieldData.mortgageInterest)).toFixed(2)}</p>
      </div>
      <div className="column">
        <div className="column">
          <p>Predicted Returns</p>
          <p>Monthly Cashflow £{(yieldData.monthlyRent - (Number(yieldData.purchasePrice / 100 * yieldData.mortgageInterest) / 12)).toFixed(2)}</p>
          <p>Net Annual Income £{((yieldData.monthlyRent * 12) - Number(yieldData.annualMaintenance) - Number(((yieldData.monthlyRent * 12) / 100 * yieldData.managementFee)) - Number(yieldData.purchasePrice / 100 * yieldData.mortgageInterest)).toFixed(2)}</p>
          <p>Revaluation £{Number(yieldData.purchasePrice).toLocaleString()}</p>
          <p>Equity Tied Up £{(Number(yieldData.deposit) + Number(yieldData.refurb) + Number(yieldData.purchaseCosts)).toLocaleString()}</p>
          <p>Gross Yield {(((yieldData.monthlyRent * 12)) / (Number(yieldData.deposit) + Number(yieldData.refurb) + Number(yieldData.purchaseCosts) + Number(yieldData.purchasePrice)) * 100).toFixed(2)}%</p>
          <p>Net Yield {(((yieldData.monthlyRent * 12) - Number(yieldData.annualMaintenance) - Number((yieldData.monthlyRent * 12) / 100 * yieldData.managementFee) - Number(yieldData.purchasePrice / 100 * yieldData.mortgageInterest)) / (Number(yieldData.refurb) + Number(yieldData.purchaseCosts) + Number(yieldData.purchasePrice)) * 100).toFixed(2)}%
          </p>
        </div>
        <button className="button form-button" onSubmit={handleSubmit}>Save yield calculations</button>
      </div>
    </form>
  )
}

export default SavedYield
