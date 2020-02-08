// @flow
type MovieResponse = {
  Response: string,
  Error: string,
};

export type BaseMovieDetails = {
  imdbID: string,
  Poster: string,
  Title: string,
  Year: string,
  Type: string,
};

export type MovieSearchResponse = MovieResponse & {
  Search: BaseMovieDetails[],
};

export type MovieDetailsResponse = MovieResponse &
  BaseMovieDetails & {
    Plot: string,
    imdbRating: string,
    imdbVotes: string,
    Genre: string,
    Runtime: string,
    Language: string,
    Released: string,
    Website: string,
    Awards: string,
    Country: string,
    BoxOffice: string,
    Production: string,
    Actors: string,
    Director: string,
  };
