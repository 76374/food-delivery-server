export class ServerError extends Error {
  key: string;
  code: number;

  constructor(message: string, key: string, code: number) {
    super(message);
    this.key = key;
    this.code = code;
  }
}

export class UserExistsError extends ServerError {
  constructor() {
    super('A user with provided email already exists', 'user_exists', 401);
  }
}
export class UnauthorizedError extends ServerError {
  constructor() {
    super('Not authorized', 'unauthorized', 401);
  }
}
export class WrongCredentialsError extends ServerError {
  constructor() {
    super('Wrong user name and/or password', 'wrong_credentials', 401);
  }
}
export class ItemNotFoundError extends ServerError {
  constructor() {
    super('Item not found', 'item_not_found', 422);
  }
}
export class WrongItemsCountError extends ServerError {
  constructor() {
    super('Wrong items count', 'wrong_items_count', 422);
  }
}
export class UserNotFoundError extends ServerError {
  constructor() {
    super('User not found', 'user_not_found', 422);
  }
}
export class ValidationFailedError extends ServerError {
  constructor(field: string, param: string, value: string) {
    super(
      `validation failed (${field} ${param} ${value})`,
      `validation_failed_${field}_${param}`,
      422
    );
  }
}
export class InvalidDateError extends ServerError {
  constructor() {
    super('Invalid date format', 'invalid_date_format', 422);
  }
}
export class CategoryNotFoundError extends ServerError {
  constructor() {
    super('Category not found', 'category_not_found', 422);
  }
}
export class MissingArgError extends ServerError {
  constructor(argName: string) {
    super('Missing argument: ' + argName, 'missing_argument_' + argName, 422);
  }
}
export class CategoryNotEmptyError extends ServerError {
  constructor() {
    super('Category is not empty, delete items in it first', 'category_not_empty', 422);
  }
}
