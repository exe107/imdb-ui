// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import _get from 'lodash/get';
import { canWriteReview } from 'app/pages/movie/reviews/util';
import { asyncOperation } from 'app/redux/util';
import { deleteReview } from 'app/http';
import { savePendingReviewAction } from 'app/redux/user/actions';
import { addErrorAction } from 'app/redux/errors/actions';
import { PanelButton } from 'app/styles';
import ExistingReview from 'app/pages/movie/reviews/ExistingReview';
import NewReview from 'app/pages/movie/reviews/NewReview';
import type { ExistingReview as ExistingReviewType } from 'app/pages/movie/reviews/flow';
import type { User, UserMovie } from 'app/redux/user/flow';
import type { AddErrorAction, ApiError } from 'app/redux/errors/flow';

type Props = {
  user: User,
  movie: UserMovie,
  reviews: ExistingReviewType[],
  addError: ApiError => AddErrorAction,
};

const REVIEWS_NAME = 'reviews';
const REVIEWS_ID = `#${REVIEWS_NAME}`;

const Reviews = ({ user, movie, reviews: initialReviews, addError }: Props) => {
  const [reviews, setReviews] = React.useState(initialReviews);
  const [expanded, setExpanded] = React.useState(false);
  const [showEditor, setShowEditor] = React.useState(false);

  const onPanelClick = React.useCallback(() => setExpanded(!expanded), [
    expanded,
  ]);

  const toggleEditor = React.useCallback(() => setShowEditor(!showEditor), [
    showEditor,
  ]);

  const writeReview = canWriteReview(user, movie.id, reviews);
  const username = _get(user, 'username');

  const onDeleteReview = React.useCallback(
    () =>
      asyncOperation(() =>
        deleteReview(movie.id)
          .then(() => {
            const newReviews = reviews.filter(
              review => review.username !== username,
            );

            setReviews(newReviews);

            if (newReviews.length === 0) {
              setExpanded(false);
            }
          })
          .catch(addError),
      ),
    [movie.id, username, reviews, addError],
  );

  const iconClassName = expanded ? 'fa-minus' : 'fa-plus';
  const hasReviews = reviews.length > 0;

  return (
    <div>
      {hasReviews ? (
        <React.Fragment>
          <div>
            <PanelButton
              className="list-group-item list-group-item-action bg-light"
              data-toggle="collapse"
              data-target={REVIEWS_ID}
              onClick={onPanelClick}
            >
              <i className={`fa ${iconClassName} mr-2`} />
              <span>Show</span>
              {reviews.length > 0 && (
                <span className="ml-2">{`(${reviews.length})`}</span>
              )}
            </PanelButton>
          </div>
          <div className="collapse" id={REVIEWS_NAME}>
            {reviews.map(review => (
              <ExistingReview
                key={`${review.username}-${review.movieId}`}
                review={review}
                username={username}
                onDeleteReview={onDeleteReview}
              />
            ))}
          </div>
        </React.Fragment>
      ) : (
        <div>This movie has not been reviewed yet</div>
      )}
      {writeReview && (
        <div className="mt-5">
          {showEditor ? (
            <NewReview
              movie={movie}
              user={user}
              toggleEditor={toggleEditor}
              setReviews={setReviews}
            />
          ) : (
            <button
              type="button"
              className="btn btn-primary"
              onClick={toggleEditor}
            >
              Write a review
            </button>
          )}
        </div>
      )}
    </div>
  );
};

const mapDispatchToProps = {
  addError: addErrorAction,
  savePendingReview: savePendingReviewAction,
};

export default connect(
  null,
  mapDispatchToProps,
)(Reviews);
