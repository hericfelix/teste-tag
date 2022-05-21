import { Status } from '../enums';
import Product from '../../entities/product';
import { AscOrDesc } from '../types';
import { DeleteResult, UpdateResult } from 'typeorm';
import User from '../../entities/user';
import Category from '../../entities/category';

export interface IQueryParams {
  sort_name?: AscOrDesc;
  sort_date?: AscOrDesc;
  sort_status?: AscOrDesc;
  name?: string;
  date?: string;
  status?: string;
}

export interface IProduct {
  id?: string;
  name: string;
  status: Status;
  created: Date;
  created_by?: string;
  category_id?: string;
}

export interface IUser {
  name: string;
  email: string;
  password: string;
}

export interface ProductRepo {
  save: (data: IProduct) => Promise<Product>;
  get: (queryParams?: IQueryParams) => Promise<Product[]>;
  update: (id: string, data: Partial<IProduct>) => Promise<UpdateResult>;
  delete: (ids: string[]) => Promise<DeleteResult>;
}

export interface UserRepo {
  save: (data: IUser) => Promise<User>;
}

export interface CategoryRepo {
  save: (data: { [key: string]: string }) => Promise<Category>;
}
