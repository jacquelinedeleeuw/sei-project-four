import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

const YieldCalculation = ({ listings, listing }) => {

  const { register, handleSubmit } = useForm()
  const onSubmit = async (data) => {
    console.log(data)
    setYieldData(data)
  }
  const handleChange = (event) => {
    const newYieldData = { ... yieldData, [event.target.name]: event.target.value }
    setYieldData(newYieldData)
  }

  const avgPriceArray = listings.listing.map((item) => item.rental_prices.per_month)

  const price = avgPriceArray.reduce((acc, item) => {
    const price = acc += Number(item)
    return price
  }, 0)

  const avgPrice = price / avgPriceArray.length

  const [yieldData, setYieldData] = useState({
    purchasePrice: Number(listing.listing[0].price),
    deposit: Number(listing.listing[0].price * 0.10),
    loanTerms: 25,
    refurb: '',
    purchaseCosts: '',
    monthlyRent: avgPrice,
    annualMaintenance: 500,
    managementFee: 6,
    mortgageInterest: 3,
  })

  return (
    <div className="column is-one-third">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="column login-form-form"
      >
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
        <p>Predicted Returns</p>
        <p>Monthly Cashflow £{(yieldData.monthlyRent - (yieldData.purchasePrice / yieldData.loanTerms / 12)).toFixed(2)}</p>
        <p>Net Annual Income £{((yieldData.monthlyRent * 12) - (yieldData.purchasePrice / yieldData.loanTerms) - ((Number(yieldData.annualMaintenance) + Number(((yieldData.monthlyRent * 12) / 100 * yieldData.managementFee)) + Number(yieldData.purchasePrice / 100 * yieldData.mortgageInterest)))).toFixed(2)}</p>
        <p>Revaluation £{Number(listing.listing[0].price).toLocaleString()}</p>
        <p>Equity Tied Up £{(Number(yieldData.deposit) + Number(yieldData.refurb) + Number(yieldData.purchaseCosts)).toLocaleString()}</p>
        <p>Gross Yield {(((yieldData.monthlyRent * 12)) / Number(listing.listing[0].price) * 100).toFixed(2)}%</p>
        <p>Net Yield {(((yieldData.monthlyRent * 12) - (Number(yieldData.annualMaintenance) + Number(((yieldData.monthlyRent * 12) / 100 * yieldData.managementFee)) + Number(yieldData.purchasePrice / 100 * yieldData.mortgageInterest))) / Number(listing.listing[0].price) * 100).toFixed(2)}%</p>

        <button className="button get-started-button" onSubmit={handleSubmit}>Save yield calculations</button>
      </form>
    </div>
  )
}

export default YieldCalculation
