import { Request, Response } from 'express';

const login = (req: Request, res: Response) => {
  return res.status(200).json({ token: req.token });
};

export default login;
