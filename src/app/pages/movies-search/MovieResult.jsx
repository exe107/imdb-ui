// @flow
import * as React from 'react';
import { MOVIE_ROUTE } from 'app/navigation/routes';
import { constructUrl } from 'app/navigation/util';
import type { Movie } from 'app/movies/flow';

type Props = {
  ordinal: number,
  movie: Movie,
};

const MovieResult = ({ ordinal, movie }: Props): React.Node => {
  const { id, name, year } = movie;

  return (
    <h4>
      {`${ordinal}. `}
      <a href={constructUrl(MOVIE_ROUTE.path, [], { id })}>
        {name} ({year})
      </a>
    </h4>
  );
};

export default MovieResult;
