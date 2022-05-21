import { getRepository, Repository } from 'typeorm';
import Product from '../../entities/product';
import { queryGenerator } from '../../helpers';
import { IProduct, IQueryParams, ProductRepo } from '../../ts/interfaces';

class ProductRepository implements ProductRepo {
  private ormRepo: Repository<Product>;

  constructor() {
    this.ormRepo = getRepository(Product);
  }

  save = async (data: IProduct) => await this.ormRepo.save(data);

  get = async (queryParams: IQueryParams = {}) => {
    const query = queryGenerator(queryParams);

    return await this.ormRepo.find(query);
  };

  update = async (id: string, data: Partial<IProduct>) =>
    await this.ormRepo.update(id, data);

  delete = async (ids: string[]) => await this.ormRepo.delete(ids);
}

export default ProductRepository;
