import React, { Component } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
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

const loadingPlaceHolder = (key) => {
  return (
    <div className="p-3" key={key}>
      <div className="d-flex">
        <Skeleton circle inline={true} width={"2rem"} height={"2rem"} />
        <Skeleton inline={true} containerClassName="ms-3 flex-grow-1" />
      </div>
      <Skeleton count={2} />
    </div>
  );
};

const actionToTextFunctionMap = {
  increased_quota: increaseQuotaText,
  added_leads: addedLeadsText,
  archived_team: archivedTeamText,
};

const activityElement = (activity, isLoading, key) => {
  // Loading placeholder
  if (isLoading) {
    return loadingPlaceHolder(key);
  }
  return (
    <div className="d-flex align-items-start mb-3" key={key}>
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

  activitiesList = () => {
    let listToRender = [];
    if (this.state.isLoading) {
      listToRender = Array(4).fill(0);
    } else {
      listToRender = this.state.activities;
    }

    return listToRender.map((activity, index) =>
      activityElement(activity, this.state.isLoading, index)
    );
  };

  render() {
    return (
      <div className="bg-white m-4 shadow">
        <div className="d-flex justify-content-between p-4 align-items-center">
          <strong>Activities</strong>
        </div>
        <hr className="m-0" />
        <div className="p-4">{this.activitiesList()}</div>
      </div>
    );
  }
}

export default ActivitiesContainer;
