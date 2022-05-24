declare namespace Express {
  export interface Request {
    category: Category;
    validated: Partial<IProduct> | ILogin;
    token: string;
    user: User;
    email: string;
  }
}
