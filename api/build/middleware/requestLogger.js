"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLogger = void 0;
var requestLogger = function (req, res, next) {
    var timestamp = new Date();
    console.log(timestamp.toLocaleString() + " | " + req.path);
    next();
};
exports.requestLogger = requestLogger;
