import React from "react";
import "./App.css";
import { fetchAllData } from './dynamo/dynamo'

function App() {
  const getData = () => {
    console.log(fetchAllData())
  }

  return <div className="App">

    <button onClick={getData}>Fetch</button>
  
  </div>;
}

export default App;
