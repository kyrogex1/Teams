export const isNullOrUndefined = (value) =>
  value === undefined || value === null;

export const generateRandomNumber = () =>
  Math.floor(Math.random() * 9999999999);
