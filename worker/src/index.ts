import "reflect-metadata";
import { createConnection } from "typeorm";

import dbConfig from "./dbConfig";
import { startUserQueue } from './userQueue/queue';


createConnection(dbConfig)
  .then((_connection) => {
    startUserQueue();
  }).catch((err) => {
    console.log('Unable to connect to db', err);
    process.exit(1);
  });
