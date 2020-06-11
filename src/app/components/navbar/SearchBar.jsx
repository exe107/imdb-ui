// @flow
import * as React from 'react';
import { MOVIE_SEARCH_RESULTS_ROUTE } from 'app/navigation/routes';
import { constructUrl, redirect } from 'app/navigation/util';

const SearchBar = () => {
  const [movieTitle, setMovieTitle] = React.useState('');

  const onSearch = React.useCallback(
    () =>
      redirect(
        constructUrl(MOVIE_SEARCH_RESULTS_ROUTE.path, [], {
          search: movieTitle,
        }),
      ),
    [movieTitle],
  );

  const onKeyPress = React.useCallback(
    event => {
      if (event.key === 'Enter') {
        onSearch();
      }
    },
    [onSearch],
  );

  const onChange = React.useCallback(
    event => setMovieTitle(event.target.value),
    [],
  );

  return (
    <div className="input-group w-100">
      <div className="input-group-prepend">
        <button type="button" className="btn btn-secondary" onClick={onSearch}>
          <i className="fa fa-search" />
        </button>
      </div>
      <input
        className="form-control"
        placeholder="Search for a movie"
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
    </div>
  );
};

export default SearchBar;
