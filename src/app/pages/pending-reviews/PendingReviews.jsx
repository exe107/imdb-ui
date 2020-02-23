// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { goBack } from 'app/navigation/util';
import { asyncOperation } from 'app/redux/util';
import { approveReview, rejectReview } from 'app/http';
import { getUser } from 'app/redux/user/selectors';
import { deletePendingReviewAction } from 'app/redux/user/actions';
import PendingReview from 'app/pages/pending-reviews/PendingReview';
import type {
  DeletePendingReviewAction,
  User,
  UserMovieIdentifier,
} from 'app/redux/user/flow';
import type { ExistingReview } from 'app/pages/movie/reviews/flow';

type Props = {
  user: User,
  deletePendingReview: UserMovieIdentifier => DeletePendingReviewAction,
};

const PendingReviews = ({ user, deletePendingReview }: Props) => {
  const createApproveHandler = React.useCallback(
    (identifier: UserMovieIdentifier) => () =>
      asyncOperation(() =>
        approveReview(identifier).then(() => deletePendingReview(identifier)),
      ),
    [deletePendingReview],
  );

  const createRejectHandler = React.useCallback(
    (identifier: UserMovieIdentifier) => () =>
      asyncOperation(() =>
        rejectReview(identifier).then(() => deletePendingReview(identifier)),
      ),
    [deletePendingReview],
  );

  if (!user) {
    goBack();
    return null;
  }

  const { admin, pendingReviews } = user;

  return pendingReviews.length > 0 ? (
    <React.Fragment>
      <h1>Your pending reviews</h1>
      <hr />
      {pendingReviews.map((review: ExistingReview) => {
        const { username, movieId } = review;
        const identifier = { username, movieId };

        return (
          <PendingReview
            key={`${username}-${movieId}`}
            review={review}
            isAdmin={admin}
            onApprove={createApproveHandler(identifier)}
            onReject={createRejectHandler(identifier)}
          />
        );
      })}
    </React.Fragment>
  ) : (
    <h1 className="text-center">You have no pending reviews</h1>
  );
};

const mapStateToProps = state => ({
  user: getUser(state),
});

const mapDispatchToProps = {
  deletePendingReview: deletePendingReviewAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PendingReviews);
