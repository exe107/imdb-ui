// @flow
import * as React from 'react';
import { constructUrl } from 'app/navigation/util';
import { MOVIE_ROUTE } from 'app/navigation/routes';
import { formatRuntime } from 'app/util';
import imageNotFound from 'app/images/image_not_found.png';
import type { UserMovie } from 'app/redux/user/flow';

type Props = {
  ordinal: number,
  movie: UserMovie,
};

const WatchlistMovie = ({ ordinal, movie }: Props) => {
  const { id, name, year, genres, imageUrl, runtime, rating } = movie;

  const NOT_AVAILABLE = 'N/A';
  const image = imageUrl !== NOT_AVAILABLE ? imageUrl : imageNotFound;

  return (
    <div className="d-flex mt-5">
      <img src={image} height={160} alt="" />
      <div className="ml-3">
        <h3>
          <span>{ordinal}.</span>
          <a className="ml-1" href={constructUrl(MOVIE_ROUTE.path, [], { id })}>
            {name}
          </a>
        </h3>
        <h5>Year: {year}</h5>
        <h5>Genre: {genres.join(', ')}</h5>
        <h5>Runtime: {runtime ? formatRuntime(runtime) : NOT_AVAILABLE}</h5>
        <h5>
          <span>Rating: {rating || NOT_AVAILABLE}</span>
          {rating && <i className="fa fa-star text-warning ml-1" />}
        </h5>
      </div>
    </div>
  );
};

export default WatchlistMovie;
