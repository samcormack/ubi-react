import React, {useEffect, useState} from 'react';
import MainPanel from './components/MainPanel'
import Sidebar from './components/SideBar'
import './App.css';
import { getIncomeData } from './util/transform'


function App() {
  const [income, ] = useState(getIncomeData)

  return (
    <div className="App">
      {console.log(income)}
      <MainPanel/>
      <Sidebar/>
    </div>
  );
}

export default App;
