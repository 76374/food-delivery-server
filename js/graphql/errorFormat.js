"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = require("../consts/errors");
var errorFormat = function (error) {
    if (error.originalError instanceof errors_1.ServerError) {
        return error.originalError;
    }
    return error;
};
exports.default = errorFormat;
