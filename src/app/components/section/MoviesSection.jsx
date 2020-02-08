// @flow
import * as React from 'react';
import _isEmpty from 'lodash/isEmpty';
import { MOVIE_ROUTE } from 'app/navigation/routes';
import { constructUrl } from 'app/navigation/util';
import type { Movie } from 'app/movies/flow';

type Props = {
  header: string,
  movies: Movie[],
};

const MoviesSection = ({ header, movies }: Props): React.Node =>
  !_isEmpty(movies) && (
    <React.Fragment>
      <h4>{header}:</h4>
      <ul>
        {movies.map(({ name, id, year }: Movie) => {
          const label = year ? `${name} (${year})` : name;

          return (
            <li key={name}>
              {id ? (
                <a href={constructUrl(MOVIE_ROUTE.path, [], { id })}>{label}</a>
              ) : (
                <span>{label}</span>
              )}
            </li>
          );
        })}
      </ul>
    </React.Fragment>
  );

export default MoviesSection;
