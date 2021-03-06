// @flow
import Home from 'app/pages/home/Home';
import MoviesSearch from 'app/pages/movies-search/MoviesSearch';
import MovieSearchResults from 'app/pages/movie-search/MovieSearchResults';
import Movie from 'app/pages/movie/Movie';
import Person from 'app/pages/person/Person';
import Register from 'app/pages/register/Register';
import Login from 'app/pages/login/Login';
import Ratings from 'app/pages/ratings/Ratings';
import Watchlist from 'app/pages/watchlist/Watchlist';
import EditProfile from 'app/pages/edit-profile/EditProfile';
import PasswordChange from 'app/pages/password-change/PasswordChange';
import PendingReviews from 'app/pages/pending-reviews/PendingReviews';

export const HOME_ROUTE = {
  path: '/home',
  component: Home,
};

export const MOVIES_SEARCH_ROUTE = {
  path: '/movies-search',
  component: MoviesSearch,
};

export const MOVIE_SEARCH_RESULTS_ROUTE = {
  path: '/movie-search-results',
  component: MovieSearchResults,
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

export const EDIT_PROFILE_ROUTE = {
  path: '/edit-profile',
  component: EditProfile,
};

export const CHANGE_PASSWORD_ROUTE = {
  path: '/change-password',
  component: PasswordChange,
};

export const RATINGS_ROUTE = {
  path: '/ratings',
  component: Ratings,
};

export const WATCHLIST_ROUTE = {
  path: '/watchlist',
  component: Watchlist,
};

export const PENDING_REVIEWS_ROUTE = {
  path: '/pending-reviews',
  component: PendingReviews,
};

export const ROUTES = [
  HOME_ROUTE,
  MOVIES_SEARCH_ROUTE,
  MOVIE_SEARCH_RESULTS_ROUTE,
  MOVIE_ROUTE,
  PERSON_ROUTE,
  REGISTER_ROUTE,
  LOGIN_ROUTE,
  EDIT_PROFILE_ROUTE,
  CHANGE_PASSWORD_ROUTE,
  RATINGS_ROUTE,
  WATCHLIST_ROUTE,
  PENDING_REVIEWS_ROUTE,
];
