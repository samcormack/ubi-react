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

  const addBracket = () => {
    setTax(R.append(
      R.last(tax),
      tax
    ))
  }

  const removeBracket = () => {
    if (tax.length > 1) {
      setTax(R.dropLast(1, tax))
    }
  }

  return (
    <div className="taxControls">
      <h3>Marginal tax rates</h3>
      {tax.map(({ threshold, rate }, i) => {
        return (
          <div className="taxControl" key={i}>
            <div className="threshold">
              <label>
                Threshold
                <input 
                  type="number" 
                  value={threshold}
                  min={i===0 ? 0 : tax[i-1].threshold} 
                  max={i===(tax.length-1) ? 10000000 : tax[i+1].threshold} 
                  step={100}
                  onChange={e => {updateTax(i, "threshold", e)}}
                />
              </label>
            </div>
            <div className="rate">
              <label>
                Rate
                <input 
                  type="range" 
                  min={i===0 ? 0 : tax[i-1].rate} 
                  max={i===(tax.length-1) ? 1 : tax[i+1].rate} 
                  step={0.005} 
                  value={rate} 
                  onChange={e => {updateTax(i, "rate", e)}}
                />
                {`${(rate*100).toFixed(1)}%`}
              </label>
            </div>
            
          </div>
        )
      })}
      <button type="button" onClick={addBracket}>Add tax bracket</button>
      <button type="button" onClick={removeBracket}>Remove tax bracket</button>
    </div>
    
  )
}

export default TaxControls