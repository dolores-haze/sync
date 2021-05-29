const Queue = require('bee-queue');

import { userWorker } from './worker';
import { onJobCompleted } from './../services/syncService';

const USER_QUEUE_NAME: string = 'User';

export const startUserQueue = () => {
  const userQueue = new Queue(USER_QUEUE_NAME, {
    redis: {
      host: 'redis',
      port: 6379
    },
    isWorker: true,
  });

  userQueue.on('ready', () => {
    console.log('User queue ready');
  });

  userQueue.on('error', (err: { message: any; }) => {
    console.log(`A queue error happened: ${err.message}`);
  });

  userQueue.on('succeeded', onJobCompleted);

  userQueue.on('failed', (job: { id: any; }, err: { message: any; }) => {
    console.log(`Job ${job.id} failed with error: ${err.message}`);
  });

  userQueue.on('retrying', (job: { id: any; }, err: { message: any; }) => {
    console.log(`Job ${job.id} failed with error ${err.message} but is being retried!`);
  });

  userQueue.on('stalled', (jobId: number) => {
    console.log(`Job ${jobId} stalled and will be reprocessed`);
  });

  userQueue.process(userWorker);
};