import React from "react";
import "./App.css";
import { addNewUser } from './dynamo/dynamo'

function App() {
  const getData = async () => {
    addNewUser("wanda")
  }

  return <div className="App">

    <button onClick={getData}>Fetch</button>
  
  </div>;
}

export default App;
