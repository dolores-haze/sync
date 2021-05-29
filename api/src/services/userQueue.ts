import { onJobProgress } from "./syncService";

const Queue = require('bee-queue');

const USER_QUEUE_NAME: string = 'User';

class UserQueue {
  queue: any;

  constructor() {
    this.queue = new Queue(USER_QUEUE_NAME, {
      redis: {
        host: 'redis',
        port: 6379
      },
      isWorker: false,
    });
  }
}

const userQueue = new UserQueue();

// Trigger to start a sync
export const startSync = async () => {
  const date: Date = new Date();
  const job = await userQueue.queue.createJob({}).save();

  job.on('progress', onJobProgress);
  return `Sync queued at ${date.toLocaleString()}`;
};

// Get Worker Status

