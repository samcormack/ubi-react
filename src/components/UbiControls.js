import React from 'react'
import { debounce } from 'lodash'

function UbiControls({ ubi, setUbi }) {
  const handleValueChange = e => setUbi({...ubi, value: parseInt(e.target.value)})
  const handlePhaseOutChange = e =>setUbi({...ubi, phaseOut: parseFloat(e.target.value)})
  return (
    <div className="ubiControls">
      <h3>Yearly universal income</h3>
      <input type="number" min={0} max= {1000000} value={ubi.value} onChange={handleValueChange}/>
      <h3>Universal income phase-out rate</h3>
      <input type="range" min={0} max={1} step={0.01} value={ubi.phaseOut} onChange={handlePhaseOutChange}/>
      <span>{`${ubi.phaseOut*100}%`}</span>
    </div>
  )
}

export default UbiControls