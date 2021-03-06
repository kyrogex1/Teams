import React, { Component, createRef } from "react";
import ActivitiesContainer from "../../ActivitiesContainer";
import { Redirect, Route, withRouter } from "react-router-dom";
import queryString from "query-string";
import Tabs from "../../shared/Tabs";
import TeamsContainer from "./TeamsContainer";
import DebouncedInput from "../../shared/DebouncedInput";
import { ReactComponent as IconPlus } from "../../../assets/svg/icon-plus.svg";
import { ReactComponent as IconTeams } from "../../../assets/svg/icon-teams.svg";
import CustomSwitch from "../../shared/CustomSwitch";
import { Link } from "react-router-dom";
import CreateTeamPage from "./CreateTeamPage";

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

  tabItem = (text, isSelected, pathLink, key) => {
    return (
      <Link
        to={pathLink}
        className={
          "text-decoration-none " + (isSelected ? "text-primary" : "text-dark")
        }
        key={key}
      >
        <div className="p-3">
          <strong>{text}</strong>
        </div>
      </Link>
    );
  };

  componentDidUpdate() {
    const queryParams = queryString.parse(this.props.location.search);
    const searchQuery = queryParams.query ?? "";
    this.inputRef?.current?.setQuery(searchQuery);
  }

  pageHeader = (tab) => {
    const selectedTab = tab;
    const url = this.props.match?.url;
    const createNewTeamUrl = url + "/create";

    const tabItems = teamTabs.map((tab, index) => {
      return this.tabItem(tab.text, tab === selectedTab, tab.pathLink, index);
    });

    return (
      <div className="bg-white pt-4 px-4 shadow-sm">
        <div className="d-flex justify-content-between mb-3">
          <h2 className="d-flex align-items-center">
            <IconTeams style={{ color: "#A4A6A8" }} className="me-3" /> Teams
          </h2>
          <Link
            className="btn btn-light-green d-flex align-items-center"
            to={createNewTeamUrl}
          >
            <IconPlus className="me-2" /> CREATE NEW TEAM
          </Link>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <Tabs
              tabs={tabItems}
              selectedIndex={teamTabs.indexOf(selectedTab)}
            />
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
        <Route path={`${path}/create`}>
          <CreateTeamPage />
        </Route>
      </CustomSwitch>
    );
  }
}

export default withRouter(Teams);
