// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { NOT_AVAILABLE } from 'app/constants';
import { constructUrl } from 'app/navigation/util';
import { MOVIE_ROUTE } from 'app/navigation/routes';
import { formatRuntime } from 'app/util';
import { asyncOperation } from 'app/redux/util';
import { deleteWatchlistMovie } from 'app/http';
import { deleteWatchlistMovieAction } from 'app/redux/user/actions';
import imageNotFound from 'app/images/image_not_found.png';
import type {
  DeleteWatchlistMovieAction,
  UserMovie,
} from 'app/redux/user/flow';

const ImageContainer = styled.div`
  position: relative;
  cursor: pointer;
`;

const Image = styled.img`
  opacity: ${props => (props.hovered ? '0.6' : '1')};
  transition: opacity 0.25s;
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
  isLastMovie: boolean,
  removeWatchlistMovie: string => DeleteWatchlistMovieAction,
};

const WatchlistMovie = ({
  ordinal,
  movie,
  isLastMovie,
  removeWatchlistMovie,
}: Props) => {
  const [hovered, setHovered] = React.useState(false);
  const onImageMouseEnter = React.useCallback(() => setHovered(true), []);
  const onImageMouseLeave = React.useCallback(() => setHovered(false), []);

  const onImageClick = React.useCallback(
    () =>
      asyncOperation(() =>
        deleteWatchlistMovie(movie.id).then(() =>
          removeWatchlistMovie(movie.id),
        ),
      ),
    [removeWatchlistMovie, movie.id],
  );

  const { id, name, year, genres, imageUrl, runtime, rating } = movie;
  const image = imageUrl !== NOT_AVAILABLE ? imageUrl : imageNotFound;

  return (
    <React.Fragment>
      <div className="d-flex">
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
            <h5 className="d-inline">{`${ordinal}.`}</h5>
            <h5 className="d-inline">
              <a
                className="ml-1"
                href={constructUrl(MOVIE_ROUTE.path, [], { id })}
              >
                {name}
              </a>
            </h5>
          </div>
          <div>{`Year: ${year}`}</div>
          <div>{`Genre: ${genres.join(', ')}`}</div>
          <div>
            {`Runtime: ${runtime ? formatRuntime(runtime) : NOT_AVAILABLE}`}
          </div>
          <div>
            <span>{`Rating: ${rating || NOT_AVAILABLE}`}</span>
            {rating && <i className="fa fa-star text-warning ml-1" />}
          </div>
        </div>
      </div>
      {!isLastMovie && <hr />}
    </React.Fragment>
  );
};

const mapDispatchToProps = {
  removeWatchlistMovie: deleteWatchlistMovieAction,
};

export default connect(
  null,
  mapDispatchToProps,
)(WatchlistMovie);
