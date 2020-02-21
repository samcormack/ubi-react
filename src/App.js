import React from 'react';
import MainPanel from './components/MainPanel'
import Sidebar from './components/SideBar'
import './App.css';

function App() {
  return (
    <div className="App">
      <MainPanel/>
      <Sidebar/>
    </div>
  );
}

export default App;
