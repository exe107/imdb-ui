// @flow
import 'font-awesome/css/font-awesome.min.css';

import * as React from 'react';
import { history } from 'redux-config/history';
import { MOVIE_ROUTE } from 'navigation/routes';
import { constructUrl } from 'navigation/util';

const Home = () => {
  const [movieTitle, setMovieTitle] = React.useState('');

  const onSearchClick = React.useCallback(() => {
    history.push(constructUrl(MOVIE_ROUTE.path, [], { title: movieTitle }));
  }, [movieTitle]);

  const onBlur = React.useCallback(
    event => setMovieTitle(event.target.value),
    [],
  );

  return (
    <div className="input-group">
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

export default Home;
