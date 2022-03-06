import React, { Component } from "react";
import ActivitiesContainer from "../ActivitiesContainer";
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
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              <TeamsContainer />
            </div>
            <div className="col-lg-3">
              <ActivitiesContainer />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Teams;
