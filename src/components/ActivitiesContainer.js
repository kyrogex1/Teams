import React, { Component } from "react";
import { fetchActivities } from "../util/api";

const increaseQuotaText = ({ id, person, action, target, created_at }) => {
  return (
    <>
      <strong>{person.name}</strong> increased <strong>{target}</strong>'s
      quota.
    </>
  );
};

const addedLeadsText = ({ id, person, action, target, created_at }) => {
  return (
    <>
      <strong>{person.name}</strong> added new leads to{" "}
      <strong>{target}</strong>
    </>
  );
};

const archivedTeamText = ({ id, person, action, target, created_at }) => {
  return (
    <>
      <strong>{person.name}</strong> archived the team {target}.
    </>
  );
};

const actionToTextFunctionMap = {
  increased_quota: increaseQuotaText,
  added_leads: addedLeadsText,
  archived_team: archivedTeamText,
};

const activityElement = (activity) => {
  return (
    <div className="d-flex align-items-start mb-3">
      <img
        src={activity.person.avatar}
        style={{ height: "3rem" }}
        className="rounded-circle me-3"
      />
      <div className="flex-grow-1">
        <p className="mb-0">
          {actionToTextFunctionMap[activity.action](activity)}
        </p>

        <span className="text-muted fs-6">
          {activity.created_at ? activity.created_at : "\u00A0"}
        </span>
      </div>
    </div>
  );
};

export class ActivitiesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: [],
      isLoading: true,
    };
  }

  componentDidMount = async () => {
    const activities = await fetchActivities();
    this.setState({
      activities,
      isLoading: false,
    });
  };

  render() {
    return (
      <div className="bg-white m-4 shadow">
        <div className="d-flex justify-content-between p-4 align-items-center">
          <strong>Activities</strong>
        </div>
        <hr className="m-0" />
        <div className="p-4">
          {this.state.activities.map((activity) => activityElement(activity))}
        </div>
      </div>
    );
  }
}

export default ActivitiesContainer;
