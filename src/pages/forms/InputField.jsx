// @flow
import * as React from 'react';
import { Field } from 'react-final-form';
import type { FieldRenderProps } from 'react-final-form';

type Props = {
  label: string,
  name: string,
  type?: string,
  validate: Function,
};

const InputField = ({ label, ...fieldProps }: Props): React.Node => (
  <Field {...fieldProps}>
    {({ input, meta }: FieldRenderProps) => (
      <div className="form-group">
        <label>{label}</label>
        <input {...input} className="form-control" />
        {meta.submitFailed && meta.error && (
          <div className="alert alert-danger">{meta.error}</div>
        )}
      </div>
    )}
  </Field>
);

export default InputField;
