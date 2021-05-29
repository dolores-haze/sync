import { RequestHandler } from 'express';

export const requestLogger: RequestHandler = (req, res, next) => {
  // console.log(req);
  const timestamp: Date = new Date();

  console.log(`${timestamp.toLocaleString()} | ${req.path}`);
  next();
};
