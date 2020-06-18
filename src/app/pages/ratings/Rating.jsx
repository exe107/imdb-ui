// @flow
import * as React from 'react';
import $ from 'jquery';
import moment from 'moment';
import { NOT_AVAILABLE } from 'app/constants';
import { constructUrl } from 'app/navigation/util';
import { MOVIE_ROUTE } from 'app/navigation/routes';
import { ClickableElement } from 'app/styles';
import imageNotFound from 'app/images/image_not_found.png';
import RatingModal from 'app/components/RatingModal';
import type { UserMovieRating } from 'app/redux/user/flow';

type Props = {
  ordinal: number,
  movieRating: UserMovieRating,
};

const Rating = ({ ordinal, movieRating }: Props) => {
  const { movie, rating, date } = movieRating;
  const { id, name, year, genres, imageUrl } = movie;

  const MODAL_NAME = `${id}-ratingModal`;
  const MODAL_ID = `#${MODAL_NAME}`;

  const showModal = React.useCallback(() => $(MODAL_ID).modal('show'), [
    MODAL_ID,
  ]);

  const formattedDate = moment(date).format('DD MMMM YYYY');
  const image = imageUrl !== NOT_AVAILABLE ? imageUrl : imageNotFound;

  return (
    <div className="d-flex mt-5">
      <img src={image} height={160} alt="" />
      <div className="ml-3">
        <div className="mb-2">
          <h5 className="d-inline">{`${ordinal}.`}</h5>
          <h4 className="d-inline">
            <a
              className="ml-1"
              href={constructUrl(MOVIE_ROUTE.path, [], { id })}
            >
              {name}
            </a>
          </h4>
        </div>
        <h5>{`Year: ${year}`}</h5>
        <h5>{`Genre: ${genres.join(', ')}`}</h5>
        <h5>
          <span>{`Your rating: ${rating}`}</span>
          <ClickableElement
            className="fa fa-star text-warning ml-1"
            onClick={showModal}
          />
        </h5>
        <h5>{`Rated on ${formattedDate}`}</h5>
      </div>
      <RatingModal
        modalId={MODAL_ID}
        modalName={MODAL_NAME}
        movie={movie}
        previousRating={rating}
      />
    </div>
  );
};

export default Rating;
