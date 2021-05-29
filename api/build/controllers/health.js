"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.health = void 0;
var health = function (req, res) {
    res.status(200).send({
        message: 'OK'
    });
};
exports.health = health;
