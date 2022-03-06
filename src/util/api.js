import data from "./data.json";

// Function to simulate network delay
function sleep(ms = 5000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// TODO: Add Delays
export const fetchTeams = async () => {
  let teams;
  ({ teams } = data);
  await sleep();

  return teams;
};

export const fetchTotalNumberTeams = async () => {
  let teams;
  ({ teams } = data);
  await sleep();

  return teams.length;
};

export const fetchCurrentUser = async (
  isFavorite = false,
  isArchived = false
) => {
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
