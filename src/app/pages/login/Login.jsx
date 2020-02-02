// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { Form } from 'react-final-form';
import { logInUserAction } from 'app/redux/user/actions';
import { goBack } from 'app/navigation/util';
import { getUser } from 'app/redux/user/selectors';
import {
  composeValidators,
  minLengthValidator,
  requiredValidator,
} from 'app/forms/validators';
import { FormContainer } from 'app/forms/styles';
import InputField from 'app/forms/InputField';
import type { FormRenderProps } from 'react-final-form';
import type {
  SaveUserAction,
  User,
  UserCredentials,
} from 'app/redux/user/flow';

type FormValues = UserCredentials;

type Props = {
  user: User,
  logInUser: UserCredentials => SaveUserAction,
};

const Login = ({ user, logInUser }: Props): React.Node => {
  const passwordValidator = React.useCallback(
    composeValidators([requiredValidator, minLengthValidator(7)]),
    [],
  );

  const onSubmit = React.useCallback(
    (values: FormValues) => {
      logInUser(values);
    },
    [logInUser],
  );

  if (user) {
    goBack();
    return null;
  }

  return (
    <Form onSubmit={onSubmit}>
      {({ handleSubmit, submitError }: FormRenderProps<FormValues>) => (
        <FormContainer>
          <h1 className="text-center">Sign in</h1>
          <hr />
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
            className="btn btn-primary"
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
  logInUser: logInUserAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
