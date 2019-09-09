const endpoint = "http://www.omdbapi.com/";
const apikey = "859f4e37";
const ENDPOINT_WITH_PROXY = `${process.env.REACT_APP_HEROKU_PROXY}${endpoint}?apikey=${apikey}`;

export const searchByTitle = title =>
  fetch(`${ENDPOINT_WITH_PROXY}&t=${title}`);

export const searchById = id => fetch(`${ENDPOINT_WITH_PROXY}&t=${id}`);
