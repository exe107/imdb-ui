// @flow
import * as React from 'react';
import _range from 'lodash/range';
import MovieResult from 'app/pages/movies-search/MovieResult';
import type { Movie } from 'app/movies/flow';

type Props = {
  children: React.Node,
  movies: Movie[],
};

const MoviesSearchResults = ({ children, movies }: Props): React.Node => {
  const [moviesPerPage, setMoviesPerPage] = React.useState(50);
  const [pageIndex, setPageIndex] = React.useState(0);
  const moviesPerPageInputRef = React.useRef<Object>();

  let firstMovieOrdinal = pageIndex * moviesPerPage + 1;

  const lastMovieOrdinal = Math.min(
    firstMovieOrdinal + moviesPerPage - 1,
    movies.length,
  );

  if (firstMovieOrdinal > lastMovieOrdinal) {
    firstMovieOrdinal = Math.max(1, lastMovieOrdinal - (moviesPerPage - 1));
  }

  const onSetMoviesPerPage = React.useCallback(() => {
    const newMoviesPerPage = Number(moviesPerPageInputRef.current.value);
    setPageIndex(0);
    setMoviesPerPage(newMoviesPerPage);
  }, []);

  const onNextClick = React.useCallback(() => setPageIndex(pageIndex + 1), [
    pageIndex,
  ]);

  const onPreviousClick = React.useCallback(() => setPageIndex(pageIndex - 1), [
    pageIndex,
  ]);

  const isFirstPage = pageIndex === 0;
  const isLastPage = lastMovieOrdinal === movies.length;

  return movies.length > 0 ? (
    <div className="mt-5">
      <div className="form-inline">
        <h1>Search results:</h1>
        <div className="ml-auto mr-3">{children}</div>
        <span>Results per page:</span>
        <input
          className="ml-3 form-control"
          type="number"
          defaultValue={moviesPerPage}
          ref={moviesPerPageInputRef}
        />
        <button className="btn btn-primary ml-3" onClick={onSetMoviesPerPage}>
          Set
        </button>
      </div>
      {_range(firstMovieOrdinal, lastMovieOrdinal + 1).map(ordinal => {
        const movie = movies[ordinal - 1];
        const { id, name } = movie;

        return (
          <MovieResult key={`${id}-${name}`} ordinal={ordinal} movie={movie} />
        );
      })}
      <h5>
        {`Showing ${firstMovieOrdinal} to ${lastMovieOrdinal} out of total ${movies.length} results`}
      </h5>
      <div className="mb-5">
        {!isFirstPage && (
          <button className="mr-5 btn btn-secondary" onClick={onPreviousClick}>
            Previous
          </button>
        )}
        {!isLastPage && (
          <button className="btn btn-primary" onClick={onNextClick}>
            Next
          </button>
        )}
      </div>
    </div>
  ) : (
    <h1 className="text-center">No movies match your search</h1>
  );
};

export default MoviesSearchResults;
