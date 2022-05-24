import { Request, Response } from 'express';

const login = (req: Request, res: Response) => {
  console.log('hey');
  return res.status(200).json({ token: req.token });
};

export default login;
