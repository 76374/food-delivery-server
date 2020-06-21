"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var mongoose = require("mongoose");
var cors = require("cors");
var path_1 = __importDefault(require("./consts/path"));
var handler_1 = __importDefault(require("./graphql/handler"));
var app = express();
app.use(cors());
app.use('/graphql', handler_1.default);
//TODO: use connect or remove it
mongoose
    .connect(path_1.default.DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(function (result) {
    app.listen(8080);
})
    .catch(function (err) {
    console.log(err);
});
