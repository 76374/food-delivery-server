"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var modelName = 'ScheduleCategory';
exports.default = mongoose_1.default.models[modelName] ||
    mongoose_1.default.model(modelName, new Schema({
        schedule: { type: Schema.Types.ObjectId, ref: 'MenuSchedule', required: true },
        category: { type: Schema.Types.ObjectId, ref: 'MenuCategory', required: true },
        items: [{ type: Schema.Types.ObjectId, ref: 'MenuItem', required: true }],
    }));
