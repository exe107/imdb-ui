// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import _range from 'lodash/range';
import $ from 'jquery';
import { asyncOperation } from 'app/redux/util';
import { deleteRating, rateMovie } from 'app/http';
import {
  deleteRatingAction,
  saveRatingAction,
  updateRatingAction,
} from 'app/redux/user/actions';
import { ClickableElement } from 'app/styles';
import type {
  UserMovie,
  UserMovieRating,
  SaveRatingAction,
  UpdateRatingAction,
  DeleteRatingAction,
} from 'app/redux/user/flow';

const ModalBody = styled.div`
  width: 400px;
  margin: 0 auto;
`;

type Props = {
  modalId: string,
  modalName: string,
  movie: UserMovie,
  previousRating: number,
  saveRating: UserMovieRating => SaveRatingAction,
  updateRating: UserMovieRating => UpdateRatingAction,
  removeRating: string => DeleteRatingAction,
};

const RatingModal = ({
  modalId,
  modalName,
  movie,
  previousRating,
  saveRating,
  updateRating,
  removeRating,
}: Props): React.Node => {
  const [selectedRating, setSelectedRating] = React.useState(previousRating);
  const [currentRating, setCurrentRating] = React.useState(0); // on hover
  const isNewRating = previousRating === 0;
  const rating = currentRating || selectedRating;

  const onRateClick = React.useCallback(() => {
    const movieRating = { movie, rating };

    asyncOperation(() =>
      rateMovie(movieRating).then(() => {
        if (isNewRating) {
          saveRating(movieRating);
        } else {
          updateRating(movieRating);
        }
      }),
    );

    $(modalId).modal('hide');
  }, [modalId, movie, rating, saveRating, updateRating, isNewRating]);

  const onDeleteRatingClick = React.useCallback(() => {
    asyncOperation(() =>
      deleteRating(movie.id).then(() => removeRating(movie.id)),
    );

    $(modalId).modal('hide');
  }, [modalId, removeRating, movie.id]);

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
                <ClickableElement
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
            {selectedRating > 0 && (
              <button
                type="button"
                className="btn btn-primary"
                onClick={onRateClick}
              >
                Rate
              </button>
            )}
            {!isNewRating && (
              <button
                type="button"
                className="btn btn-danger"
                onClick={onDeleteRatingClick}
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
  saveRating: saveRatingAction,
  updateRating: updateRatingAction,
  removeRating: deleteRatingAction,
};

export default connect(
  null,
  mapDispatchToProps,
)(RatingModal);
