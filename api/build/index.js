"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var typeorm_1 = require("typeorm");
var routes_1 = require("./routes");
var dbConfig_1 = __importDefault(require("./dbConfig"));
var app = express_1.default();
var PORT = 8000;
app.use(body_parser_1.default.urlencoded({ extended: false }));
routes_1.routes.forEach(function (route) {
    var method = route.method, path = route.path, middleware = route.middleware, controller = route.controller;
    app[method].apply(app, __spreadArray(__spreadArray([path], middleware), [controller]));
});
typeorm_1.createConnection(dbConfig_1.default)
    .then(function (_connection) {
    app.listen(PORT, function () {
        console.log('Sync API server is running on port', PORT);
    });
}).catch(function (err) {
    console.log('Unable to connect to db', err);
    process.exit(1);
});
