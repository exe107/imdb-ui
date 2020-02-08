// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { constructUrl } from 'app/navigation/util';
import { MOVIE_ROUTE } from 'app/navigation/routes';
import { formatRuntime } from 'app/util';
import { removeWatchlistMovieAction } from 'app/redux/user/actions';
import imageNotFound from 'app/images/image_not_found.png';
import type {
  RemoveWatchlistMovieAction,
  UserMovie,
} from 'app/redux/user/flow';

const ImageContainer = styled.div`
  position: relative;
  cursor: pointer;
`;

const Image = styled.img`
  opacity: ${props => (props.hovered ? '0.6' : '1')};
`;

const RemoveIcon = styled.i`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

type Props = {
  ordinal: number,
  movie: UserMovie,
  removeWatchlistMovie: string => RemoveWatchlistMovieAction,
};

const WatchlistMovie = ({ ordinal, movie, removeWatchlistMovie }: Props) => {
  const [hovered, setHovered] = React.useState(false);
  const onImageMouseEnter = React.useCallback(() => setHovered(true), []);
  const onImageMouseLeave = React.useCallback(() => setHovered(false), []);

  const onImageClick = React.useCallback(() => removeWatchlistMovie(movie.id), [
    removeWatchlistMovie,
    movie.id,
  ]);

  const { id, name, year, genres, imageUrl, runtime, rating } = movie;

  const NOT_AVAILABLE = 'N/A';
  const image = imageUrl !== NOT_AVAILABLE ? imageUrl : imageNotFound;

  return (
    <div className="d-flex mt-5">
      <ImageContainer
        data-toggle="tooltip"
        title="Remove from watchlist"
        onMouseEnter={onImageMouseEnter}
        onMouseLeave={onImageMouseLeave}
        onClick={onImageClick}
      >
        <Image src={image} height={160} hovered={hovered} />
        {hovered && <RemoveIcon className="fa fa-4x fa-remove text-white" />}
      </ImageContainer>
      <div className="ml-3">
        <div className="mb-2">
          <h5 className="d-inline">{ordinal}.</h5>
          <h4 className="d-inline">
            <a
              className="ml-1"
              href={constructUrl(MOVIE_ROUTE.path, [], { id })}
            >
              {name}
            </a>
          </h4>
        </div>
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

const mapDispatchToProps = {
  removeWatchlistMovie: removeWatchlistMovieAction,
};

export default connect(
  null,
  mapDispatchToProps,
)(WatchlistMovie);
