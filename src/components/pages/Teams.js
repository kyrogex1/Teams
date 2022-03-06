import React, { Component } from "react";
import TeamsContainer from "../TeamsContainer";

export class Teams extends Component {
  pageHeader = () => {
    return (
      <div className="bg-white pt-4 px-4 shadow-sm">
        <div className="d-flex justify-content-between mb-3">
          <p>Teams</p>
          <button className="btn btn-light-green">&#43; CREATE NEW TEAM</button>
        </div>
        <div className="d-flex justify-content-between">
          <p>Tabs</p>
          <div>Searchbar</div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div>
        {this.pageHeader()}
        <TeamsContainer />
      </div>
    );
  }
}

export default Teams;
