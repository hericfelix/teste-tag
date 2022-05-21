declare namespace Express {
  export interface Request {
    validated: Partial<IProduct> | ILogin;
    token: string;
    decodedEmail: string;
  }
}
