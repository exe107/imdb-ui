import MoviesSearch from "../pages/movies-search/MoviesSearch";
import Movie from "../pages/Movie";
import Person from "../pages/Person";

export const MOVIES_SEARCH_ROUTE = {
  path: "/movies-search",
  component: MoviesSearch
};

export const MOVIE_ROUTE = {
  path: "/movie",
  component: Movie
};

export const PERSON_ROUTE = {
  path: "/person/:id",
  component: Person
};

export const ROUTES = [MOVIES_SEARCH_ROUTE, MOVIE_ROUTE, PERSON_ROUTE];
