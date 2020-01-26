// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import {
  addMovieToWatchlistAction,
  removeWatchlistMovieAction,
} from 'app/redux/user/actions';
import type {
  AddWatchlistMovieAction,
  RemoveWatchlistMovieAction,
  UserMovie,
} from 'app/redux/user/flow';

type Props = {
  movie: UserMovie,
  watchlist: UserMovie[],
  addMovieToWatchlist: UserMovie => AddWatchlistMovieAction,
  removeWatchlistMovie: string => RemoveWatchlistMovieAction,
};

const WatchlistButton = ({
  movie,
  watchlist,
  addMovieToWatchlist,
  removeWatchlistMovie,
}: Props) => {
  const isMovieInWatchlist = React.useMemo(
    () => !!watchlist.find(watchlistMovie => movie.id === watchlistMovie.id),
    [watchlist, movie],
  );

  const onButtonClick = React.useCallback(() => {
    if (isMovieInWatchlist) {
      removeWatchlistMovie(movie.id);
    } else {
      addMovieToWatchlist(movie);
    }
  }, [isMovieInWatchlist, movie, removeWatchlistMovie, addMovieToWatchlist]);

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
  addMovieToWatchlist: addMovieToWatchlistAction,
  removeWatchlistMovie: removeWatchlistMovieAction,
};

export default connect(
  null,
  mapDispatchToProps,
)(WatchlistButton);
