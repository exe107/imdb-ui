// @flow
import MoviesSearch from 'app/pages/movies-search/MoviesSearch';
import Movie from 'app/pages/movie/Movie';
import Person from 'app/pages/person/Person';
import Register from 'app/pages/forms/Register';
import Login from 'app/pages/forms/Login';
import Ratings from 'app/pages/ratings/Ratings';
import Watchlist from 'app/pages/watchlist/Watchlist';

export const MOVIES_SEARCH_ROUTE = {
  path: '/movies-search',
  component: MoviesSearch,
};

export const MOVIE_ROUTE = {
  path: '/movie',
  component: Movie,
};

export const PERSON_ROUTE = {
  path: '/person/:id',
  component: Person,
};

export const REGISTER_ROUTE = {
  path: '/register',
  component: Register,
};

export const LOGIN_ROUTE = {
  path: '/login',
  component: Login,
};

export const RATINGS_ROUTE = {
  path: '/ratings',
  component: Ratings,
};

export const WATCHLIST_ROUTE = {
  path: '/watchlist',
  component: Watchlist,
};

export const ROUTES = [
  MOVIES_SEARCH_ROUTE,
  MOVIE_ROUTE,
  PERSON_ROUTE,
  REGISTER_ROUTE,
  LOGIN_ROUTE,
  RATINGS_ROUTE,
  WATCHLIST_ROUTE,
];
