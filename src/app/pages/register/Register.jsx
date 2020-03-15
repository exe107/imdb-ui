// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { Form } from 'react-final-form';
import { goBack } from 'app/navigation/util';
import { asyncOperation } from 'app/redux/util';
import { registerUser } from 'app/http';
import { saveUserAction } from 'app/redux/user/actions';
import { getUser } from 'app/redux/user/selectors';
import {
  alphabeticValidator,
  emailValidator,
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
  UserPersonalDetails,
} from 'app/redux/user/flow';

type FormValues = UserPersonalDetails & UserCredentials;

type Props = {
  user: User,
  saveUser: User => SaveUserAction,
};

const Register = ({ user, saveUser }: Props) => {
  const passwordValidator = React.useMemo(() => minLengthValidator(7), []);

  const onSubmit = React.useCallback(
    (values: FormValues) =>
      asyncOperation(() => registerUser(values).then(saveUser)),
    [saveUser],
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
          <h5>Please fill in the form below</h5>
          <hr />
          <InputField label="Name" name="name" validate={alphabeticValidator} />
          <InputField
            label="Surname"
            name="surname"
            validate={alphabeticValidator}
          />
          <InputField label="E-mail" name="email" validate={emailValidator} />
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
  saveUser: saveUserAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Register);
