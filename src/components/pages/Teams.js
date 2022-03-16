import React, { Component, createRef } from "react";
import ActivitiesContainer from "../ActivitiesContainer";
import { Redirect, Route, withRouter } from "react-router-dom";
import queryString from "query-string";
import Tabs from "../Tabs";
import TeamsContainer from "../TeamsContainer";
import DebouncedInput from "../DebouncedInput";
import { ReactComponent as IconPlus } from "../../assets/svg/icon-plus.svg";
import { ReactComponent as IconTeams } from "../../assets/svg/icon-teams.svg";
import CustomSwitch from "../CustomSwitch";

export const teamTabs = [
  {
    text: "All",
    fetchOptions: { isFavorite: null, isArchived: null },
    pathLink: "all",
  },
  {
    text: "Favorited",
    fetchOptions: {
      isFavorite: true,
      isArchived: null,
    },
    pathLink: "favorites",
  },
  {
    text: "Archived",
    fetchOptions: {
      isFavorite: null,
      isArchived: true,
    },
    pathLink: "archived",
  },
];

// TODO: Add maxlines to created on text.
export class Teams extends Component {
  constructor(props) {
    super(props);
    this.inputRef = createRef(null);
  }

  onSearchChange = (query) => {
    const queryParams = queryString.parse(this.props.location.search);
    let newQueries;
    if (query === "") {
      newQueries = queryParams;
      delete newQueries.query;
    } else {
      newQueries = { ...queryParams, query };
    }

    this.props.history.push({
      search: queryString.stringify(newQueries),
    });
  };

  componentDidUpdate() {
    const queryParams = queryString.parse(this.props.location.search);
    const searchQuery = queryParams.query ?? "";
    this.inputRef?.current?.setQuery(searchQuery);
  }

  pageHeader = (tab) => {
    const selectedTab = tab;

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
            <Tabs tabs={teamTabs} selected={selectedTab} />
          </div>
          <DebouncedInput ref={this.inputRef} onChange={this.onSearchChange} />
        </div>
      </div>
    );
  };

  render() {
    const path = this.props.match.path;

    const queryParams = queryString.parse(this.props.location.search);
    const searchQuery = queryParams.query ?? "";
    const fetchOptions = {};

    return (
      <CustomSwitch>
        <Route exact path={`${path}`}>
          <Redirect to={`${path}/all`} />
        </Route>
        {/* Render a Route for each teamTab */}
        {teamTabs.map((tab) => {
          return (
            <Route path={`${path}/${tab.pathLink}`} key={tab}>
              {this.pageHeader(tab)}
              <div className="container-fluid px-5 my-5">
                <div className="row g-5">
                  <div className="col">
                    <TeamsContainer
                      text={tab.text}
                      fetchOptions={{ ...tab.fetchOptions, searchQuery }}
                    />
                  </div>
                  <div className="col-xxl-3">
                    <ActivitiesContainer />
                  </div>
                </div>
              </div>
            </Route>
          );
        })}
      </CustomSwitch>
    );
  }
}

export default withRouter(Teams);
