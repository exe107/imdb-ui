// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { goBack } from 'app/navigation/util';
import { ASCENDING, createNaturalOrderComparator, DESCENDING } from 'app/util';
import { getWatchlist } from 'app/redux/user/selectors';
import WatchlistMovie from 'app/pages/watchlist/WatchlistMovie';
import type { UserMovie } from 'app/redux/user/flow';

type Props = {
  watchlist: ?(UserMovie[]),
};

const Watchlist = ({ watchlist }: Props) => {
  const [sortKey, setSortKey] = React.useState('year');
  const [sortOrder, setSortOrder] = React.useState(DESCENDING);

  const SORT_CRITERIA = React.useMemo(
    () => [
      { key: 'year', name: 'Year' },
      { key: 'name', name: 'Name' },
      { key: 'runtime', name: 'Runtime' },
    ],
    [],
  );

  const SORT_ORDERS = React.useMemo(() => [ASCENDING, DESCENDING], []);

  const onSortKeyChange = React.useCallback(
    event => setSortKey(event.target.value),
    [],
  );

  const onSortOrderChange = React.useCallback(
    event => setSortOrder(event.target.value),
    [],
  );

  const comparator = React.useMemo(
    () => createNaturalOrderComparator(sortKey, sortOrder),
    [sortKey, sortOrder],
  );

  if (!watchlist) {
    goBack();
    return null;
  }

  const movies = [...watchlist].sort(comparator);

  return watchlist.length > 0 ? (
    <React.Fragment>
      <h1>Your watchlist</h1>
      <hr />
      <div className="form-inline">
        <span>Sort by:</span>
        <select
          className="form-control ml-1"
          value={sortKey}
          onChange={onSortKeyChange}
        >
          {SORT_CRITERIA.map(({ key, name }) => (
            <option key={key} value={key}>
              {name}
            </option>
          ))}
        </select>
        <select
          className="form-control ml-3"
          value={sortOrder}
          onChange={onSortOrderChange}
        >
          {SORT_ORDERS.map(key => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </div>
      {movies.map((movie: UserMovie, index: number) => (
        <WatchlistMovie key={movie.id} ordinal={index + 1} movie={movie} />
      ))}
    </React.Fragment>
  ) : (
    <h1 className="text-center">Your watchlist is empty</h1>
  );
};

const mapStateToProps = state => ({
  watchlist: getWatchlist(state),
});

export default connect(mapStateToProps)(Watchlist);
