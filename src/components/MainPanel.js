import React from 'react'
import UbiGraphs from './UbiGraphs'
import Surplus from './Surplus'

const MainPanel = () => {
  return (
    <div className="mainPanel">
      <h2>Design a UBI!</h2>
      <UbiGraphs/>
      <Surplus/>
    </div>
  )
}

export default MainPanel