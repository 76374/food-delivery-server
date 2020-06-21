"use strict";
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
exports.getSchedule = exports.setSchedule = void 0;
var errors_1 = require("../consts/errors");
var connect_1 = __importDefault(require("../mongoose/connect"));
var menuSchedule_1 = __importDefault(require("../mongoose/menuSchedule"));
var menuItem_1 = __importDefault(require("../mongoose/menuItem"));
var sheduleCategory_1 = __importDefault(require("../mongoose/sheduleCategory"));
var util_1 = require("./util");
var parseDate = function (date) {
    var parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
        throw new errors_1.InvalidDateError();
    }
    return new Date(Date.UTC(parsedDate.getFullYear(), parsedDate.getMonth(), parsedDate.getDate()));
};
exports.setSchedule = function (items, date) {
    return __awaiter(this, void 0, void 0, function () {
        var parsedDate, menuItems, menuSchedule, containsId, categories, sheduleCategories, _i, sheduleCategories_1, sc;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!items || !items.length) {
                        new errors_1.ItemNotFoundError();
                    }
                    parsedDate = parseDate(date);
                    return [4 /*yield*/, connect_1.default()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, menuItem_1.default.find({ _id: { $in: items } }).exec()];
                case 2:
                    menuItems = _a.sent();
                    if (menuItems.length !== items.length) {
                        throw new errors_1.ItemNotFoundError();
                    }
                    return [4 /*yield*/, menuSchedule_1.default.findOne({ parsedDate: parsedDate }).exec()];
                case 3:
                    menuSchedule = _a.sent();
                    if (!menuSchedule) {
                        menuSchedule = new menuSchedule_1.default({
                            categories: [],
                            date: date,
                        });
                    }
                    containsId = function (arr, id) { return arr.find(function (el) { return el.equals(id); }); };
                    categories = [];
                    menuItems.forEach(function (menuItem) {
                        if (!containsId(categories, menuItem.category)) {
                            categories.push(menuItem.category);
                        }
                    });
                    sheduleCategories = categories.map(function (category) {
                        return new sheduleCategory_1.default({
                            schedule: menuSchedule,
                            category: category,
                            items: menuItems.filter(function (i) { return i.category.equals(category); }).map(function (i) { return i._id; }),
                        });
                    });
                    _i = 0, sheduleCategories_1 = sheduleCategories;
                    _a.label = 4;
                case 4:
                    if (!(_i < sheduleCategories_1.length)) return [3 /*break*/, 7];
                    sc = sheduleCategories_1[_i];
                    return [4 /*yield*/, sc.save()];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6:
                    _i++;
                    return [3 /*break*/, 4];
                case 7:
                    menuSchedule.categories = sheduleCategories.map(function (i) { return i._id; });
                    return [4 /*yield*/, menuSchedule.save()];
                case 8:
                    _a.sent();
                    return [2 /*return*/, menuSchedule._id.toString()];
            }
        });
    });
};
exports.getSchedule = function (date) {
    return __awaiter(this, void 0, void 0, function () {
        var parsedDate, menuSchedule, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    parsedDate = parseDate(date);
                    return [4 /*yield*/, connect_1.default()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, menuSchedule_1.default.findOne({ parsedDate: parsedDate })
                            .populate('categories')
                            .populate({ path: 'categories', populate: { path: 'items' } })
                            .populate({ path: 'categories', populate: { path: 'category' } })];
                case 2:
                    menuSchedule = _a.sent();
                    if (!menuSchedule) {
                        return [2 /*return*/, null];
                    }
                    result = util_1.modelToPlainObject(menuSchedule, 'categories');
                    //TODO: any
                    result.categories.forEach(function (c) {
                        //TODO: any
                        c.items.map(function (i) { return util_1.modelToPlainObject(i); });
                        c.category = util_1.modelToPlainObject(c.category);
                    });
                    return [2 /*return*/, result];
            }
        });
    });
};
