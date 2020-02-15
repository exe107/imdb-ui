// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { goBack } from 'app/navigation/util';
import { getPendingReviews } from 'app/redux/user/selectors';
import PendingReview from 'app/pages/pending-reviews/PendingReview';
import type { PendingReview as PendingReviewType } from 'app/pages/movie/reviews/flow';

type Props = {
  reviews: ?(PendingReviewType[]),
};

const PendingReviews = ({ reviews }: Props) => {
  if (!reviews) {
    goBack();
    return null;
  }

  return reviews.length > 0 ? (
    <React.Fragment>
      <h1>Your pending reviews</h1>
      <hr />
      {reviews.map(review => (
        <PendingReview key={review.id} review={review} />
      ))}
    </React.Fragment>
  ) : (
    <h1 className="text-center">You have no pending reviews</h1>
  );
};

const mapStateToProps = state => ({
  reviews: getPendingReviews(state),
});

export default connect(mapStateToProps)(PendingReviews);
