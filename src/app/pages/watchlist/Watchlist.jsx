// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { goBack } from 'app/navigation/util';
import { createNaturalOrderComparator, DESCENDING } from 'app/util';
import { getWatchlist } from 'app/redux/user/selectors';
import SortingSelect from 'app/components/sorting/SortingSelect';
import WatchlistMovie from 'app/pages/watchlist/WatchlistMovie';
import type { UserMovie } from 'app/redux/user/flow';

type Props = {
  watchlist: ?(UserMovie[]),
};

const Watchlist = ({ watchlist }: Props) => {
  const [sortKey, setSortKey] = React.useState('year');
  const [sortOrder, setSortOrder] = React.useState(DESCENDING);

  const sortingOptions = React.useMemo(
    () => [
      { key: 'year', name: 'Year' },
      { key: 'name', name: 'Name' },
      { key: 'runtime', name: 'Runtime' },
    ],
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
        <SortingSelect
          sortingOptions={sortingOptions}
          sortKey={sortKey}
          sortOrder={sortOrder}
          onSortKeyChange={onSortKeyChange}
          setSortOrder={setSortOrder}
        />
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
