import React, { Component } from "react";
import {
  fetchTotalNumberTeams,
  favoriteTeam,
  unfavoriteTeam,
} from "../util/api";
import TeamCard from "./TeamCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export class TeamsContainer extends Component {
  constructor(props) {
    super(props);
    this.cancelSignal = { cancel: false };
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
    if (
      prevProps.fetchFunction !== this.props.fetchFunction ||
      prevProps.searchQuery !== this.props.searchQuery
    ) {
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

    const teamsPromise = this.props.fetchFunction(this.props.searchQuery);
    const numberOfTeamsPromise = fetchTotalNumberTeams();
    const [teams, numberOfTeams] = await Promise.all([
      teamsPromise,
      numberOfTeamsPromise,
    ]);

    // Guard to prevent updating teams whenver
    // params eg(fetchFunction / searchQuery / page)
    if (!cancelSignal.cancel) {
      this.setState({
        numberOfTeams: numberOfTeams,
        teamsToDisplay: teams,
        isLoading: false,
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

    if (this.state.teamsToDisplay.length > 0) {
      return this.state.teamsToDisplay.map((team) => {
        return (
          <div className="col-lg-4 col-md-6 col-sm-12" key={team.id}>
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
            Showing {this.state.teamsToDisplay.length} out of{" "}
            {this.state.numberOfTeams} teams
          </small>
        )}
      </div>
    );
  };

  render() {
    return (
      <div className="bg-white shadow">
        {this.containerHeader()}
        <hr className="m-0" />
        <div className="row p-4">{this.teamList()}</div>
      </div>
    );
  }
}

export default TeamsContainer;
