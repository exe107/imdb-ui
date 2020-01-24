// @flow
import * as React from 'react';
import { history } from 'app/redux/history';
import { MOVIE_ROUTE } from 'app/navigation/routes';
import { constructUrl } from 'app/navigation/util';

const SearchBar = () => {
  const [movieTitle, setMovieTitle] = React.useState('');

  const onSearchClick = React.useCallback(
    () =>
      history.push(constructUrl(MOVIE_ROUTE.path, [], { title: movieTitle })),
    [movieTitle],
  );

  const onBlur = React.useCallback(
    event => setMovieTitle(event.target.value),
    [],
  );

  return (
    <div className="input-group w-100">
      <div className="input-group-prepend">
        <button className="btn btn-secondary" onClick={onSearchClick}>
          <i className="fa fa-search" />
        </button>
      </div>
      <input
        className="form-control"
        placeholder="Search for a movie"
        onBlur={onBlur}
      />
    </div>
  );
};

export default SearchBar;