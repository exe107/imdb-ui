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
          {movies.map(({ name, id, year }) => (
            <li key={id}>
              <a href={constructUrl(MOVIE_ROUTE.path, [], { id })}>{name} ({year})</a>
            </li>
          ))}
        </ul>
      </React.Fragment>
    )
  );
};

export default MoviesSection;
