// @flow
import * as React from 'react';
import moment from 'moment';
import ReactHtmlParser from 'react-html-parser';
import WordLink from 'word-link';
import { constructUrl } from 'app/navigation/util';
import { MOVIE_ROUTE } from 'app/navigation/routes';
import { ReviewHeading } from 'app/styles';
import type { ExistingReview } from 'app/pages/movie/reviews/flow';

type Props = {
  isAdmin: boolean,
  review: ExistingReview,
  onApprove: Function,
  onReject: Function,
};

const PendingReview = ({ isAdmin, review, onApprove, onReject }: Props) => {
  const { username, date, review: reviewText, movieId, movie } = review;
  const formattedDate = moment(date).format('DD MMMM YYYY HH:mm');

  const reviewHeadingPrefix = isAdmin ? `${username} wrote` : 'Written';
  const reviewHeadingText = `${reviewHeadingPrefix} on ${formattedDate} for the movie ${movie}`;
  const movieUrl = constructUrl(MOVIE_ROUTE.path, [], { id: movieId });
  const reviewHeading = WordLink.apply(reviewHeadingText, movie, movieUrl);

  return (
    <React.Fragment>
      <div className="mt-5 border border-info rounded w-75">
        <ReviewHeading className="d-flex justify-content-between align-items-center border-bottom border-info p-3">
          {ReactHtmlParser(reviewHeading)}
        </ReviewHeading>
        <div className="p-3">{ReactHtmlParser(reviewText)}</div>
      </div>
      {isAdmin && (
        <div className="mt-3">
          <button className="btn btn-success mr-3" onClick={onApprove}>
            <i className="fa fa-check" />
          </button>
          <button className="btn btn-danger" onClick={onReject}>
            <i className="fa fa-times" />
          </button>
        </div>
      )}
    </React.Fragment>
  );
};

export default PendingReview;
