import React from 'react'

const SavedYield = ({ propID, propertyDetails }) => {

  console.log(propID)

  if (!propertyDetails) return null
  return (
    <div className="column yield-calculations">
      <p>Predicted Returns</p>
      <p>Monthly Cashflow £{(propertyDetails.yield_calculations[0].monthlyRent - (Number(propertyDetails.yield_calculations[0].purchasePrice / 100 * propertyDetails.yield_calculations[0].mortgageInterest) / 12)).toFixed(2)}</p>
      <p>Net Annual Income £{((propertyDetails.yield_calculations[0].monthlyRent * 12) - ((Number(propertyDetails.yield_calculations[0].annualMaintenance) - Number(((propertyDetails.yield_calculations[0].monthlyRent * 12) / 100 * propertyDetails.yield_calculations[0].managementFee)) - Number(propertyDetails.yield_calculations[0].purchasePrice / 100 * propertyDetails.yield_calculations[0].mortgageInterest)))).toFixed(2)}</p>
      <p>Revaluation £{Number(propertyDetails.yield_calculations[0].purchasePrice).toLocaleString()}</p>
      <p>Equity Tied Up £{(Number(propertyDetails.yield_calculations[0].deposit) + Number(propertyDetails.yield_calculations[0].refurb) + Number(propertyDetails.yield_calculations[0].purchaseCosts)).toLocaleString()}</p>
      <p>Gross Yield {(((propertyDetails.yield_calculations[0].monthlyRent * 12)) / (Number(propertyDetails.yield_calculations[0].deposit) + Number(propertyDetails.yield_calculations[0].refurb) + Number(propertyDetails.yield_calculations[0].purchaseCosts)) * 100).toFixed(2)}%</p>
      <p>Net Yield {(((propertyDetails.yield_calculations[0].monthlyRent * 12) - (Number(propertyDetails.yield_calculations[0].annualMaintenance) - Number(((propertyDetails.yield_calculations[0].monthlyRent * 12) / 100 * propertyDetails.yield_calculations[0].managementFee)) - Number(propertyDetails.yield_calculations[0].purchasePrice / 100 * propertyDetails.yield_calculations[0].mortgageInterest))) / Number(Number(propertyDetails.yield_calculations[0].deposit) + Number(propertyDetails.yield_calculations[0].refurb) + Number(propertyDetails.yield_calculations[0].purchaseCosts)) * 100).toFixed(2)}%</p>
    </div>
  )
}

export default SavedYield
