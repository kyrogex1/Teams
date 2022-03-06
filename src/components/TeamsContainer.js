import React, { Component } from "react";
import { fetchTeams, fetchTotalNumberTeams } from "../util/api";
import TeamCard from "./TeamCard";

export class TeamsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfTeams: 0,
      teamsToDisplay: [],
      isLoading: true,
    };
  }

  async componentDidMount() {
    const teamsPromise = fetchTeams();
    const numberOfTeamsPromise = fetchTotalNumberTeams();
    const [teams, numberOfTeams] = await Promise.all([
      teamsPromise,
      numberOfTeamsPromise,
    ]);

    this.setState({
      numberOfTeams: numberOfTeams,
      teamsToDisplay: teams,
      isLoading: false,
    });
  }

  teamList = () => {
    return this.state.teamsToDisplay.map((team) => {
      return (
        <div className="col-lg-4 col-md-6 col-sm-12" key={team.id}>
          <TeamCard {...team} />
        </div>
      );
    });
  };

  render() {
    return (
      <div className="bg-white m-4 shadow">
        <div className="d-flex justify-content-between p-4 align-items-center">
          <strong>All Teams</strong>
          <small class="text-muted">
            Showing {this.state.teamsToDisplay.length} out of{" "}
            {this.state.numberOfTeams} teams
          </small>
        </div>
        <hr className="m-0" />
        <div className="row p-4">{this.teamList()}</div>
      </div>
    );
  }
}

export default TeamsContainer;
