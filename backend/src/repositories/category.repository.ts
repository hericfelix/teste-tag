import { getRepository, Repository } from 'typeorm';
import Category from '../entities/category';
import { CategoryRepo } from '../ts/interfaces';

class CategoryRepository implements CategoryRepo {
  private ormRepo: Repository<Category>;

  constructor() {
    this.ormRepo = getRepository(Category);
  }

  save = async (data: { name: string }) => await this.ormRepo.save(data);

  getByName = async (data: { name: string }) =>
    await this.ormRepo.findOne(data);
}

export default CategoryRepository;
