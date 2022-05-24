import { getRepository, Repository } from 'typeorm';
import User from '../entities/user';
import { IUser, UserRepo } from '../ts/interfaces';

class UserRepository implements UserRepo {
  private ormRepo: Repository<User>;

  constructor() {
    this.ormRepo = getRepository(User);
  }

  save = async (data: IUser) => await this.ormRepo.save(data);

  getByEmail = async (email: string) =>
    await this.ormRepo.findOne({ email: email });
}

export default UserRepository;
