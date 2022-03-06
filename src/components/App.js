import React, { Component } from "react";
import Header from "./Header";
import Teams from "./pages/Teams";
import Sidebar from "./Sidebar";

export class App extends Component {
  render() {
    return (
      <div className="d-flex">
        <div style={{ height: "100vh" }} className="sticky-top">
          <Sidebar />
        </div>
        <div className="flex-grow-1 bg-light">
          <Header />
          <Teams />
        </div>
      </div>
    );
  }
}

export default App;
