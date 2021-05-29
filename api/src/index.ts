import "reflect-metadata";
import express from 'express';
import bodyParser from 'body-parser';
import { createConnection } from "typeorm";

import { routes } from './routes';
import dbConfig from "./dbConfig";

const app = express();
const PORT = 8000;

app.use(bodyParser.urlencoded({ extended: false }));

routes.forEach((route) => {
  const { method, path, middleware, controller } = route;

  app[method](path, ...middleware, controller);
});

createConnection(dbConfig)
  .then((_connection) => {
    app.listen(PORT, () => {
      console.log('Sync API server is running on port', PORT);
    });
  }).catch((err) => {
    console.log('Unable to connect to db', err);
    process.exit(1);
  });
