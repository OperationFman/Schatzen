import React from "react";
import "./App.css";
import { GetDynamoData } from "./dynamo/GetDynamoData";

function App() {
  const getData = () => {
    GetDynamoData();
  };

  return (
    <div className="App">
      <button onClick={() => getData()}> Fetch </button>
    </div>
  );
}

export default App;
