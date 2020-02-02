// @flow
import * as React from 'react';
import $ from 'jquery';
import { ClickableElement } from 'app/styles';
import RatingModal from 'app/components/RatingModal';
import type { User, UserMovie, UserMovieRating } from 'app/redux/user/flow';

type Props = {
  user: User,
  movie: UserMovie,
};

const MODAL_NAME = 'ratingModal';
const MODAL_ID = `#${MODAL_NAME}`;

const MovieRatingStar = ({ user, movie }: Props): React.Node => {
  const [showModal, setShowModal] = React.useState(false);

  const toggleModal = React.useCallback(() => setShowModal(!showModal), [
    showModal,
  ]);

  React.useEffect(() => {
    if (showModal) {
      $(MODAL_ID).modal('show');
      $(MODAL_ID).on('hidden.bs.modal', toggleModal);
    }
  }, [showModal, toggleModal]);

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
        <ClickableElement
          className={`fa ${starClassName} text-warning`}
          onClick={toggleModal}
        />
        {rating > 0 && <span className="ml-2">{rating}</span>}
      </h1>
      {showModal && (
        <RatingModal
          modalId={MODAL_ID}
          modalName={MODAL_NAME}
          movie={movie}
          previousRating={rating}
        />
      )}
    </React.Fragment>
  );
};

export default MovieRatingStar;
