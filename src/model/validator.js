const validator = require('../utils/validator');
const getError = require('../utils/getError');
const { getValidationFailed, getMissingArg } = require('../consts/errors');

const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 16;
const MIN_PWD_LENGTH = 6;
const MAX_PWD_LENGTH = 128;

const validateName = (value, field) => {
  if (!validator.checkLength(value, MIN_NAME_LENGTH, MAX_NAME_LENGTH)) {
    throw getError(getValidationFailed(field, 'length', MIN_NAME_LENGTH + '-' + MAX_NAME_LENGTH));
  }
  if (!validator.isName(value)) {
    throw getError(getValidationFailed(field, 'invalidCharacters', 'latin, cyrilic, -'));
  }
};

exports.validateFirstName = (value) => {
  validateName(value, 'firstName');
};

exports.validateLastName = (value) => {
  validateName(value, 'lastName');
};

exports.validateEmail = (value) => {
  if (!validator.isEmail(value)) {
    throw getError(getValidationFailed('email', 'invalidFormat', '-'));
  }
};

exports.validatePwd = (value) => {
  if (!validator.checkLength(value, MIN_PWD_LENGTH, MAX_PWD_LENGTH)) {
    throw getError(getValidationFailed('pwd', 'length', MIN_PWD_LENGTH + '-' + MAX_PWD_LENGTH));
  }
};

const validateArg = (value, argName) => {
  if (value === null || value === undefined) {
    throw getError(getMissingArg(argName));
  }
};
exports.validateArgs = (args) => {
  Object.keys(args).forEach((key) => {
    validateArg(args[key], key);
  });
};
