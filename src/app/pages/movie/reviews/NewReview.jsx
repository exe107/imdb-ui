// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import { asyncOperation } from 'app/redux/util';
import { addReview } from 'app/http';
import { addErrorAction } from 'app/redux/errors/actions';
import { savePendingReviewAction } from 'app/redux/user/actions';
import type {
  SavePendingReviewAction,
  User,
  UserMovie,
} from 'app/redux/user/flow';
import type { AddErrorAction, ApiError } from 'app/redux/errors/flow';
import type { ExistingReview } from 'app/pages/movie/reviews/flow';

const ReviewEditor = styled(ReactQuill)`
  width: 100%;

  .ql-container {
    height: 200px;
  }
`;

type Props = {
  movie: UserMovie,
  user: User,
  toggleEditor: Function,
  setReviews: Function,
  savePendingReview: ExistingReview => SavePendingReviewAction,
  addError: ApiError => AddErrorAction,
};

const NewReview = ({
  movie,
  user,
  toggleEditor,
  setReviews,
  savePendingReview,
  addError,
}: Props) => {
  const [reviewText, setReviewText] = React.useState('');

  const onEditorChange = React.useCallback(
    content => setReviewText(content),
    [],
  );

  const onPostReview = React.useCallback(() => {
    if (!reviewText) {
      return;
    }

    const newReview = {
      movie,
      review: reviewText,
    };

    asyncOperation(() =>
      addReview(newReview)
        .then((review: ExistingReview) => {
          setReviewText('');
          toggleEditor();

          if (user.admin) {
            setReviews(reviews => [...reviews, review]);
          } else {
            savePendingReview(review);
          }
        })
        .catch(addError),
    );
  }, [
    user,
    movie,
    reviewText,
    toggleEditor,
    setReviews,
    savePendingReview,
    addError,
  ]);

  return (
    <React.Fragment>
      <ReviewEditor value={reviewText} onChange={onEditorChange} />
      <div className="my-3">
        <button
          type="button"
          className="btn btn-primary mr-3"
          onClick={onPostReview}
        >
          Post
        </button>
        <button type="button" className="btn btn-danger" onClick={toggleEditor}>
          Cancel
        </button>
      </div>
      <div className="text-muted">
        * Your review will need to be assessed by one of our administrators.
        <br />
        After posting it, you can view it in the
        <i> Pending reviews</i>
        section
      </div>
    </React.Fragment>
  );
};

const mapDispatchToProps = {
  addError: addErrorAction,
  savePendingReview: savePendingReviewAction,
};

export default connect(
  null,
  mapDispatchToProps,
)(NewReview);
