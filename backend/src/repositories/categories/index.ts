import { getRepository, Repository } from 'typeorm';
import Category from '../../entities/category';
import { CategoryRepo } from '../../ts/interfaces';

class CategoryRepository implements CategoryRepo {
  private ormRepo: Repository<Category>;

  constructor() {
    this.ormRepo = getRepository(Category);
  }

  save = async (data: { [key: string]: string }) =>
    await this.ormRepo.save(data);
}

export default CategoryRepository;
