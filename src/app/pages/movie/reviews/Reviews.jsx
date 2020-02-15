// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import ReactQuill from 'react-quill';
import styled from 'styled-components';
import _get from 'lodash/get';
import { asyncOperation } from 'app/redux/util';
import { addReview, deleteReview } from 'app/http';
import { savePendingReview } from 'app/redux/user/actions';
import { addError } from 'app/redux/errors/actions';
import { PanelButton } from 'app/styles';
import Review from 'app/pages/movie/reviews/Review';
import type {
  ApprovedReview,
  PendingReview,
} from 'app/pages/movie/reviews/flow';
import type {
  SavePendingReviewAction,
  User,
  UserMovie,
} from 'app/redux/user/flow';
import type { AddErrorAction, ApiError } from 'app/redux/errors/flow';

const ReviewEditor = styled(ReactQuill)`
  width: 100%;

  .ql-container {
    height: 200px;
  }
`;

const ReviewsPanelButton = styled(PanelButton)`
  max-width: 200px;
`;

type Props = {
  user: User,
  movie: UserMovie,
  reviews: ApprovedReview[],
  savePendingReview: PendingReview => SavePendingReviewAction,
  addError: ApiError => AddErrorAction,
};

const REVIEWS_NAME = 'reviews';
const REVIEWS_ID = `#${REVIEWS_NAME}`;

const Reviews = ({
  user,
  movie,
  reviews: initialReviews,
  savePendingReview,
  addError,
}: Props) => {
  const [reviewText, setReviewText] = React.useState('');
  const [reviews, setReviews] = React.useState(initialReviews);
  const [expanded, setExpanded] = React.useState(false);
  const [showEditor, setShowEditor] = React.useState(false);

  const onPanelClick = React.useCallback(() => setExpanded(!expanded), [
    expanded,
  ]);

  const toggleEditor = React.useCallback(() => setShowEditor(!showEditor), [
    showEditor,
  ]);

  const onEditorChange = React.useCallback(
    content => setReviewText(content),
    [],
  );

  const onPostReview = React.useCallback(() => {
    if (!reviewText) {
      return;
    }

    const review = {
      movie,
      review: reviewText,
    };

    asyncOperation(() =>
      addReview(review)
        .then((pendingReview: PendingReview) => {
          setReviewText('');
          toggleEditor();
          savePendingReview(pendingReview);
        })
        .catch(addError),
    );
  }, [movie, reviewText, toggleEditor, savePendingReview, addError]);

  const deleteReviewHandlerCreator = React.useCallback(
    (reviewId: number) => () => {
      asyncOperation(() =>
        deleteReview(reviewId)
          .then(() => {
            const newReviews = reviews.filter(review => review.id !== reviewId);

            setReviews(newReviews);

            if (newReviews.length === 0) {
              setExpanded(false);
            }
          })
          .catch(addError),
      );
    },
    [reviews, addError],
  );

  const iconClassName = expanded ? 'fa-minus' : 'fa-plus';
  const hasReviews = reviews.length > 0;

  return (
    <div>
      {hasReviews && (
        <React.Fragment>
          <h5>
            <ReviewsPanelButton
              className="list-group-item list-group-item-action bg-light"
              data-toggle="collapse"
              data-target={REVIEWS_ID}
              onClick={onPanelClick}
            >
              <i className={`fa ${iconClassName} mr-2`} />
              <span>Reviews</span>
              {reviews.length > 0 && (
                <span className="ml-2">({reviews.length})</span>
              )}
            </ReviewsPanelButton>
          </h5>
          <div className="collapse" id={REVIEWS_NAME}>
            {reviews.map(review => (
              <Review
                key={review.id}
                review={review}
                username={_get(user, 'username')}
                onDeleteReview={deleteReviewHandlerCreator(review.id)}
              />
            ))}
          </div>
        </React.Fragment>
      )}
      {user && (
        <div className={hasReviews ? 'mt-5' : 'mt-0'}>
          {showEditor ? (
            <React.Fragment>
              <ReviewEditor value={reviewText} onChange={onEditorChange} />
              <div className="my-3">
                <button className="btn btn-primary mr-3" onClick={onPostReview}>
                  Post
                </button>
                <button className="btn btn-danger" onClick={toggleEditor}>
                  Cancel
                </button>
              </div>
              <span className="text-muted">
                * Your review will need to be assessed by one of our
                administrators. <br /> After posting it, you can view it in the
                <i> Pending reviews</i> section
              </span>
            </React.Fragment>
          ) : (
            <button className="btn btn-primary" onClick={toggleEditor}>
              Write a review
            </button>
          )}
        </div>
      )}
    </div>
  );
};

const mapDispatchToProps = {
  addError,
  savePendingReview,
};

export default connect(
  null,
  mapDispatchToProps,
)(Reviews);
