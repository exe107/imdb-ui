// @flow
import * as React from 'react';
import _isEmpty from 'lodash/isEmpty';
import {
  findMoviesByYearAndGenre,
  runWikidataQuery,
} from 'app/api/sparql/wikidata';
import { DESCENDING } from 'app/constants';
import { createNaturalOrderComparator } from 'app/util';
import { extractMoviesQueryResults } from 'app/api/util';
import { asyncOperation } from 'app/redux/util';
import MoviesSearchResults from 'app/pages/movies-search/MoviesSearchResults';
import SortingSelect from 'app/components/sorting/SortingSelect';

const MoviesSearch = (): React.Node => {
  const [genre, setGenre] = React.useState();
  const [yearFrom, setYearFrom] = React.useState();
  const [yearTo, setYearTo] = React.useState();
  const [movies, setMovies] = React.useState([]);
  const [sortKey, setSortKey] = React.useState('year');
  const [sortOrder, setSortOrder] = React.useState(DESCENDING);

  const comparator = React.useMemo(
    () => createNaturalOrderComparator(sortKey, sortOrder),
    [sortKey, sortOrder],
  );

  const sortedMovies = React.useMemo(() => movies.sort(comparator), [
    movies,
    comparator,
  ]);

  const MOVIE_GENRES = React.useMemo(
    () => [
      { name: 'Comedy', keyword: 'comedy' },
      { name: 'Science Fiction', keyword: 'science fiction' },
      { name: 'Horror', keyword: 'horror' },
      { name: 'Romance', keyword: 'roman' },
      { name: 'Action', keyword: 'action' },
      { name: 'Thriller', keyword: 'thriller' },
      { name: 'Drama', keyword: 'drama' },
      { name: 'Mystery', keyword: 'mystery' },
      { name: 'Crime', keyword: 'crime' },
      { name: 'Animation', keyword: 'animat' },
      { name: 'Adventure', keyword: 'adventure' },
      { name: 'Fantasy', keyword: 'fantasy' },
      { name: 'Superhero', keyword: 'superhero' },
    ],
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

  const onSearchClick = React.useCallback(() => {
    setMovies([]);

    asyncOperation(() =>
      runWikidataQuery(findMoviesByYearAndGenre(genre, yearFrom, yearTo))
        .then(response => setMovies(extractMoviesQueryResults(response)))
        .catch(console.log),
    );
  }, [genre, yearFrom, yearTo]);

  return (
    <React.Fragment>
      <div className="d-flex">
        <form className="form-inline mx-auto">
          <div className="form-group mr-5">
            <label htmlFor="genre">Genre:</label>
            <select
              className="form-control ml-3"
              id="genre"
              defaultValue=""
              onChange={event => setGenre(event.target.value || undefined)}
            >
              <option value="">Choose a genre</option>
              {MOVIE_GENRES.map(({ name, keyword }) => (
                <option key={keyword} value={keyword}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group mr-5">
            <label htmlFor="yearFrom">From (year):</label>
            <input
              className="form-control ml-3"
              id="yearFrom"
              type="number"
              onBlur={event => setYearFrom(event.target.value || undefined)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="yearTo">To (year):</label>
            <input
              className="form-control ml-3"
              id="yearTo"
              type="number"
              onBlur={event => setYearTo(event.target.value || undefined)}
            />
          </div>
          <button
            className="btn btn-primary ml-3"
            type="button"
            onClick={onSearchClick}
          >
            Search
          </button>
        </form>
      </div>
      {!_isEmpty(movies) && (
        <MoviesSearchResults movies={sortedMovies}>
          <SortingSelect
            sortingOptions={sortingOptions}
            sortKey={sortKey}
            sortOrder={sortOrder}
            onSortKeyChange={onSortKeyChange}
            setSortOrder={setSortOrder}
          />
        </MoviesSearchResults>
      )}
    </React.Fragment>
  );
};

export default MoviesSearch;
