import MoviesSearch from "../pages/MoviesSearch";
import Movie from "../pages/Movie";
import Actor from "../pages/Actor";
import Director from "../pages/Director";

export const MOVIES_SEARCH_ROUTE = {
  path: "/movies-search",
  component: MoviesSearch
};

export const MOVIE_ROUTE = {
  path: "/movie/:title",
  component: Movie
};

export const ACTOR_ROUTE = {
  path: "/actor",
  component: Actor
};

export const DIRECTOR_ROUTE = {
  path: "/director",
  component: Director
};

export const ROUTES = [MOVIES_SEARCH_ROUTE, MOVIE_ROUTE, ACTOR_ROUTE, DIRECTOR_ROUTE];