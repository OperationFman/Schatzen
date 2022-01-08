import React from "react";
import "./App.css";
import { fetchAllData, addNewUser, updatePoint, resetAllPoints, wipeAllData } from './dynamo/Dynamo'

function App() {
  const getData = async () => {
    const result = await fetchAllData()
    console.log(result)
  }

  return <div className="App">
    <button onClick={getData}>Fetch</button>
  </div>;
}

export default App;
