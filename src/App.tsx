import React from "react";
import "./App.css";
import { fetchAllData, addNewUser, updatePoint, resetAllPoints, wipeAllData } from './dynamo/dynamo'

function App() {
  const getData = async () => {
    resetAllPoints()
  }

  return <div className="App">
    <button onClick={getData}>Fetch</button>
  </div>;
}

export default App;
