import data from "./data.json";

const USE_LOCAL_STORAGE = process.env.REACT_USE_LOCAL_STORAGE ?? true;

// Function to simulate network delay
function sleep(ms = 2000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const fetchTeams = async (
  isFavorite = false,
  isArchived = false,
  nameFilter = ""
) => {
  await sleep();

  let teams;
  const cachedData = getData();
  teams = cachedData.teams;

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

  return teams;
};

export const fetchTotalNumberTeams = async () => {
  await sleep();

  let teams;
  const cachedData = getData();
  teams = cachedData.teams;

  return teams.length;
};

export const fetchCurrentUser = async () => {
  await sleep();

  let current_user;
  ({ current_user } = data);

  return current_user;
};

export const fetchActivities = async () => {
  await sleep();

  let activities;
  ({ activities } = data);

  return activities;
};

export const favoriteTeam = async (teamId) => {
  await sleep();

  let teams;
  const cachedData = getData();
  teams = cachedData.teams;
  const team = teams.find((team) => team.id === teamId);

  if (team) {
    team.is_favorited = true;
    setData(cachedData);
  }

  return;
};

export const unfavoriteTeam = async (teamId) => {
  await sleep();

  let teams;
  const cachedData = getData();
  teams = cachedData.teams;
  const team = teams.find((team) => team.id === teamId);

  if (team) {
    team.is_favorited = false;
    setData(cachedData);
  }

  return;
};

if (USE_LOCAL_STORAGE) {
  Storage.prototype.setObject = function (key, value) {
    this.setItem(key, JSON.stringify(value));
  };

  Storage.prototype.getObject = function (key) {
    var value = this.getItem(key);
    return value && JSON.parse(value);
  };

  const cachedData = localStorage.getObject("data");
  if (!cachedData) {
    localStorage.setObject("data", data);
  }
}

const getData = () => {
  if (USE_LOCAL_STORAGE) {
    return localStorage.getObject("data");
  } else {
    return data;
  }
};

const setData = (newData) => {
  // Dont need to do anything if not using localStorage
  if (USE_LOCAL_STORAGE) {
    localStorage.setObject("data", newData);
  }
};
