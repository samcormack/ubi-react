import React from 'react'
import UbiControls from './UbiControls'
import TaxControls from './TaxControls'

const SideBar = ({tax, setTax, ubi, setUbi}) => {
  return (
    <div className="SideBar">
      <UbiControls ubi={ubi} setUbi={setUbi}/>
      <TaxControls tax={tax} setTax={setTax}/>
    </div>
  )
}

export default SideBar