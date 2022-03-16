import data from "./data.json";
import { isNullOrUndefined } from "./utils";

// Function to simulate network delay
function sleep(ms = 1000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const fetchTeams = async (
  fetchOptions,
  itemOffset = 0,
  itemsToFetch = 0
) => {
  let teams = filterTeams(fetchOptions);
  teams = teams.slice(itemOffset, itemOffset + itemsToFetch);
  await sleep();

  return teams;
};

export const fetchTotalNumberTeams = async () => {
  let teams;
  ({ teams } = data);
  await sleep();

  return teams.length;
};

export const fetchNumberMatchedTeams = async (fetchOptions) => {
  let teams = filterTeams(fetchOptions);
  await sleep();

  return teams.length;
};

export const fetchCurrentUser = async () => {
  let current_user;
  ({ current_user } = data);
  await sleep();

  return current_user;
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

const filterTeams = (fetchOptions) => {
  const { isFavorite, isArchived, searchQuery } = fetchOptions;

  let { teams } = data;

  if (!isNullOrUndefined(isFavorite)) {
    teams = teams.filter((team) => team.is_favorited);
  }

  if (!isNullOrUndefined(isArchived)) {
    teams = teams.filter((team) => team.is_archived);
  }

  if (searchQuery) {
    teams = teams.filter((team) =>
      team?.name?.toLowerCase()?.includes?.(searchQuery.toLowerCase())
    );
  }

  return teams;
};
