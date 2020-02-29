import React, { useEffect, useState } from 'react'
import UbiGraphs from './UbiGraphs'
import Surplus from './Surplus'
import { getAfterTax, addUbi } from '../util/calc'
import { useThrottledFn } from 'beautiful-react-hooks'

const MainPanel = ({ income, tax, initialTax, ubi, initialAfterTaxIncome}) => {
  const [afterTaxIncome, setAfterTaxIncome] = useState(initialAfterTaxIncome)

  const thGetIncome = useThrottledFn(() => {
    console.log("throttled")
    setAfterTaxIncome(getAfterTax(tax, addUbi(ubi, income.taxableIncome)))
  }, 1000)

  useEffect(() => {
    console.log("effect")
    thGetIncome()
    return () => thGetIncome.cancel()
  },
  [tax, ubi, income]
  )

  return (
    <div className="mainPanel">
      <h2>Design a UBI!</h2>
      <UbiGraphs 
        cumeProp={income.cumeProp}
        beforeTaxIncome={income.taxableIncome}
        initialAfterTaxIncome={initialAfterTaxIncome}
        afterTaxIncome={afterTaxIncome}
      />
      <Surplus
        nPeople={income.nPeople}
        initialAfterTaxIncome={initialAfterTaxIncome}
        afterTaxIncome={afterTaxIncome}
      />
    </div>
  )
}

export default MainPanel