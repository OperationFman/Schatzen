import React from "react";
import "./App.css";
import { fetchAllTableData } from "./db/Dynamo";
import {
  addNewUser,
  updatePoint,
  resetAllPoints,
  wipeAllData,
  updateUserAndPoint,
} from "./db/DataService";

function App() {
  const getData = async () => {
    const result = await updatePoint("BATMAN", 123);
    console.log(result)
  };

  return (
    <div className="App">
      <button onClick={getData}>Fetch</button>
    </div>
  );
}

export default App;
