import React, { Component } from "react";
import {
  fetchTotalNumberTeams,
  favoriteTeam,
  fetchNumberMatchedTeams,
  unfavoriteTeam,
  fetchTeams,
} from "../util/api";
import queryString from "query-string";
import TeamCard from "./TeamCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Pagination from "./Pagination";
import { withRouter } from "react-router-dom";

export class TeamsContainer extends Component {
  constructor(props) {
    super(props);
    this.cancelSignal = { cancel: false };
    this.state = {
      teamsPerPage: 3,
      numberOfTeams: 0,
      numberOfTeamsMatched: 0,
      teamsToDisplay: [],
      isLoading: true,
    };
  }

  componentDidMount = () => {
    this.fetchData();
  };

  componentDidUpdate = (prevProps) => {
    const queryParams = queryString.parse(this.props.location.search);
    const currentPage = queryParams.page ?? 1;

    const prevQueryParams = queryString.parse(prevProps.location.search);
    const prevPage = prevQueryParams.page ?? 1;

    let shouldRefetch = false;

    // Refetch if any of the search options or page change
    for (let key in this.props.fetchOptions) {
      if (this.props.fetchOptions[key] !== prevProps.fetchOptions[key]) {
        shouldRefetch = true;
      }
    }

    if (currentPage !== prevPage) {
      shouldRefetch = true;
    }

    if (shouldRefetch) {
      this.fetchData();
    }
  };

  fetchData = async () => {
    this.setState({
      isLoading: true,
    });

    // Cancel previous fetch
    this.cancelSignal.cancel = true;
    const cancelSignal = { cancel: false };
    this.cancelSignal = cancelSignal;

    const queryParams = queryString.parse(this.props.location.search);
    const currentPage = queryParams.page ?? 1;

    const teamsPromise = fetchTeams(
      this.props.fetchOptions,
      (currentPage - 1) * this.state.teamsPerPage, // -1 since page is 1-indexed, but slicing is 0-indexed
      this.state.teamsPerPage
    );
    const numberOfTeamsPromise = fetchTotalNumberTeams();
    const numberOfTeamsMatchedPromise = fetchNumberMatchedTeams(
      this.props.fetchOptions
    );
    const [teams, numberOfTeams, numberOfTeamsMatched] = await Promise.all([
      teamsPromise,
      numberOfTeamsPromise,
      numberOfTeamsMatchedPromise,
    ]);

    // Guard to prevent updating teams whenver
    // params eg(fetchFunction / searchQuery / page)
    if (!cancelSignal.cancel) {
      this.setState({
        numberOfTeams: numberOfTeams,
        teamsToDisplay: teams,
        isLoading: false,
        numberOfTeamsMatched,
      });
    }
  };

  favoriteHandler = async (teamId) => {
    const teamsToDisplayClone = [...this.state.teamsToDisplay];
    const teamToUpdateIndex = teamsToDisplayClone.findIndex(
      (team) => team.id === teamId
    );
    const teamToUpdate = teamsToDisplayClone[teamToUpdateIndex];
    let updatedTeam;

    if (teamToUpdate.is_favorited) {
      await unfavoriteTeam(teamToUpdate.id);
      updatedTeam = { ...teamToUpdate, is_favorited: false };
    } else {
      await favoriteTeam(teamToUpdate.id);
      updatedTeam = { ...teamToUpdate, is_favorited: true };
    }

    teamsToDisplayClone[teamToUpdateIndex] = updatedTeam;
    this.setState({
      teamsToDisplay: teamsToDisplayClone,
    });

    return;
  };

  onPageChange = (page) => {
    const queryParams = queryString.parse(this.props.location.search);
    let newQueries;
    if (page <= 1) {
      newQueries = queryParams;
      delete newQueries.page;
    } else {
      newQueries = { ...queryParams, page };
    }

    this.props.history.push({
      search: queryString.stringify(newQueries),
    });
  };

  teamList = () => {
    if (this.state.isLoading) {
      return Array(3)
        .fill(1)
        .map((_, idx) => {
          return (
            <div className="col-xl-4 col-lg-6" key={idx}>
              <TeamCard isLoading />
            </div>
          );
        });
    }

    if (this.state.teamsToDisplay.length > 0) {
      return this.state.teamsToDisplay.map((team) => {
        return (
          <div className="col-xl-4 col-lg-6" key={team.id}>
            <TeamCard {...team} favoriteHandler={this.favoriteHandler} />
          </div>
        );
      });
    } else {
      return <p>No teams found</p>;
    }
  };

  containerHeader = () => {
    return (
      <div className="d-flex justify-content-between p-4 align-items-center">
        <strong>{this.props.text} Teams</strong>
        {this.state.isLoading ? (
          <Skeleton width={"200px"} />
        ) : (
          <small className="text-muted">
            Showing {this.state.numberOfTeamsMatched} out of{" "}
            {this.state.numberOfTeams} teams
          </small>
        )}
      </div>
    );
  };

  render() {
    const queryParams = queryString.parse(this.props.location.search);
    const currentPage = queryParams.page ?? 1;
    return (
      <div className="bg-white shadow">
        {this.containerHeader()}
        <hr className="m-0" />
        <div className="row p-4">{this.teamList()}</div>
        <div className="p-4 d-flex justify-content-center">
          <Pagination
            pageSize={this.state.teamsPerPage}
            totalCount={this.state.numberOfTeamsMatched}
            currentPage={parseInt(currentPage)}
            onPageChange={this.onPageChange}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(TeamsContainer);
