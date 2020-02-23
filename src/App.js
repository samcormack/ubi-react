import React, {useState, useEffect} from 'react';
import MainPanel from './components/MainPanel'
import Sidebar from './components/SideBar'
import './App.css';
import { getIncomeData } from './util/transform'


function App() {
  const initialTax = [
    {threshold: 0, rate: 0.105},
    {threshold: 14000, rate: 0.175},
    {threshold: 48000, rate: 0.3},
    {threshold: 70000, rate: 0.33},
  ]
  const [tax, setTax] = useState(initialTax)
  const [income, setIncome] = useState({
    taxableIncome: [],
    nPeople: [],
    cumeProp: [],
  })

  useEffect(() => {
    getIncomeData().then(
      data => setIncome(data)
    )
  }, [])
  
  return (
    <div className="App">
      <MainPanel income={income} tax={tax} initialTax={initialTax}/>
      <Sidebar tax={tax} setTax={setTax}/>
    </div>
  );
}

export default App;
