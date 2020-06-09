// @flow
import type { FieldState } from 'final-form';

type Validator = (value: ?any, allValues: Object, meta: ?FieldState) => ?any;

export const requiredValidator = (value: ?any) =>
  value ? undefined : 'Field should not be empty';

export const alphabeticValidator = (value: ?any) =>
  value && /^[a-zA-Z]+$/.test(value)
    ? undefined
    : 'Please provide a valid name';

export const emailValidator = (value: ?any) =>
  value && /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)
    ? undefined
    : 'Please provide a valid e-mail';

export const minLengthValidator = (length: number) => (value: ?any) =>
  value && value.length >= length
    ? undefined
    : 'Value should be at least 7 characters long';

export const maxLengthValidator = (length: number) => (value: ?any) =>
  value && value.length <= length
    ? undefined
    : 'Value should be at least 7 characters long';

export const matchingFieldValidator = (
  fieldName: string,
  message: string,
  shouldMatch: boolean,
) => (value: ?any, allValues: Object) => {
  const fieldsMatch = value === allValues[fieldName];
  const isValid = shouldMatch ? fieldsMatch : !fieldsMatch;

  return isValid ? undefined : message;
};

export const composeValidators = (validators: Validator[]): Validator => (
  value: ?any,
  allValues: Object,
  meta: ?FieldState,
): ?string =>
  validators.reduce(
    (error: ?string, validator: Validator) =>
      error || validator(value, allValues, meta),
    undefined,
  );
