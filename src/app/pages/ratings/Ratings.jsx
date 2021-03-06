// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import _range from 'lodash/range';
import { goBack } from 'app/navigation/util';
import { createDatesComparator, createNaturalOrderComparator } from 'app/util';
import { DESCENDING } from 'app/constants';
import { getMovieRatings } from 'app/redux/user/selectors';
import SortingSelect from 'app/components/sorting/SortingSelect';
import Rating from 'app/pages/ratings/Rating';
import type { UserMovieRating } from 'app/redux/user/flow';

type Props = {
  movieRatings: ?(UserMovieRating[]),
};

const Ratings = ({ movieRatings }: Props) => {
  const [ratingToFilterBy, setRatingToFilterBy] = React.useState(0);

  const sortingOptions = React.useMemo(() => {
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

  const comparator = React.useMemo(() => {
    const comparatorCreator =
      sortKey === 'date' ? createDatesComparator : createNaturalOrderComparator;

    return comparatorCreator(sortKey, sortOrder);
  }, [sortKey, sortOrder]);

  if (!movieRatings) {
    goBack();
    return null;
  }

  let filteredRatings;
  if (ratingToFilterBy > 0) {
    filteredRatings = movieRatings.filter(
      ({ rating }: UserMovieRating) => rating === ratingToFilterBy,
    );
  } else {
    filteredRatings = [...movieRatings];
  }

  const ratings = filteredRatings.sort(comparator);

  return movieRatings.length > 0 ? (
    <React.Fragment>
      <h2>Your ratings</h2>
      <hr />
      <div className="form-inline">
        <div className="mr-5">
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
        <SortingSelect
          sortingOptions={sortingOptions}
          sortKey={sortKey}
          sortOrder={sortOrder}
          onSortKeyChange={onSortKeyChange}
          setSortOrder={setSortOrder}
        />
      </div>
      <hr />
      {ratings.length > 0 ? (
        ratings.map((movieRating: UserMovieRating, index: number) => {
          const isLastMovie = index === ratings.length - 1;

          return (
            <Rating
              key={movieRating.movie.id}
              ordinal={index + 1}
              movieRating={movieRating}
              isLastMovie={isLastMovie}
            />
          );
        })
      ) : (
        <h3 className="text-center mt-5">
          {`You have no ${ratingToFilterBy} star rated movies`}
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
