"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var modelName = 'MenuSchedule';
exports.default = mongoose_1.default.models[modelName] ||
    mongoose_1.default.model(modelName, new Schema({
        date: Date,
        categories: [{ type: Schema.Types.ObjectId, ref: 'ScheduleCategory' }],
    }));
