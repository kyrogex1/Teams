import React, { Component } from "react";
import Header from "./Header";
import Teams from "./pages/Teams";
import Sidebar from "./Sidebar";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { fetchCurrentUser } from "../util/api";
import CustomSwitch from "./CustomSwitch";
import "../sass/main.scss";
import Modal from "./Modal";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      opened: false,
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
              <button
                className="btn btn-primary"
                onClick={() => this.setState({ opened: true })}
              >
                Open Modal
              </button>
            </div>
          </div>
        </BrowserRouter>

        {/* Welcome Modal */}
        <Modal
          open={this.state.opened}
          onClose={() => this.setState({ opened: false })}
        >
          <h3>Welcome to my page</h3>
          <p>
            Hi, I am Joshua. It was a pleasure to work on this assignment from
            Saleswhale / 6 Sense and I have learnt alot. Checkout these extra
            features
          </p>
          <ul>
            <li>pepega</li>
            <li>pepega</li>
            <li>pepega</li>
          </ul>

          {/* TODO: Make this button onClose */}
          <button className="btn btn-primary float-end">Close</button>
        </Modal>
      </AuthContext.Provider>
    );
  }
}

export default App;
