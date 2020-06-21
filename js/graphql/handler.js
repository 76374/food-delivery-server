"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_graphql_1 = __importDefault(require("express-graphql"));
var schema_1 = __importDefault(require("./schema"));
var resolvers_1 = __importDefault(require("./resolvers"));
var errorFormat_1 = __importDefault(require("./errorFormat"));
exports.default = express_graphql_1.default({
    schema: schema_1.default,
    rootValue: resolvers_1.default,
    graphiql: true,
    customFormatErrorFn: errorFormat_1.default
});
