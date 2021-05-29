"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
var requestLogger_1 = require("./middleware/requestLogger");
var health_1 = require("./controllers/health");
var users_1 = require("./controllers/v1/users");
exports.routes = [
    {
        method: 'get',
        path: '/health',
        middleware: [],
        controller: health_1.health,
    },
    {
        method: 'post',
        path: '/v1/users',
        middleware: [requestLogger_1.requestLogger],
        controller: users_1.beginSync,
    },
    {
        method: 'get',
        path: '/v1/users/sync',
        middleware: [requestLogger_1.requestLogger],
        controller: users_1.getSyncStatus,
    },
    {
        method: 'get',
        path: '/v1/users',
        middleware: [requestLogger_1.requestLogger],
        controller: users_1.getSyncedUsers,
    },
];
