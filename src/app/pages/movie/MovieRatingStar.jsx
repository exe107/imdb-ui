// @flow
import * as React from 'react';
import { Star } from 'app/styled';
import RatingModal from 'app/components/RatingModal';
import type { User, UserMovie, UserMovieRating } from 'app/redux/user/flow';

type Props = {
  user: User,
  movie: UserMovie,
};

const MODAL_NAME = 'ratingModal';
const MODAL_ID = `#${MODAL_NAME}`;

const MovieRatingStar = ({ user, movie }: Props): React.Node => {
  const movieRating = user.movieRatings.find(
    (movieRating: UserMovieRating) => movieRating.movie.id === movie.id,
  );

  const rating = movieRating ? movieRating.rating : 0;
  const starClassName = rating ? 'fa-star' : 'fa-star-o';

  return (
    <React.Fragment>
      <h1
        className="ml-3 d-inline"
        data-toggle="tooltip"
        data-placement="right"
        title="Rate this movie"
      >
        <Star
          className={`fa ${starClassName} text-warning`}
          data-toggle="modal"
          data-target={MODAL_ID}
        />
        {rating > 0 && <span className="ml-2">{rating}</span>}
      </h1>
      <RatingModal
        modalId={MODAL_ID}
        modalName={MODAL_NAME}
        movie={movie}
        previousRating={rating}
      />
    </React.Fragment>
  );
};

export default MovieRatingStar;
