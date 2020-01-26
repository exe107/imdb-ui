// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import _range from 'lodash/range';
import { goBack } from 'app/navigation/util';
import {
  ASCENDING,
  DESCENDING,
  createDatesComparator,
  createNaturalOrderComparator,
} from 'app/util';
import { getMovieRatings } from 'app/redux/user/selectors';
import Rating from 'app/pages/ratings/Rating';
import type { UserMovieRating } from 'app/redux/user/flow';

type Props = {
  movieRatings: ?(UserMovieRating[]),
};

const Ratings = ({ movieRatings }: Props) => {
  const [ratingToFilterBy, setRatingToFilterBy] = React.useState(0);

  const SORT_CRITERIA = React.useMemo(() => {
    const sortCriteria = [
      { key: 'movie.year', name: 'Year' },
      { key: 'movie.name', name: 'Name' },
      { key: 'date', name: 'Date rated on' },
    ];

    if (ratingToFilterBy === 0) {
      sortCriteria.push({ key: 'rating', name: 'Rating' });
    }

    return sortCriteria;
  }, [ratingToFilterBy]);

  const SORT_ORDERS = React.useMemo(() => [ASCENDING, DESCENDING], []);

  const [sortKey, setSortKey] = React.useState('date');
  const [sortOrder, setSortOrder] = React.useState(DESCENDING);

  const onRatingFilterSelect = React.useCallback(
    event => {
      const selectedRating = Number(event.target.value);
      if (selectedRating > 0 && sortKey === 'rating') {
        setSortKey('date');
      }

      setRatingToFilterBy(selectedRating);
    },
    [sortKey],
  );

  const onSortKeyChange = React.useCallback(
    event => setSortKey(event.target.value),
    [],
  );

  const onSortOrderChange = React.useCallback(
    event => setSortOrder(event.target.value),
    [],
  );

  const comparator = React.useMemo(() => {
    const comparatorCreator =
      sortKey === 'date' ? createDatesComparator : createNaturalOrderComparator;

    return comparatorCreator(sortKey, sortOrder);
  }, [sortKey, sortOrder]);

  if (!movieRatings) {
    goBack();
    return null;
  }

  const filteredRatings =
    ratingToFilterBy > 0
      ? movieRatings.filter(
          ({ rating }: UserMovieRating) => rating === ratingToFilterBy,
        )
      : movieRatings;

  const ratings = filteredRatings.sort(comparator);

  return movieRatings.length > 0 ? (
    <React.Fragment>
      <h1>Your ratings</h1>
      <hr />
      <div className="form-inline justify-content-around">
        <div>
          <span>Filter by:</span>
          <select
            className="form-control ml-1"
            value={ratingToFilterBy}
            onChange={onRatingFilterSelect}
          >
            {_range(0, 11).map(star => (
              <option key={star} value={star}>
                {star > 0 ? `${star} star rated movies` : 'None'}
              </option>
            ))}
          </select>
        </div>
        <div>
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
      </div>
      {ratings.length > 0 ? (
        ratings.map((movieRating: UserMovieRating, index: number) => (
          <Rating
            key={movieRating.movie.id}
            ordinal={index + 1}
            movieRating={movieRating}
          />
        ))
      ) : (
        <h3 className="text-center mt-5">
          You have no {ratingToFilterBy} star rated movies
        </h3>
      )}
    </React.Fragment>
  ) : (
    <h1 className="text-center">Your ratings list is empty</h1>
  );
};

const mapStateToProps = state => ({
  movieRatings: getMovieRatings(state),
});

export default connect(mapStateToProps)(Ratings);
