"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var menuItem_1 = __importDefault(require("./menuItem"));
var user_1 = __importDefault(require("./user"));
var Schema = mongoose_1.default.Schema;
var MODEL_NAME = 'Order';
var itemSchema = new Schema({
    menuItem: { type: Schema.Types.ObjectId, ref: menuItem_1.default.modelName, required: true },
    count: { type: Number, required: true },
});
var orderSchema = new Schema({
    items: { type: [itemSchema], required: true },
    date: { type: Date, required: true },
    price: { type: Number, required: true },
    owner: { type: Schema.Types.ObjectId, ref: user_1.default.modelName, required: true },
});
exports.default = mongoose_1.default.models[MODEL_NAME] || mongoose_1.default.model(MODEL_NAME, orderSchema);
