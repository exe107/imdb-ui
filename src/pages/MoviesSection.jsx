import * as React from "react";
import { MOVIE_ROUTE } from "../navigation/routes";
import { constructUrl } from "../util";

const MoviesSection = props => {
  const { header, movies } = props;

  return (
    movies.length > 0 && (
      <React.Fragment>
        <h4>{header}:</h4>
        <ul>
          {movies.map(movie => (
            <li key={movie}>
              <a href={constructUrl(MOVIE_ROUTE.path, [movie])}>{movie}</a>
            </li>
          ))}
        </ul>
      </React.Fragment>
    )
  );
};

export default MoviesSection;
