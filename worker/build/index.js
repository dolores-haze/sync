"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var dbConfig_1 = __importDefault(require("./dbConfig"));
var queue_1 = require("./userQueue/queue");
typeorm_1.createConnection(dbConfig_1.default)
    .then(function (_connection) {
    queue_1.startUserQueue();
}).catch(function (err) {
    console.log('Unable to connect to db', err);
    process.exit(1);
});
