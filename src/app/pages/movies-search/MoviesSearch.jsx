// @flow
import * as React from 'react';
import styled from 'styled-components';
import {
  findMoviesByYearAndGenre,
  runWikidataQuery,
} from 'app/api/sparql/wikidata';
import { extractMoviesQueryResults } from 'app/api/util';
import { asyncOperation } from 'app/redux/util';
import MoviesSearchResults from 'app/pages/movies-search/MoviesSearchResults';

const Form = styled.form`
  margin: 0 auto;

  @media only screen and (max-width: 950px) {
    margin: 0;
    flex-direction: column;
    align-items: start;
  }
`;

const Input = styled.input`
  width: 80px !important;
`;

const MoviesSearch = (): React.Node => {
  const [genre, setGenre] = React.useState();
  const [yearFrom, setYearFrom] = React.useState();
  const [yearTo, setYearTo] = React.useState();
  const [movies, setMovies] = React.useState();

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

  const onSearchClick = React.useCallback(() => {
    setMovies(null);

    asyncOperation(() =>
      runWikidataQuery(findMoviesByYearAndGenre(genre, yearFrom, yearTo))
        .then(response => setMovies(extractMoviesQueryResults(response)))
        .catch(console.log),
    );
  }, [genre, yearFrom, yearTo]);

  return (
    <React.Fragment>
      <h1 className="text-center mb-5">Enter your search parameters below</h1>
      <div className="d-flex">
        <Form className="form-inline">
          <div className="form-group mr-5 mb-3">
            <label htmlFor="genre">Genre:</label>
            <select
              className="form-control ml-1"
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
          <div className="form-group mr-5 mb-3">
            <label htmlFor="yearFrom">From (year):</label>
            <Input
              className="form-control ml-1"
              id="yearFrom"
              type="number"
              onBlur={event => setYearFrom(event.target.value || undefined)}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="yearTo">To (year):</label>
            <Input
              className="form-control ml-1"
              id="yearTo"
              type="number"
              onBlur={event => setYearTo(event.target.value || undefined)}
            />
          </div>
          <button
            className="btn btn-primary ml-3 mb-3"
            type="button"
            onClick={onSearchClick}
          >
            Search
          </button>
        </Form>
      </div>
      {movies && <MoviesSearchResults movies={movies} />}
    </React.Fragment>
  );
};

export default MoviesSearch;
