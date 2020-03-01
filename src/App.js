import React, {useState, useEffect, useMemo} from 'react';
import MainPanel from './components/MainPanel'
import Sidebar from './components/SideBar'
import './App.css';
import { getIncomeData } from './util/transform'
import { getAfterTax } from './util/calc'


function App() {
  const initialTax = [
    {threshold: 0, rate: 0.105},
    {threshold: 14000, rate: 0.175},
    {threshold: 48000, rate: 0.3},
    {threshold: 70000, rate: 0.33},
  ]
  const [tax, setTax] = useState(initialTax)
  const [ubi, setUbi] = useState({value:0, phaseOut:0})
  const [income, setIncome] = useState({
    taxableIncome: [],
    nPeople: [],
    cumeProp: [],
  })
  const [initialAfterTaxIncome, setInitialAfterTaxIncome] = useState([])
    
  useEffect(() => {
    getIncomeData().then(
      data => {
        setIncome(data)
        setInitialAfterTaxIncome(getAfterTax(initialTax, data.taxableIncome))
      }
    )

  }, [])
  
  return (
    <div className="App">
      <MainPanel 
        income={income}
        tax={tax} 
        initialTax={initialTax} 
        ubi={ubi}
        initialAfterTaxIncome={initialAfterTaxIncome}
      />
      <Sidebar tax={tax} setTax={setTax} ubi={ubi} setUbi={setUbi}/>
    </div>
  );
}

export default App;
