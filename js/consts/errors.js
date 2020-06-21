"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryNotEmptyError = exports.MissingArgError = exports.CategoryNotFoundError = exports.InvalidDateError = exports.ValidationFailedError = exports.UserNotFoundError = exports.WrongItemsCountError = exports.ItemNotFoundError = exports.WrongCredentialsError = exports.UnauthorizedError = exports.UserExistsError = exports.ServerError = void 0;
var ServerError = /** @class */ (function (_super) {
    __extends(ServerError, _super);
    function ServerError(message, key, code) {
        var _this = _super.call(this, message) || this;
        _this.key = key;
        _this.code = code;
        return _this;
    }
    return ServerError;
}(Error));
exports.ServerError = ServerError;
var UserExistsError = /** @class */ (function (_super) {
    __extends(UserExistsError, _super);
    function UserExistsError() {
        return _super.call(this, 'A user with provided email already exists', 'user_exists', 401) || this;
    }
    return UserExistsError;
}(ServerError));
exports.UserExistsError = UserExistsError;
var UnauthorizedError = /** @class */ (function (_super) {
    __extends(UnauthorizedError, _super);
    function UnauthorizedError() {
        return _super.call(this, 'Not authorized', 'unauthorized', 401) || this;
    }
    return UnauthorizedError;
}(ServerError));
exports.UnauthorizedError = UnauthorizedError;
var WrongCredentialsError = /** @class */ (function (_super) {
    __extends(WrongCredentialsError, _super);
    function WrongCredentialsError() {
        return _super.call(this, 'Wrong user name and/or password', 'wrong_credentials', 401) || this;
    }
    return WrongCredentialsError;
}(ServerError));
exports.WrongCredentialsError = WrongCredentialsError;
var ItemNotFoundError = /** @class */ (function (_super) {
    __extends(ItemNotFoundError, _super);
    function ItemNotFoundError() {
        return _super.call(this, 'Item not found', 'item_not_found', 422) || this;
    }
    return ItemNotFoundError;
}(ServerError));
exports.ItemNotFoundError = ItemNotFoundError;
var WrongItemsCountError = /** @class */ (function (_super) {
    __extends(WrongItemsCountError, _super);
    function WrongItemsCountError() {
        return _super.call(this, 'Wrong items count', 'wrong_items_count', 422) || this;
    }
    return WrongItemsCountError;
}(ServerError));
exports.WrongItemsCountError = WrongItemsCountError;
var UserNotFoundError = /** @class */ (function (_super) {
    __extends(UserNotFoundError, _super);
    function UserNotFoundError() {
        return _super.call(this, 'User not found', 'user_not_found', 422) || this;
    }
    return UserNotFoundError;
}(ServerError));
exports.UserNotFoundError = UserNotFoundError;
var ValidationFailedError = /** @class */ (function (_super) {
    __extends(ValidationFailedError, _super);
    function ValidationFailedError(field, param, value) {
        return _super.call(this, "validation failed (" + field + " " + param + " " + value + ")", "validation_failed_" + field + "_" + param, 422) || this;
    }
    return ValidationFailedError;
}(ServerError));
exports.ValidationFailedError = ValidationFailedError;
var InvalidDateError = /** @class */ (function (_super) {
    __extends(InvalidDateError, _super);
    function InvalidDateError() {
        return _super.call(this, 'Invalid date format', 'invalid_date_format', 422) || this;
    }
    return InvalidDateError;
}(ServerError));
exports.InvalidDateError = InvalidDateError;
var CategoryNotFoundError = /** @class */ (function (_super) {
    __extends(CategoryNotFoundError, _super);
    function CategoryNotFoundError() {
        return _super.call(this, 'Category not found', 'category_not_found', 422) || this;
    }
    return CategoryNotFoundError;
}(ServerError));
exports.CategoryNotFoundError = CategoryNotFoundError;
var MissingArgError = /** @class */ (function (_super) {
    __extends(MissingArgError, _super);
    function MissingArgError(argName) {
        return _super.call(this, 'Missing argument: ' + argName, 'missing_argument_' + argName, 422) || this;
    }
    return MissingArgError;
}(ServerError));
exports.MissingArgError = MissingArgError;
var CategoryNotEmptyError = /** @class */ (function (_super) {
    __extends(CategoryNotEmptyError, _super);
    function CategoryNotEmptyError() {
        return _super.call(this, 'Category is not empty, delete items in it first', 'category_not_empty', 422) || this;
    }
    return CategoryNotEmptyError;
}(ServerError));
exports.CategoryNotEmptyError = CategoryNotEmptyError;
