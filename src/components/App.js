import React, { Component } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

export class App extends Component {
  render() {
    return (
      <div className="d-flex" style={{ height: "100vh" }}>
        <Sidebar />
        <div className="flex-grow-1 bg-light">
          <Header />
        </div>
      </div>
    );
  }
}

export default App;
