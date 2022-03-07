import data from "./data.json";

// Function to simulate network delay
function sleep(ms = 2000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const fetchTeams = async (isFavorite = false, isArchived = false) => {
  let teams;
  ({ teams } = data);

  if (isFavorite) {
    teams = teams.filter((team) => team.is_favorited);
  }

  if (isArchived) {
    teams = teams.filter((team) => team.is_archived);
  }
  await sleep();

  return teams;
};

export const fetchTotalNumberTeams = async () => {
  let teams;
  ({ teams } = data);
  await sleep();

  return teams.length;
};

export const fetchCurrentUser = async () => {
  let currentUser;
  ({ currentUser } = data);
  await sleep();

  return currentUser;
};

export const fetchActivities = async () => {
  let activities;
  ({ activities } = data);
  await sleep();

  return activities;
};
