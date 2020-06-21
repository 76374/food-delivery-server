"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToken = void 0;
//TODO: add type
exports.getToken = function (request) {
    var value = request.get('Authorization');
    if (value) {
        var parts = value.split(' ');
        if (parts.length > 1) {
            return parts[1];
        }
    }
    return null;
};
