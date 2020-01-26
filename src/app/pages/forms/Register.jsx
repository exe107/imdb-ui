// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { Form } from 'react-final-form';
import { goBack } from 'app/navigation/util';
import { getUser } from 'app/redux/user/selectors';
import { registerUserAction } from 'app/redux/user/actions';
import {
  alphabeticValidator,
  composeValidators,
  minLengthValidator,
  requiredValidator,
} from 'app/pages/forms/validators';
import { FormContainer } from 'app/pages/forms/styles';
import InputField from 'app/pages/forms/InputField';
import type { FormRenderProps } from 'react-final-form';
import type {
  SaveUserAction,
  User,
  UserCredentials,
  UserPersonalDetails,
} from 'app/redux/user/flow';

type FormValues = UserPersonalDetails & UserCredentials;

type Props = {
  user: User,
  registerUser: FormValues => SaveUserAction,
};

const Register = ({ user, registerUser }: Props) => {
  const nameValidator = React.useCallback(
    composeValidators([requiredValidator, alphabeticValidator]),
    [],
  );

  const passwordValidator = React.useCallback(
    composeValidators([requiredValidator, minLengthValidator(7)]),
    [],
  );

  if (user) {
    goBack();
    return null;
  }

  return (
    <Form onSubmit={registerUser}>
      {({ handleSubmit, submitError }: FormRenderProps<FormValues>) => (
        <FormContainer>
          <h1 className="text-center mb-4">Sign up</h1>
          <h5>Please fill in the form below</h5>
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
  registerUser: registerUserAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Register);
