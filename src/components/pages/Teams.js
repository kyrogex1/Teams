import React, { Component } from "react";
import ActivitiesContainer from "../ActivitiesContainer";
import { withRouter, Route } from "react-router-dom";
import Tabs from "../Tabs";
import TeamsContainer from "../TeamsContainer";
import { fetchTeams } from "../../util/api";

export const teamTabs = {
  all: { text: "All", fetchFunction: fetchTeams, pathLink: "all" },
  favorites: {
    text: "Favorited",
    fetchFunction: () => fetchTeams(true, false),
    pathLink: "favorites",
  },
  archived: {
    text: "Archived",
    fetchFunction: () => fetchTeams(false, true),
    pathLink: "archived",
  },
};

// TODO: Add maxlines to created on text.
export class Teams extends Component {
  pageHeader = () => {
    const selectedTab = this.props.match.params.selectedTab;

    return (
      <div className="bg-white pt-4 px-4 shadow-sm">
        <div className="d-flex justify-content-between mb-3">
          <p>Teams</p>
          <button className="btn btn-light-green">&#43; CREATE NEW TEAM</button>
        </div>
        <div className="d-flex justify-content-between">
          <div>
            <Tabs
              tabs={Object.values(teamTabs)}
              selected={teamTabs[selectedTab]}
            />
          </div>
          <div>Searchbar</div>
        </div>
      </div>
    );
  };

  render() {
    const selectedTab = this.props.match.params.selectedTab;
    if (!(selectedTab in teamTabs)) {
      // TODO: Extract to components
      return <div>404</div>;
    }
    return (
      <div>
        {this.pageHeader()}
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              <TeamsContainer {...teamTabs[selectedTab]} />
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

export default withRouter(Teams);
