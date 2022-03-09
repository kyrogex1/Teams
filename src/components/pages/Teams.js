import React, { Component } from "react";
import ActivitiesContainer from "../ActivitiesContainer";
import { withRouter, Route } from "react-router-dom";
import Tabs from "../Tabs";
import TeamsContainer from "../TeamsContainer";
import { fetchTeams } from "../../util/api";
import Input from "../Input";
import { ReactComponent as IconPlus } from "../../assets/svg/icon-plus.svg";
import { ReactComponent as IconTeams } from "../../assets/svg/icon-teams.svg";

export const teamTabs = {
  all: {
    text: "All",
    fetchFunction: (searchQuery) => fetchTeams(false, false, searchQuery),
    pathLink: "all",
  },
  favorites: {
    text: "Favorited",
    fetchFunction: (searchQuery) => fetchTeams(true, false, searchQuery),
    pathLink: "favorites",
  },
  archived: {
    text: "Archived",
    fetchFunction: (searchQuery) => fetchTeams(false, true, searchQuery),
    pathLink: "archived",
  },
};

// TODO: Add maxlines to created on text.
export class Teams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
    };
  }

  onSearchChange = (query) => {
    this.setState({
      searchQuery: query,
    });
  };

  pageHeader = () => {
    const selectedTab = this.props.match.params.selectedTab;

    return (
      <div className="bg-white pt-4 px-4 shadow-sm">
        <div className="d-flex justify-content-between mb-3">
          <h2 className="d-flex align-items-center">
            <IconTeams style={{ color: "#A4A6A8" }} className="me-3" /> Teams
          </h2>
          <button className="btn btn-light-green d-flex align-items-center">
            <IconPlus className="me-2" /> CREATE NEW TEAM
          </button>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <Tabs
              tabs={Object.values(teamTabs)}
              selected={teamTabs[selectedTab]}
            />
          </div>
          <Input onChange={this.onSearchChange} />
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
              <TeamsContainer
                {...teamTabs[selectedTab]}
                searchQuery={this.state.searchQuery}
              />
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
