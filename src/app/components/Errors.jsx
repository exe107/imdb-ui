// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import _isEmpty from 'lodash/isEmpty';
import { getErrors } from 'app/redux/errors/selectors';
import { clearErrors as clearErrorsAction } from 'app/redux/errors/actions';
import type { ApiError, ClearErrorsAction } from 'app/redux/errors/flow';

const ErrorsContainer = styled.div`
  margin-bottom: 0 !important;
`;

type Props = {
  errors: ApiError[],
  clearErrors: () => ClearErrorsAction,
};

const Errors = ({ errors, clearErrors }: Props): React.Node => {
  if (_isEmpty(errors)) {
    return null;
  }

  return (
    <ErrorsContainer className="alert alert-danger alert-dismissible">
      {errors.map(({ id, message }: ApiError) => (
        <h5 key={id}>{message}</h5>
      ))}
      <button type="button" className="close" onClick={clearErrors}>
        &times;
      </button>
    </ErrorsContainer>
  );
};

const mapStateToProps = state => ({
  errors: getErrors(state),
});

const mapDispatchToProps = {
  clearErrors: clearErrorsAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Errors);
