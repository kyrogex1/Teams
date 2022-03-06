import data from "./data.json";

// TODO: Add Delays
export const fetchTeams = async () => {
  let teams;
  ({ teams } = data);

  return teams;
};

export const fetchTotalNumberTeams = async () => {
  let teams;
  ({ teams } = data);

  return teams.length;
};

export const fetchCurrentUser = async (
  isFavorite = false,
  isArchived = false
) => {
  let currentUser;
  ({ currentUser } = data);

  return currentUser;
};

export const fetchActivities = async () => {
  let activities;
  ({ activities } = data);

  return activities;
};
