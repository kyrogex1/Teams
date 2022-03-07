import React, { Component } from "react";
import { fetchTeams, fetchTotalNumberTeams } from "../util/api";
import TeamCard from "./TeamCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export class TeamsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfTeams: 0,
      teamsToDisplay: [],
      isLoading: true,
    };
  }

  componentDidMount = () => {
    this.fetchData();
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.fetchFunction !== this.props.fetchFunction) {
      this.fetchData();
    }
  };

  fetchData = async () => {
    this.setState({
      isLoading: true,
    });

    const cacheFetchFuntion = this.props.fetchFunction;
    const teamsPromise = this.props.fetchFunction();
    const numberOfTeamsPromise = fetchTotalNumberTeams();
    const [teams, numberOfTeams] = await Promise.all([
      teamsPromise,
      numberOfTeamsPromise,
    ]);

    // Guard to prevent bug when user switches between tabs
    // rapidly. Only show results when current fetchFunction
    // is the same as the one used to fetch results.
    if (cacheFetchFuntion === this.props.fetchFunction) {
      this.setState({
        numberOfTeams: numberOfTeams,
        teamsToDisplay: teams,
        isLoading: false,
      });
    }
  };

  teamList = () => {
    if (this.state.isLoading) {
      return Array(3)
        .fill(1)
        .map((_, idx) => {
          return (
            <div className="col-lg-4 col-md-6 col-sm-12" key={idx}>
              <TeamCard isLoading />
            </div>
          );
        });
    }

    return this.state.teamsToDisplay.map((team) => {
      return (
        <div className="col-lg-4 col-md-6 col-sm-12" key={team.id}>
          <TeamCard {...team} />
        </div>
      );
    });
  };

  containerHeader = () => {
    return (
      <div className="d-flex justify-content-between p-4 align-items-center">
        <strong>{this.props.text} Teams</strong>
        {this.state.isLoading ? (
          <Skeleton width={"200px"} />
        ) : (
          <small className="text-muted">
            Showing {this.state.teamsToDisplay.length} out of{" "}
            {this.state.numberOfTeams} teams
          </small>
        )}
      </div>
    );
  };

  render() {
    return (
      <div className="bg-white m-4 shadow">
        {this.containerHeader()}
        <hr className="m-0" />
        <div className="row p-4">{this.teamList()}</div>
      </div>
    );
  }
}

export default TeamsContainer;
