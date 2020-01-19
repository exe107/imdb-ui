// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import _range from 'lodash/range';
import $ from 'jquery';
import { deleteRating, rateMovie } from 'app/redux/user/actions';
import type {
  UserMovie,
  UserMovieRating,
  RateMovieAction,
  DeleteRatingAction,
} from 'app/redux/user/flow';

const ModalBody = styled.div`
  width: 400px;
  margin: 0 auto;
`;

const Star = styled.i`
  :hover {
    cursor: pointer;
  }
`;

type Props = {
  modalId: string,
  modalName: string,
  movie: UserMovie,
  previousRating: number,
  rateMovie: (UserMovieRating, boolean) => RateMovieAction,
  deleteRating: string => DeleteRatingAction,
};

const RatingModal = ({
  modalId,
  modalName,
  movie,
  previousRating,
  rateMovie,
  deleteRating,
}: Props): React.Node => {
  const [selectedRating, setSelectedRating] = React.useState(previousRating);
  const [currentRating, setCurrentRating] = React.useState(0); // on hover
  const isNewRating = previousRating === 0;
  const rating = currentRating || selectedRating;

  const onRateClick = React.useCallback(() => {
    const movieRating = { movie, rating };

    rateMovie(movieRating, isNewRating);
    $(modalId).modal('hide');
  }, [modalId, rateMovie, movie, rating, isNewRating]);

  const onDeleteRateClick = React.useCallback(() => {
    deleteRating(movie.id);
    $(modalId).modal('hide');
  }, [modalId, deleteRating, movie.id]);

  return (
    <div className="modal fade" id={modalName}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{`Rate "${movie.name}"`}</h5>
            <button type="button" className="close" data-dismiss="modal">
              &times;
            </button>
          </div>
          <ModalBody className="modal-body d-flex justify-content-center align-items-center">
            {_range(1, 11).map((index: number): React.Node => {
              const starClassName = index <= rating ? 'fa-star' : 'fa-star-o';

              const onClick = () => {
                setSelectedRating(index);
                setCurrentRating(0);
              };

              const onMouseEnter = () => setCurrentRating(index);
              const onMouseLeave = () => setCurrentRating(0);

              return (
                <Star
                  key={index}
                  className={`fa fa-2x ${starClassName} text-warning`}
                  onClick={onClick}
                  onMouseEnter={onMouseEnter}
                  onMouseLeave={onMouseLeave}
                />
              );
            })}
            <h3 className="ml-auto">{rating}</h3>
          </ModalBody>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={onRateClick}
            >
              Rate
            </button>
            {!isNewRating && (
              <button
                type="button"
                className="btn btn-danger"
                onClick={onDeleteRateClick}
              >
                Delete rating
              </button>
            )}
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  rateMovie,
  deleteRating,
};

export default connect(
  null,
  mapDispatchToProps,
)(RatingModal);
