"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var MODEL_NAME = 'MenuItem';
exports.default = mongoose_1.default.models[MODEL_NAME] ||
    mongoose_1.default.model(MODEL_NAME, new Schema({
        title: { type: String, required: true },
        price: { type: Number, required: true },
        category: { type: Schema.Types.ObjectId, ref: 'MenuCategory' },
    }));
