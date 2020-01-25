// @flow
import * as React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { constructUrl } from 'app/navigation/util';
import { MOVIE_ROUTE } from 'app/navigation/routes';
import { Star } from 'app/styled';
import imageNotFound from 'app/images/image_not_found.png';
import RatingModal from 'app/components/RatingModal';
import type { UserMovieRating } from 'app/redux/user/flow';

const Image = styled.img`
  height: 160px;
`;

type Props = {
  ordinal: number,
  movieRating: UserMovieRating,
};

const Rating = ({ ordinal, movieRating }: Props) => {
  const { movie, rating, date } = movieRating;
  const { id, name, year, genres, imageUrl } = movie;
  const formattedDate = moment(date).format('DD MMMM YYYY');

  const NOT_AVAILABLE = 'N/A';
  const image = imageUrl !== NOT_AVAILABLE ? imageUrl : imageNotFound;

  const MODAL_NAME = `${id}-ratingModal`;
  const MODAL_ID = `#${MODAL_NAME}`;

  return (
    <div className="d-flex mt-5">
      <Image src={image} />
      <div className="ml-3">
        <h3>
          <span>{ordinal}.</span>
          <a className="ml-1" href={constructUrl(MOVIE_ROUTE.path, [], { id })}>
            {name}
          </a>
        </h3>
        <h5>Year: {year}</h5>
        <h5>Genre: {genres.join(', ')}</h5>
        <h5>
          <span>Your rating: {rating}</span>
          <Star
            className="fa fa-star text-warning ml-1"
            data-toggle="modal"
            data-target={MODAL_ID}
          />
        </h5>
        <h5>Rated on {formattedDate}</h5>
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
