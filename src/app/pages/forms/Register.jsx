// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { Form } from 'react-final-form';
import { FORM_ERROR } from 'final-form';
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
import { FormContainer } from 'app/pages/forms/styles';
import InputField from 'app/pages/forms/InputField';
import type { FormRenderProps } from 'react-final-form';
import type {
  SaveUserAction,
  UserCredentials,
  UserPersonalDetails,
} from 'app/redux/user/flow';

type FormValues = UserPersonalDetails & UserCredentials;

type Props = {
  user: UserPersonalDetails,
  saveUser: UserPersonalDetails => SaveUserAction,
};

const Register = ({ user, saveUser }: Props) => {
  const nameValidator = React.useCallback(
    composeValidators([requiredValidator, alphabeticValidator]),
    [],
  );

  const passwordValidator = React.useCallback(
    composeValidators([requiredValidator, minLengthValidator(7)]),
    [],
  );

  const onSubmit = React.useCallback(
    async (formValues: FormValues) => {
      const response = await asyncOperation(() => registerUser(formValues));
      if (response.status === 409) {
        return { [FORM_ERROR]: response.message };
      }

      saveUser(response);
    },
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Register);
