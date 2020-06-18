// @flow
import * as React from 'react';
import { MOVIE_ROUTE } from 'app/navigation/routes';
import { constructUrl } from 'app/navigation/util';
import type { Movie } from 'app/api/sparql/flow';

type Props = {
  ordinal: number,
  movie: Movie,
};

const MovieResult = ({ ordinal, movie }: Props): React.Node => {
  const { id, name, year } = movie;
  const movieLabel = year ? `${name} (${year})` : name;

  return (
    <h5>
      {`${ordinal}. `}
      <a href={constructUrl(MOVIE_ROUTE.path, [], { id })}>{movieLabel}</a>
    </h5>
  );
};

export default MovieResult;
