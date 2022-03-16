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

const GIT_REPO_URL = "https://github.com/kyrogex1/Teams";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      opened: false,
    };
  }

  componentDidMount = async () => {
    // Open welcome message
    this.setState({
      opened: true,
    });

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
            <div className="sticky-top sidebar-container">
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

        {/* Welcome Modal */}
        <Modal
          open={this.state.opened}
          onClose={() => this.setState({ opened: false })}
        >
          <h2>Welcome to my 6Sense Frontend Engineer Assignment</h2>
          <p>
            Hey there, I am Joshua. Thank you for checking up my assignment, it
            has been a pleasure working on this. You may check the code
            repository{" "}
            <a href={GIT_REPO_URL} target="_blank">
              here
            </a>
          </p>
          <h4>Additional features</h4>
          <ul>
            <li>Try favoriting a team (and then switch tabs)</li>
            <li>Try searching a team in the search box</li>
            <li>
              Try clicking on the profile avatar in the top right to open a
              dropdown
            </li>
            <li>Click on the other links on the left sidebar</li>
            <li>Add pagination for team cards</li>
          </ul>
          <h4>TODO</h4>
          <ul>
            <li>Add create new card feature</li>
            <li>Enable open welcome message from profile avatar dropdown</li>
          </ul>

          {/* TODO: Make this button onClose */}
          <button
            className="btn btn-primary float-end"
            onClick={() => this.setState({ opened: false })}
          >
            Close
          </button>
        </Modal>
      </AuthContext.Provider>
    );
  }
}

export default App;
