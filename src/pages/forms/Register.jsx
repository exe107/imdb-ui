// @flow
import * as React from 'react';
import { Form } from 'react-final-form';
import {
  alphabeticValidator,
  composeValidators,
  minLengthValidator,
  requiredValidator,
} from 'pages/forms/validators';
import { FormContainer } from 'pages/forms/styles';
import InputField from 'pages/forms/InputField';
import type { FormRenderProps } from 'react-final-form';

type FormValues = {
  name: string,
  surname: string,
  username: string,
  password: string,
};

const Register = () => {
  const nameValidator = React.useCallback(
    composeValidators([requiredValidator, alphabeticValidator]),
    [],
  );

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
        </FormContainer>
      )}
    </Form>
  );
};

export default Register;
