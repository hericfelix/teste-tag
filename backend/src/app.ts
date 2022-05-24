import express, { json, NextFunction, Request, Response } from 'express';
import { handleError } from './helpers';
import router from './routes';

const app = express();

app.use(json());

app.use('', router);

app.use((err: any, _: Request, res: Response, __: NextFunction) => {
  return handleError(err, res);
});

export default app;
