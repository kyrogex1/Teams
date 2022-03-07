import data from "./data.json";

// Function to simulate network delay
function sleep(ms = 2000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const fetchTeams = async (
  isFavorite = false,
  isArchived = false,
  nameFilter = ""
) => {
  let teams;
  ({ teams } = data);

  if (isFavorite) {
    teams = teams.filter((team) => team.is_favorited);
  }

  if (isArchived) {
    teams = teams.filter((team) => team.is_archived);
  }

  if (nameFilter) {
    teams = teams.filter((team) =>
      team?.name?.toLowerCase()?.includes?.(nameFilter.toLowerCase())
    );
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

export const favoriteTeam = async (teamId) => {
  let teams;
  ({ teams } = data);
  const team = teams.find((team) => team.id === teamId);
  await sleep();

  if (team) {
    team.is_favorited = true;
  }

  return;
};

export const unfavoriteTeam = async (teamId) => {
  let teams;
  ({ teams } = data);
  const team = teams.find((team) => team.id === teamId);
  await sleep();

  if (team) {
    team.is_favorited = false;
  }

  return;
};
