// @flow
import * as React from 'react';
import moment from 'moment';
import ReactHtmlParser from 'react-html-parser';
import { constructUrl } from 'app/navigation/util';
import { MOVIE_ROUTE } from 'app/navigation/routes';
import { ReviewHeading } from 'app/styles';
import type { PendingReview as PendingReviewType } from 'app/pages/movie/reviews/flow';

type Props = {
  review: PendingReviewType,
};

const PendingReview = ({ review }: Props) => {
  const { date, review: reviewText, movieId, movie } = review;
  const formattedDate = moment(date).format('DD MMMM YYYY HH:mm');

  return (
    <div className="mt-5 border border-info rounded w-75">
      <ReviewHeading className="d-flex justify-content-between align-items-center border-bottom border-info p-3">
        <div>
          <span>Written on {formattedDate} for the movie </span>
          <a href={constructUrl(MOVIE_ROUTE.path, [], { id: movieId })}>
            <b>{movie}</b>
          </a>
        </div>
      </ReviewHeading>
      <div className="p-3">{ReactHtmlParser(reviewText)}</div>
    </div>
  );
};

export default PendingReview;
