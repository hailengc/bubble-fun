import React from "react";
import ReactDOM from "react-dom";
import RouterMap from "./router";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";

ReactDOM.render(<RouterMap />, document.getElementById("root"));
registerServiceWorker();
