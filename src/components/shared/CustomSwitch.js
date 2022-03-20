import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";
import Page404 from "../pages/Page404";

export class CustomSwitch extends Component {
  render() {
    return (
      <Switch>
        {this.props.children}
        <Route path="*">
          <Page404 />
        </Route>
      </Switch>
    );
  }
}

export default CustomSwitch;
