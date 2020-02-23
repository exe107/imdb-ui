// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { asyncOperation } from 'app/redux/util';
import { addWatchlistMovie, deleteWatchlistMovie } from 'app/http';
import {
  deleteWatchlistMovieAction,
  saveWatchlistMovieAction,
} from 'app/redux/user/actions';
import type {
  DeleteWatchlistMovieAction,
  SaveWatchlistMovieAction,
  UserMovie,
} from 'app/redux/user/flow';

type Props = {
  movie: UserMovie,
  watchlist: UserMovie[],
  saveWatchlistMovie: UserMovie => SaveWatchlistMovieAction,
  removeWatchlistMovie: string => DeleteWatchlistMovieAction,
};

const WatchlistButton = ({
  movie,
  watchlist,
  saveWatchlistMovie,
  removeWatchlistMovie,
}: Props) => {
  const isMovieInWatchlist = React.useMemo(
    () => watchlist.find(watchlistMovie => movie.id === watchlistMovie.id),
    [watchlist, movie],
  );

  const onButtonClick = React.useCallback(() => {
    asyncOperation(() =>
      isMovieInWatchlist
        ? deleteWatchlistMovie(movie.id).then(() =>
            removeWatchlistMovie(movie.id),
          )
        : addWatchlistMovie(movie).then(() => saveWatchlistMovie(movie)),
    );
  }, [isMovieInWatchlist, movie, saveWatchlistMovie, removeWatchlistMovie]);

  const buttonLabel = isMovieInWatchlist
    ? 'Remove movie from watchlist'
    : 'Add movie to watchlist';

  const buttonClassname = isMovieInWatchlist ? 'btn-danger' : 'btn-primary';
  const iconClassName = isMovieInWatchlist ? 'fa-minus' : 'fa-plus';

  return (
    <button
      className={`btn ${buttonClassname} text-white d-block mx-auto mt-4`}
      onClick={onButtonClick}
    >
      <i className={`fa ${iconClassName} mr-2`} />
      <span>{buttonLabel}</span>
    </button>
  );
};

const mapDispatchToProps = {
  saveWatchlistMovie: saveWatchlistMovieAction,
  removeWatchlistMovie: deleteWatchlistMovieAction,
};

export default connect(
  null,
  mapDispatchToProps,
)(WatchlistButton);
