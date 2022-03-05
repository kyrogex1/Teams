import data from "./data.json";

// TODO: Add Delays
export const fetchTeams = async () => {
  let teams;
  const x = data;
  ({ teams } = data);

  return teams;
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
