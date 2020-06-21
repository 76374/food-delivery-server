"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.modelToPlainObject = void 0;
//TODO: any
exports.modelToPlainObject = function (model, nestedProps) {
    if (!model._doc) {
        throw new Error('unexpected model');
    }
    var result = __assign({}, model._doc);
    result.id = result._id.toString();
    delete result._id;
    if (nestedProps) {
        var prop = result[nestedProps];
        if (prop) {
            if (prop instanceof Array) {
                result[nestedProps] = prop.map(function (i) { return exports.modelToPlainObject(i); });
            }
            else {
                result[nestedProps] = exports.modelToPlainObject(result[nestedProps]);
            }
        }
    }
    return result;
};
