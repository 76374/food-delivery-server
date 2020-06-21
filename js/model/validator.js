"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateArgs = exports.validateArg = exports.validatePwd = exports.validateEmail = exports.validateLastName = exports.validateFirstName = void 0;
var validator = __importStar(require("../utils/validator"));
var errors_1 = require("../consts/errors");
var MIN_NAME_LENGTH = 2;
var MAX_NAME_LENGTH = 16;
var MIN_PWD_LENGTH = 6;
var MAX_PWD_LENGTH = 128;
var validateName = function (value, field) {
    if (!validator.checkLength(value, MIN_NAME_LENGTH, MAX_NAME_LENGTH)) {
        throw new errors_1.ValidationFailedError(field, 'length', MIN_NAME_LENGTH + '-' + MAX_NAME_LENGTH);
    }
    if (!validator.isName(value)) {
        throw new errors_1.ValidationFailedError(field, 'invalidCharacters', 'latin, cyrilic, -');
    }
};
exports.validateFirstName = function (value) {
    validateName(value, 'firstName');
};
exports.validateLastName = function (value) {
    validateName(value, 'lastName');
};
exports.validateEmail = function (value) {
    if (!validator.isEmail(value)) {
        throw new errors_1.ValidationFailedError('email', 'invalidFormat', '-');
    }
};
exports.validatePwd = function (value) {
    if (!validator.checkLength(value, MIN_PWD_LENGTH, MAX_PWD_LENGTH)) {
        throw new errors_1.ValidationFailedError('pwd', 'length', MIN_PWD_LENGTH + '-' + MAX_PWD_LENGTH);
    }
};
exports.validateArg = function (value, argName) {
    if (value === null || value === undefined) {
        throw new errors_1.MissingArgError(argName);
    }
};
exports.validateArgs = function (args) {
    Object.keys(args).forEach(function (key) {
        exports.validateArg(args[key], key);
    });
};
