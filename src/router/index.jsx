import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import BubbleFun from "../pages/BubbleFun";

export default () => (
  <HashRouter>
    <div>
      <Switch>
        <Route exact path="/" component={BubbleFun} />
      </Switch>
    </div>
  </HashRouter>
);
