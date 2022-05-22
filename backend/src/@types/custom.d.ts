declare namespace Express {
  export interface Request {
    category: Category;
    validated: Partial<IProduct> | ILogin;
    token: string;
    decodedEmail: string;
    user: User;
  }
}
