import React from 'react'
import UbiGraphs from './UbiGraphs'
import Surplus from './Surplus'
import {getAfterTax} from '../util/calc'

const MainPanel = ({ income, tax, initialTax }) => {
  const initialAfterTaxIncome = getAfterTax(initialTax, income.taxableIncome)
  const afterTaxIncome = getAfterTax(tax, income.taxableIncome)
  return (
    <div className="mainPanel">
      <h2>Design a UBI!</h2>
      <UbiGraphs/>
      <Surplus/>
    </div>
  )
}

export default MainPanel