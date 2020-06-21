"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isName = exports.notNameRegex = exports.isEmail = exports.emailRegex = exports.checkLength = exports.isNotEmpty = void 0;
exports.isNotEmpty = function (value) { return Boolean(value); };
exports.checkLength = function (value, min, max) {
    return value && (!min || value.length >= min) && (!max || value.length <= max);
};
exports.emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
exports.isEmail = function (value) { return exports.emailRegex.test(value); };
exports.notNameRegex = /[^\u0400-\u04FFa-zA-Z-]/;
exports.isName = function (value) { return !exports.notNameRegex.test(value); };
