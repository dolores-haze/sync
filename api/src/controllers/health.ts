import { Controller } from '../types';

export const health: Controller = (req, res) => {
  res.status(200).send({
    message: 'OK'
  });
};
