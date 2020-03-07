import React from 'react'
import * as R from 'ramda'

const vectorSubtract = R.compose(R.map(R.apply(R.subtract)),R.zip)
const vectorTimes = R.compose(R.map(R.apply(R.multiply)),R.zip)

function Surplus({nPeople, initialAfterTaxIncome, afterTaxIncome}) {
  return (
    <div className="surplus">
      ${Math.round(R.sum(
        vectorTimes(vectorSubtract(initialAfterTaxIncome, afterTaxIncome),nPeople)
      ) / R.sum(nPeople))} per person
    </div>
  )
}

export default Surplus