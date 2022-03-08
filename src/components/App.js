import React, { Component } from "react";
import Header from "./Header";
import Teams from "./pages/Teams";
import Sidebar from "./Sidebar";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import OtherPages from "./pages/OtherPages";

export class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="d-flex">
          <div style={{ height: "100vh" }} className="sticky-top">
            <Sidebar />
          </div>
          <div className="flex-grow-1 bg-light">
            <Header />
            <Switch>
              <Route exact path="/">
                <Redirect to="/teams" />
              </Route>
              <Route path={"/teams/:selectedTab"} component={Teams} />
              <Route path="/teams">
                <Redirect to="/teams/all" />
              </Route>
              <Route path="/" component={OtherPages} />
              {/* TODO: Add 404
              <Route path="*">
                <div>404 man</div>
              </Route> */}
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
