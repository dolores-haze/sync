"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sync_1 = require("./models/sync");
var user_1 = require("./models/user");
var dbConfig = {
    entities: [user_1.User, sync_1.Sync],
    host: process.env.POSTGRES_HOST || 'localhost',
    password: 'postgres',
    port: 5432,
    synchronize: true,
    type: 'postgres',
    username: 'postgres',
};
exports.default = dbConfig;
