// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { Form } from 'react-final-form';
import { asyncOperation } from 'app/common/util';
import { registerUser } from 'app/http';
import { goBack } from 'app/navigation/util';
import { getUser } from 'app/redux/user/selectors';
import { saveUser } from 'app/redux/user/actions';
import {
  alphabeticValidator,
  composeValidators,
  minLengthValidator,
  requiredValidator,
} from 'app/pages/forms/validators';
import { addError } from 'app/redux/errors/actions';
import { FormContainer } from 'app/pages/forms/styles';
import InputField from 'app/pages/forms/InputField';
import type { FormRenderProps } from 'react-final-form';
import type {
  SaveUserAction,
  User,
  UserCredentials,
  UserPersonalDetails,
} from 'app/redux/user/flow';
import type { AddErrorAction } from 'app/redux/errors/flow';

type FormValues = UserPersonalDetails & UserCredentials;

type Props = {
  user: User,
  saveUser: User => SaveUserAction,
  addError: string => AddErrorAction,
};

const Register = ({ user, saveUser, addError }: Props) => {
  const nameValidator = React.useCallback(
    composeValidators([requiredValidator, alphabeticValidator]),
    [],
  );

  const passwordValidator = React.useCallback(
    composeValidators([requiredValidator, minLengthValidator(7)]),
    [],
  );

  const onSubmit = React.useCallback(
    (formValues: FormValues) => {
      asyncOperation(() =>
        registerUser(formValues)
          .then(saveUser)
          .catch(addError),
      );
    },
    [saveUser, addError],
  );

  if (user) {
    goBack();
    return null;
  }

  return (
    <Form onSubmit={onSubmit}>
      {({ handleSubmit, submitError }: FormRenderProps<FormValues>) => (
        <FormContainer>
          <h1 className="text-center mb-4">Sign up</h1>
          <h5>Please provide the details needed for the form below</h5>
          <hr />
          <InputField label="Name" name="name" validate={nameValidator} />
          <InputField label="Surname" name="surname" validate={nameValidator} />
          <InputField
            label="Username"
            name="username"
            validate={requiredValidator}
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            validate={passwordValidator}
          />
          <button
            className="btn btn-primary text-white"
            type="button"
            onClick={handleSubmit}
          >
            Submit
          </button>
          {submitError && (
            <div className="mt-3 alert alert-danger">{submitError}</div>
          )}
        </FormContainer>
      )}
    </Form>
  );
};

const mapStateToProps = state => ({
  user: getUser(state),
});

const mapDispatchToProps = {
  saveUser,
  addError,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Register);