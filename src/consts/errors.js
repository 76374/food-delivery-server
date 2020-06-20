exports.userExists = {
  message: 'A user with provided email already exists',
  key: 'user_exists',
  code: 401,
};
exports.unauthorized = {
  message: 'Not authorized',
  key: 'unauthorized',
  code: 401,
};
exports.wrongCredentials = {
  message: 'Wrong user name and/or password',
  key: 'wrong_credentials',
  code: 401,
};
exports.validationFailed = {
  message: 'Validation failed',
  key: 'validation_failed',
  code: 422,
};
exports.itemNotFound = {
  message: 'Item not found',
  key: 'item_not_found',
  code: 422,
};
exports.wrongItemsCount = {
  message: 'Wrong items count',
  key: 'wrong_items_count',
  code: 422,
};
exports.userNotFound = {
  message: 'User not found',
  key: 'user_not_found',
  code: 422,
};
exports.getValidationFailed = (field, param, value) => ({
  message: `validation failed (${field} ${param} ${value})`,
  key: `validation_failed_${field}_${param}`,
  code: 422,
});
exports.invalidDateFormat = {
  message: 'Invalid date format',
  key: 'invalid_date_format',
  code: 422
},
exports.categoryNotFound = {
  message: 'Category not found',
  key: 'category_not_found',
  code: 422
},
exports.getMissingArg = (argName) => ({
  message: 'Missing argument: ' + argName,
  key: 'missing_argument_' + argName,
  code: 422
}),
exports.categoryNotEmpty = {
  message: 'Category is not empty, delete items in it first',
  key: 'category_not_empty',
  code: 422
}