// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { getUser } from 'app/redux/user/selectors';
import { Form } from 'react-final-form';
import { FormContainer } from 'app/components/form/styles';
import { goBack } from 'app/navigation/util';
import { asyncOperation } from 'app/redux/util';
import { editProfile } from 'app/http';
import {
  alphabeticValidator,
  emailValidator,
} from 'app/components/form/validators';
import { saveUserAction } from 'app/redux/user/actions';
import InputField from 'app/components/form/InputField';
import type { FormRenderProps } from 'react-final-form';
import type {
  SaveUserAction,
  User,
  UserPersonalDetails,
} from 'app/redux/user/flow';

type FormValues = UserPersonalDetails & {
  username: string,
};

type Props = {
  user: User,
  saveUser: User => SaveUserAction,
};

const EditProfile = ({ user, saveUser }: Props) => {
  const onSubmit = React.useCallback(
    (values: FormValues) => {
      const { name, surname, email } = values;

      asyncOperation(() =>
        editProfile({ name, surname, email }).then((editedUser: User) => {
          saveUser(editedUser);
          goBack();
        }),
      );
    },
    [saveUser],
  );

  if (!user) {
    goBack();
    return null;
  }

  const { username, personalDetails } = user;

  const initialValues = {
    ...personalDetails,
    username,
  };

  return (
    <Form onSubmit={onSubmit} initialValues={initialValues}>
      {({ handleSubmit, submitError }: FormRenderProps<FormValues>) => (
        <FormContainer>
          <h1 className="text-center">Edit your profile</h1>
          <hr />
          <InputField label="Name" name="name" validate={alphabeticValidator} />
          <InputField
            label="Surname"
            name="surname"
            validate={alphabeticValidator}
          />
          <InputField label="E-mail" name="email" validate={emailValidator} />
          <InputField label="Username" name="username" readOnly />
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
)(EditProfile);
