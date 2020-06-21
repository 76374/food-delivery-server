"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var MODEL_NAME = 'User';
var userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    pwd: { type: String, required: true },
});
exports.default = mongoose_1.default.models[MODEL_NAME] || mongoose_1.default.model(MODEL_NAME, userSchema);
