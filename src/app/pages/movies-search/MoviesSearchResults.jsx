// @flow
import * as React from 'react';
import styled from 'styled-components';
import _isEmpty from 'lodash/isEmpty';
import _range from 'lodash/range';
import { DESCENDING } from 'app/constants';
import { createNaturalOrderComparator } from 'app/util';
import MovieResult from 'app/pages/movies-search/MovieResult';
import SortingSelect from 'app/components/sorting/SortingSelect';
import type { Movie } from 'app/api/sparql/flow';

const Input = styled.input`
  width: ${props => (props.width ? `${props.width}px` : 'auto')} !important;
`;

type Props = {
  movies: Movie[],
};

const MoviesSearchResults = ({ movies }: Props): React.Node => {
  const [filterText, setFilterText] = React.useState('');
  const [sortKey, setSortKey] = React.useState('year');
  const [sortOrder, setSortOrder] = React.useState(DESCENDING);
  const [moviesPerPage, setMoviesPerPage] = React.useState(50);
  const [pageIndex, setPageIndex] = React.useState(0);
  const moviesPerPageInputRef = React.useRef<Object>();

  const onFilterTextChange = React.useCallback(
    event => setFilterText(event.target.value),
    [],
  );

  const sortingOptions = React.useMemo(
    () => [{ key: 'year', name: 'Year' }, { key: 'name', name: 'Name' }],
    [],
  );

  const onSortKeyChange = React.useCallback(
    event => setSortKey(event.target.value),
    [],
  );

  const comparator = React.useMemo(
    () => createNaturalOrderComparator(sortKey, sortOrder),
    [sortKey, sortOrder],
  );

  const filteredMovies = React.useMemo(
    () =>
      filterText
        ? movies
            .filter(movie => {
              const lowerCaseMovieName = movie.name.toLowerCase();
              return lowerCaseMovieName.includes(filterText.toLowerCase());
            })
            .sort(comparator)
        : movies.sort(comparator),
    [filterText, movies, comparator],
  );

  let firstMovieOrdinal = pageIndex * moviesPerPage + 1;

  const lastMovieOrdinal = Math.min(
    firstMovieOrdinal + moviesPerPage - 1,
    filteredMovies.length,
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
  const isLastPage = lastMovieOrdinal === filteredMovies.length;

  return (
    <React.Fragment>
      <hr />
      {!_isEmpty(movies) ? (
        <React.Fragment>
          <div className="form-inline">
            <div className="form-group mr-5">
              <label htmlFor="filter">Filter by name:</label>
              <Input
                id="filter"
                className="form-control ml-1"
                onChange={onFilterTextChange}
              />
            </div>
            <SortingSelect
              sortingOptions={sortingOptions}
              sortKey={sortKey}
              sortOrder={sortOrder}
              onSortKeyChange={onSortKeyChange}
              setSortOrder={setSortOrder}
            />
            <div className="form-group ml-5">
              <label htmlFor="resultsPerPage">Results per page:</label>
              <Input
                id="resultsPerPage"
                className="form-control ml-1"
                type="number"
                width={80}
                defaultValue={moviesPerPage}
                ref={moviesPerPageInputRef}
              />
              <button
                type="button"
                className="btn btn-primary ml-3"
                onClick={onSetMoviesPerPage}
              >
                Set
              </button>
            </div>
          </div>
          <hr />
          {_isEmpty(filteredMovies) ? (
            <h2 className="text-center">{`There are no movies containing '${filterText}'`}</h2>
          ) : (
            <React.Fragment>
              <h4>Search results:</h4>
              {_range(firstMovieOrdinal, lastMovieOrdinal + 1).map(ordinal => {
                const movie = filteredMovies[ordinal - 1];
                const { id, name } = movie;

                return (
                  <MovieResult
                    key={`${id}-${name}`}
                    ordinal={ordinal}
                    movie={movie}
                  />
                );
              })}
              <h5>
                {`Showing ${firstMovieOrdinal} to ${lastMovieOrdinal} out of total ${filteredMovies.length} results`}
              </h5>
              <div className="mb-5">
                {!isFirstPage && (
                  <button
                    type="button"
                    className="mr-5 btn btn-secondary"
                    onClick={onPreviousClick}
                  >
                    Previous
                  </button>
                )}
                {!isLastPage && (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={onNextClick}
                  >
                    Next
                  </button>
                )}
              </div>
            </React.Fragment>
          )}
        </React.Fragment>
      ) : (
        <h2 className="text-center">No movies match your search</h2>
      )}
    </React.Fragment>
  );
};

export default MoviesSearchResults;
