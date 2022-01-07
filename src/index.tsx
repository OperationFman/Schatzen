import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { region, secretAccessKey, accessKeyId } from "./dynamo/config";

import * as AWS from "aws-sdk";
import { ConfigurationOptions } from "aws-sdk";

const configuration: ConfigurationOptions = {
  region: "ap-southeast-1",
  secretAccessKey: secretAccessKey,
  accessKeyId: accessKeyId,
};

AWS.config.update(configuration);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
