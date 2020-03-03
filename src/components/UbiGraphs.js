import React from 'react'
import { VictoryChart, VictoryGroup, VictoryArea, VictoryLine } from 'victory'
import * as R from 'ramda'

const graphify = R.zipWith((x,y) =>{return {x, y}} )

const graphifyAll = listObj => {
  const [keys, lists] = R.transpose(R.toPairs(listObj))
  return R.map(
    R.zipObj(keys),
    R.transpose(lists)
  )
}

function UbiGraphs({cumeProp, beforeTaxIncome, initialAfterTaxIncome, afterTaxIncome}) {
  return (
    <VictoryChart
      height = {600}
      width = {800}
      padding = {{left: 60, top:40, right:20, bottom:40}}
      // animate = {{ duration: 100, easing: "sinInOut" }}  
    >
      <VictoryGroup
        colorScale={["#C00", "#006", "black"]}
        domain={{x: [0,1], y: [0,100000]}}
      >
        <VictoryArea
          data={graphifyAll({
            x: cumeProp,
            y: afterTaxIncome,
            y0: initialAfterTaxIncome,
          })}
        />
        {/* <VictoryLine
          data={graphify(cumeProp, afterTaxIncome)}
        />
        <VictoryLine
          data={graphify(cumeProp, initialAfterTaxIncome)}
        /> */}
        <VictoryLine
          data={graphify(cumeProp, beforeTaxIncome)}
        />
      </VictoryGroup>
    </VictoryChart>
  )
}

export default UbiGraphs