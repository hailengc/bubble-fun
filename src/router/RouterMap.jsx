import React from "react";
import { HashRouter, Route, Switch } from 'react-router-dom'
import SampleIndex from "../components/SampleIndex";

export default () => (
  <HashRouter>
    <div>
      <Switch>
        <Route exact path="/" component={SampleIndex} />
      </Switch>
    </div>
  </HashRouter>
);
