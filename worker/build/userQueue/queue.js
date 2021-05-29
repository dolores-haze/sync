"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startUserQueue = void 0;
var Queue = require('bee-queue');
var worker_1 = require("./worker");
var syncService_1 = require("./../services/syncService");
var USER_QUEUE_NAME = 'User';
var startUserQueue = function () {
    var userQueue = new Queue(USER_QUEUE_NAME, {
        redis: {
            host: 'redis',
            port: 6379
        },
        isWorker: true,
    });
    userQueue.on('ready', function () {
        console.log('User queue ready');
    });
    userQueue.on('error', function (err) {
        console.log("A queue error happened: " + err.message);
    });
    userQueue.on('succeeded', syncService_1.onJobCompleted);
    userQueue.on('failed', function (job, err) {
        console.log("Job " + job.id + " failed with error: " + err.message);
    });
    userQueue.on('retrying', function (job, err) {
        console.log("Job " + job.id + " failed with error " + err.message + " but is being retried!");
    });
    userQueue.on('stalled', function (jobId) {
        console.log("Job " + jobId + " stalled and will be reprocessed");
    });
    userQueue.process(worker_1.userWorker);
};
exports.startUserQueue = startUserQueue;
