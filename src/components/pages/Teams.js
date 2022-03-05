import React, { Component } from "react";
import { fetchTeams } from "../../util/api";
import TeamCard from "../TeamCard";

export class Teams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      isLoading: true,
    };
  }

  async componentDidMount() {
    const teams = await fetchTeams();
    this.setState({
      teams: teams,
      isLoading: false,
    });
  }

  teamList = () => {
    return this.state.teams.map((team) => {
      return (
        <div className="col-lg-4 col-md-6 col-sm-12" key={team.id}>
          <TeamCard {...team} />
        </div>
      );
    });
  };

  pageHeader = () => {
    return (
      <div className="bg-white pt-4 px-4 shadow-sm">
        <div className="d-flex justify-content-between mb-3">
          <p>Teams</p>
          <button className="btn btn-success"> CREATE NEW TEAM</button>
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
        <div className="row">{this.teamList()}</div>
      </div>
    );
  }
}

export default Teams;
