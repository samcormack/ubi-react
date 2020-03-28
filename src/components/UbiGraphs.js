import React from 'react'
import { VictoryChart, VictoryGroup, VictoryArea, VictoryLine, VictoryVoronoiContainer, VictoryAxis, VictoryLabel } from 'victory'
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
  console.log(cumeProp)
  return (
    <VictoryChart
      height = {600}
      width = {800}
      padding = {{left: 100, top:40, right:20, bottom:40}}
      containerComponent={
        <VictoryVoronoiContainer
          labels = {({ datum }) => `${datum.name}: ${Math.round(datum.x)}, ${Math.round(datum.y)}`}
          voronoiDimension = "x"
        />
      }
      // animate = {{ duration: 100, easing: "sinInOut" }}  
    >
      <VictoryGroup
        colorScale={["#C00", "#006", "black"]}
        domain={{x: [0,1], y: [0,100000]}}
      >
        <VictoryArea
          name="after-tax"
          data={graphifyAll({
            x: cumeProp,
            y: afterTaxIncome,
            y0: initialAfterTaxIncome,
          })}
          style={{
            data: {
              stroke: "black",
              strokeWidth: 3
            }
          }}
        />
        {/* <VictoryLine
          data={graphify(cumeProp, afterTaxIncome)}
        />
        <VictoryLine
          data={graphify(cumeProp, initialAfterTaxIncome)}
        /> */}
        <VictoryLine
          name="before-tax"
          data={graphify(cumeProp, beforeTaxIncome)}
          style={{
            data: {
              strokeWidth: 3
            }
          }}
        />
      </VictoryGroup>
      <VictoryAxis
        label="Percentile"
        tickValues={[0.0, 0.2, 0.4, 0.6, 0.8, 1.0]}
        tickFormat={t => `${100*t}%`}
        domainPadding={{x: 0}}
      />
      <VictoryAxis
        dependentAxis
        label="Yearly income (NZD)"
        axisLabelComponent={<VictoryLabel dy={-50}/>}
      />
    </VictoryChart>
  )
}

export default UbiGraphs