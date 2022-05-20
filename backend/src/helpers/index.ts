import { FindOneOptions, ILike } from 'typeorm';
import Product from '../entities/product';
import { IQueryParams } from '../ts/interfaces';

export const queryGenerator = (queryParams: IQueryParams) => {
  const sortKeys = ['sort_name', 'sort_date', 'sort_status'];
  const filterKeys = ['name', 'date', 'status'];

  const query: FindOneOptions<Product> = {
    order: {},
    where: {},
  };

  sortKeys.forEach((el) => {
    if (el in queryParams) {
      query.order[el.split('_')[1]] = queryParams[el];
    }
  });

  filterKeys.forEach((el) => {
    if (el in queryParams) {
      if (el === 'name') {
        query.where[el] = ILike(`%${queryParams[el]}%`);
      } else if (el === 'date') {
        query.where[el] = new Date(queryParams[el]);
      } else {
        query.where[el] = queryParams[el];
      }
    }
  });

  return query;
};
