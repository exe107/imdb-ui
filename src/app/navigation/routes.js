// @flow
import MoviesSearch from 'app/pages/movies-search/MoviesSearch';
import Movie from 'app/pages/movie/Movie';
import Person from 'app/pages/person/Person';
import Register from 'app/pages/forms/Register';
import Login from 'app/pages/forms/Login';

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

export const ROUTES = [
  MOVIES_SEARCH_ROUTE,
  MOVIE_ROUTE,
  PERSON_ROUTE,
  REGISTER_ROUTE,
  LOGIN_ROUTE,
];
