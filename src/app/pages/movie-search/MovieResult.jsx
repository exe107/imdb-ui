// @flow
import * as React from 'react';
import { NOT_AVAILABLE } from 'app/constants';
import { constructUrl } from 'app/navigation/util';
import { MOVIE_ROUTE } from 'app/navigation/routes';
import imageNotFound from 'app/images/image_not_found.png';
import type { BaseMovieDetails } from 'app/api/omdb/flow';

type Props = {
  movie: BaseMovieDetails,
  ordinal: number,
};

const MovieResult = ({ movie, ordinal }: Props) => {
  const { imdbID, Title, Year, Poster } = movie;
  const image = Poster !== NOT_AVAILABLE ? Poster : imageNotFound;

  return (
    <div className="d-flex mt-5">
      <img src={image} width={100} alt="" />
      <div className="ml-3">
        <div className="mb-2">
          <h5 className="d-inline">{ordinal}.</h5>
          <h4 className="d-inline">
            <a
              className="ml-1"
              href={constructUrl(MOVIE_ROUTE.path, [], { id: imdbID })}
            >
              {Title}
            </a>
          </h4>
        </div>
        <h5>Year: {Year}</h5>
      </div>
    </div>
  );
};

export default MovieResult;
