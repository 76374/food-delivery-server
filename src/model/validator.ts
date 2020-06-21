import * as validator from '../utils/validator';
import { ValidationFailedError, MissingArgError } from '../consts/errors';

const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 16;
const MIN_PWD_LENGTH = 6;
const MAX_PWD_LENGTH = 128;

const validateName = (value: string, field: string) => {
  if (!validator.checkLength(value, MIN_NAME_LENGTH, MAX_NAME_LENGTH)) {
    throw new ValidationFailedError(field, 'length', MIN_NAME_LENGTH + '-' + MAX_NAME_LENGTH);
  }
  if (!validator.isName(value)) {
    throw new ValidationFailedError(field, 'invalidCharacters', 'latin, cyrilic, -');
  }
};

export const validateFirstName = (value: string) => {
  validateName(value, 'firstName');
};

export const validateLastName = (value: string) => {
  validateName(value, 'lastName');
};

export const validateEmail = (value: string) => {
  if (!validator.isEmail(value)) {
    throw new ValidationFailedError('email', 'invalidFormat', '-');
  }
};

export const validatePwd = (value: string) => {
  if (!validator.checkLength(value, MIN_PWD_LENGTH, MAX_PWD_LENGTH)) {
    throw new ValidationFailedError('pwd', 'length', MIN_PWD_LENGTH + '-' + MAX_PWD_LENGTH);
  }
};

export const validateArg = (value: any, argName: string) => {
  if (value === null || value === undefined) {
    throw new MissingArgError(argName);
  }
};

export const validateArgs = (args: any) => {
  Object.keys(args).forEach((key) => {
    validateArg(args[key], key);
  });
};
