import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss";
import "assets/demo/demo.css";
import App from "./App";
import Amplify from "aws-amplify";
import aws_config from "./config/aws-config";

Amplify.configure(aws_config);

console.log("process env", process.env);

ReactDOM.render(<App />, document.getElementById("root"));
