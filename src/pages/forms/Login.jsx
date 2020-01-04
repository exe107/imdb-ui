// @flow
import * as React from 'react';
import { Form } from 'react-final-form';
import {
  composeValidators,
  minLengthValidator,
  requiredValidator,
} from 'pages/forms/validators';
import { FormContainer } from 'pages/forms/styles';
import InputField from 'pages/forms/InputField';
import type { FormRenderProps } from 'react-final-form';

type FormValues = {
  username: string,
  password: string,
};

const Login = (): React.Node => {
  const passwordValidator = React.useCallback(
    composeValidators([requiredValidator, minLengthValidator(7)]),
    [],
  );

  const onSubmit = React.useCallback((formValues: FormValues) => {
    console.log(formValues);
  }, []);

  return (
    <Form onSubmit={onSubmit}>
      {({ handleSubmit }: FormRenderProps<FormValues>) => (
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
            className="btn btn-primary text-white"
            type="button"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </FormContainer>
      )}
    </Form>
  );
};

export default Login;
