import React from 'react'
import UbiControls from './UbiControls'
import TaxControls from './TaxControls'

const SideBar = () => {
  return (
    <div className="sidebar">
      <UbiControls/>
      <TaxControls/>
    </div>
  )
}

export default SideBar