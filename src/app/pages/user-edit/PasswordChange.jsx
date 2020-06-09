// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { Form } from 'react-final-form';
import { goBack } from 'app/navigation/util';
import { asyncOperation } from 'app/redux/util';
import { changePassword } from 'app/http';
import { getUser } from 'app/redux/user/selectors';
import {
  composeValidators,
  matchingFieldValidator,
  minLengthValidator,
  requiredValidator,
} from 'app/components/form/validators';
import { FormContainer } from 'app/components/form/styles';
import InputField from 'app/components/form/InputField';
import type { FormRenderProps } from 'react-final-form';
import type { User } from 'app/redux/user/flow';

type Props = {
  user: User,
};

const PasswordChange = ({ user }: Props) => {
  const commonValidators = React.useMemo(
    () => [requiredValidator, minLengthValidator(7)],
    [],
  );

  const oldPasswordValidator = React.useCallback(
    composeValidators(commonValidators),
    [],
  );

  const newPasswordValidator = React.useCallback(
    composeValidators([
      ...commonValidators,
      matchingFieldValidator(
        'oldPassword',
        'New password cannot be the same as the old one',
        false,
      ),
    ]),
  );

  const confirmedPasswordValidator = React.useCallback(
    composeValidators([
      ...commonValidators,
      matchingFieldValidator(
        'newPassword',
        'Value does not match new password',
        true,
      ),
    ]),
    [],
  );

  const onSubmit = React.useCallback((values: Object) => {
    const { oldPassword, newPassword } = values;
    const requestBody = { oldPassword, newPassword };
    asyncOperation(() => changePassword(requestBody).then(goBack));
  }, []);

  if (!user) {
    goBack();
    return null;
  }

  return (
    <Form onSubmit={onSubmit}>
      {({ handleSubmit, submitError }: FormRenderProps<Object>) => (
        <FormContainer>
          <h1 className="text-center mb-4">Change your password</h1>
          <hr />
          <InputField
            label="Old password"
            name="oldPassword"
            type="password"
            validate={oldPasswordValidator}
          />
          <InputField
            label="New password"
            name="newPassword"
            type="password"
            validate={newPasswordValidator}
          />
          <InputField
            label="Confirm password"
            name="confirmedPassword"
            type="password"
            validate={confirmedPasswordValidator}
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

export default connect(mapStateToProps)(PasswordChange);
