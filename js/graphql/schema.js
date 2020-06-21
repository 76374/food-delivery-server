"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var graphql_1 = require("graphql");
var getSchema = function () {
    var filePath = path_1.default.join(process.cwd(), 'src', 'graphql', 'schema.graphql');
    return fs_1.default.readFileSync(filePath, 'utf8');
};
var schema = getSchema();
exports.default = graphql_1.buildSchema(schema);
