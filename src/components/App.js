import React, { Component } from "react";
import Header from "./Header";
import Teams from "./pages/Teams";
import Sidebar from "./Sidebar";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Page404 from "./pages/Page404";
import AuthContext from "../context/AuthContext";
import { fetchCurrentUser } from "../util/api";
import CustomSwitch from "./CustomSwitch";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  componentDidMount = async () => {
    // Get User Data
    const user = await fetchCurrentUser();
    this.setState({
      user,
    });

    // Log one time usage
    const url = process.env.REACT_APP_FIREBASE_API_ENDPOINT;
    if (url !== undefined && url.length > 0) {
      const data = {
        app_type: process.env.REACT_APP_APP_TYPE,
        source: process.env.REACT_APP_SOURCE,
      };
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
    }
  };

  render() {
    return (
      <AuthContext.Provider value={this.state.user}>
        <BrowserRouter>
          <div className="d-flex">
            <div style={{ height: "100vh" }} className="sticky-top">
              <Sidebar />
            </div>
            <div className="flex-grow-1 bg-light">
              <Header />
              <CustomSwitch>
                <Route exact path="/">
                  <Redirect to="/teams" />
                </Route>
                <Route path="/teams" component={Teams} />
              </CustomSwitch>
            </div>
          </div>
        </BrowserRouter>
      </AuthContext.Provider>
    );
  }
}

export default App;
