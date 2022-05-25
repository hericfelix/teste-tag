import { getRepository, Repository } from 'typeorm';
import Product from '../entities/product';
import { queryGenerator } from '../helpers';
import {
  ICreateProduct,
  IProduct,
  IQueryParams,
  ProductRepo,
} from '../ts/interfaces';

class ProductRepository implements ProductRepo {
  private ormRepo: Repository<Product>;

  constructor() {
    this.ormRepo = getRepository(Product);
  }

  save = async (data: ICreateProduct) => await this.ormRepo.save(data);

  get = async (queryParams: IQueryParams = {}) => {
    const query = queryGenerator(queryParams);

    return await this.ormRepo.find({
      join: {
        alias: 'product',
        innerJoinAndSelect: {
          category: 'product.category',
        },
      },
      ...query,
    });
  };

  update = async (id: string, data: Partial<IProduct>) => {
    return await this.ormRepo.update(id, { ...data });
  };

  delete = async (ids: string[]) => await this.ormRepo.delete(ids);
}

export default ProductRepository;
