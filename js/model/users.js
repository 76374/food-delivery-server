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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAutorization = exports.signIn = exports.signUp = void 0;
var util_1 = __importDefault(require("util"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var user_1 = __importDefault(require("../mongoose/user"));
var errors_1 = require("../consts/errors");
var secret_1 = __importDefault(require("../consts/secret"));
var util_2 = require("./util");
var validator = __importStar(require("./validator"));
var verify = util_1.default.promisify(jsonwebtoken_1.default.verify);
var sign = util_1.default.promisify(jsonwebtoken_1.default.sign);
//TODO: any
var getAuthData = function (user) {
    return __awaiter(this, void 0, void 0, function () {
        var payload, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    payload = { userId: user._id.toString() };
                    return [4 /*yield*/, sign(payload, secret_1.default.Auth)];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, {
                            token: token,
                            user: util_2.modelToPlainObject(user),
                        }];
            }
        });
    });
};
exports.signUp = function (firstName, lastName, email, pwd) {
    return __awaiter(this, void 0, void 0, function () {
        var user, pwdHash;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    validator.validateFirstName(firstName);
                    validator.validateLastName(lastName);
                    validator.validateEmail(email);
                    validator.validatePwd(pwd);
                    return [4 /*yield*/, user_1.default.findOne({ email: email }).exec()];
                case 1:
                    user = _a.sent();
                    if (user) {
                        throw new errors_1.UserExistsError();
                    }
                    return [4 /*yield*/, bcryptjs_1.default.hash(pwd, 12)];
                case 2:
                    pwdHash = _a.sent();
                    user = new user_1.default({
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        pwd: pwdHash,
                    });
                    return [4 /*yield*/, user.save()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, getAuthData(user)];
                case 4: return [2 /*return*/, _a.sent()];
            }
        });
    });
};
exports.signIn = function (email, pwd) {
    return __awaiter(this, void 0, void 0, function () {
        var user, pwdMatch;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    validator.validateEmail(email);
                    validator.validatePwd(pwd);
                    return [4 /*yield*/, user_1.default.findOne({ email: email }).exec()];
                case 1:
                    user = _a.sent();
                    if (!user) {
                        throw new errors_1.WrongCredentialsError();
                    }
                    return [4 /*yield*/, bcryptjs_1.default.compare(pwd, user.pwd)];
                case 2:
                    pwdMatch = _a.sent();
                    if (!pwdMatch) {
                        throw new errors_1.WrongCredentialsError();
                    }
                    return [4 /*yield*/, getAuthData(user)];
                case 3: return [2 /*return*/, _a.sent()];
            }
        });
    });
};
exports.checkAutorization = function (token) {
    return __awaiter(this, void 0, void 0, function () {
        var data, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = null;
                    if (!token) return [3 /*break*/, 4];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, verify(token, secret_1.default.Auth)];
                case 2:
                    data = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    throw new errors_1.UnauthorizedError();
                case 4:
                    if (!data) {
                        throw new errors_1.UnauthorizedError();
                    }
                    return [2 /*return*/, data.userId];
            }
        });
    });
};
