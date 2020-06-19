// @flow
import * as React from 'react';
import { Field } from 'react-final-form';

type Props = {
  label: string,
  name: string,
  type?: string,
  readOnly?: boolean,
  validate?: Function,
};

const InputField = ({ label, ...fieldProps }: Props): React.Node => (
  <Field {...fieldProps}>
    {({ input, meta, readOnly }: Object) => (
      <div className="form-group">
        <label>{label}</label>
        <input {...input} readOnly={readOnly} className="form-control" />
        {meta.submitFailed && meta.error && (
          <div className="alert alert-danger">{meta.error}</div>
        )}
      </div>
    )}
  </Field>
);

export default InputField;
