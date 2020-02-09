// @flow
import * as React from 'react';
import { withRouter } from 'react-router-dom';
import _uniqBy from 'lodash/uniqBy';
import { asyncOperation } from 'app/redux/util';
import { searchMovie } from 'app/api/omdb';
import MovieResult from 'app/pages/movie-search/MovieResult';
import type { BaseMovieDetails, MovieSearchResponse } from 'app/api/omdb/flow';

type Props = {
  location: Object,
};

const MovieSearchResults = ({ location }: Props) => {
  const [
    searchResult,
    setSearchResult,
  ] = React.useState<?MovieSearchResponse>();

  const [fetchingFinished, setFetchingFinished] = React.useState(false);

  React.useEffect(() => {
    asyncOperation(() =>
      searchMovie(location.search)
        .then(setSearchResult)
        .catch(console.log)
        .then(() => setFetchingFinished(true)),
    );

    return () => {
      setFetchingFinished(false);
      setSearchResult(null);
    };
  }, [location.search]);

  if (!fetchingFinished) {
    return null;
  }

  if (!searchResult) {
    return <h1 className="alert alert-danger">Something went wrong</h1>;
  }

  const { Response, Error, Search } = searchResult;

  if (Response !== 'True') {
    return <h1 className="alert alert-danger">{Error}</h1>;
  }

  const searchResults = Search.filter(
    (result: BaseMovieDetails) => result.Type === 'movie',
  );
  // OMDb sometimes returns duplicates for some reason
  const uniqueSearchResults = _uniqBy(searchResults, 'imdbID');

  return uniqueSearchResults.length > 0 ? (
    <React.Fragment>
      <h1>Search results:</h1>
      <hr />
      {uniqueSearchResults.map((result: BaseMovieDetails, index: number) => (
        <MovieResult key={result.imdbID} movie={result} ordinal={index + 1} />
      ))}
    </React.Fragment>
  ) : (
    <h1 className="text-center">No movies found. Please refine your search</h1>
  );
};

export default withRouter(MovieSearchResults);
