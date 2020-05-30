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
})