// @flow
import * as React from 'react';
import ReactHtmlParser from 'react-html-parser';
import moment from 'moment';
import { ClickableElement, ReviewHeading } from 'app/styles';
import type { ExistingReview as ExistingReviewType } from 'app/pages/movie/reviews/flow';

type Props = {
  review: ExistingReviewType,
  username: ?string,
  onDeleteReview: Function,
};

const ExistingReview = ({ review, username, onDeleteReview }: Props) => {
  const { username: reviewUsername, review: reviewText, date } = review;
  const isUserReview = username === reviewUsername;
  const usernameLabel = isUserReview ? 'You' : reviewUsername;
  const formattedDate = moment(date).format('DD MMMM YYYY HH:mm');

  return (
    <div className="mt-5 border border-info rounded">
      <ReviewHeading className="d-flex justify-content-between align-items-center border-bottom border-info p-3">
        <span>
          <b>{usernameLabel}</b> wrote on {formattedDate}
        </span>
        {isUserReview && (
          <ClickableElement
            className="fa fa-times"
            data-toggle="tooltip"
            title="Delete review"
            onClick={onDeleteReview}
          />
        )}
      </ReviewHeading>
      <div className="p-3">{ReactHtmlParser(reviewText)}</div>
    </div>
  );
};

export default ExistingReview;
