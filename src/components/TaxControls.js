import React from 'react'
import * as R from 'ramda'
import { debounce } from 'lodash'

function TaxControls({ tax, setTax }) {
  const updateTax = (i, attr, e) => {
    setTax(R.update(
      i,
      {...tax[i], [attr]: parseFloat(e.target.value)},
      tax
    ))
  }
  return (
    <div className="taxControls">
      {tax.map(({ threshold, rate }, i) => {
        return (
          <div className="taxControl" key={i}>
            <input 
              type="number" 
              value={threshold}
              min={i===0 ? 0 : tax[i-1].threshold} 
              max={i===(tax.length-1) ? 10000000 : tax[i+1].threshold} 
              step={100}
              onChange={e => {updateTax(i, "threshold", e)}}
            />
            <input 
              type="range" 
              min={i===0 ? 0 : tax[i-1].rate} 
              max={i===(tax.length-1) ? 1 : tax[i+1].rate} 
              step={0.005} 
              value={rate} 
              onChange={e => {updateTax(i, "rate", e)}}
            />
            {rate}
          </div>
        )
      })}
    </div>
    
  )
}

export default TaxControls