import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Status } from '../../ts/enums';
import Category from '../category';
import User from '../user';

@Entity('products')
class Product {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ length: 60 })
  name: string;

  @Column({ type: 'enum', enum: Status })
  status: Status;

  @Column({ default: new Date() })
  created?: Date;

  @ManyToOne((type) => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category?: Category;

  @ManyToOne((type) => User, (user) => user.products)
  @JoinColumn({ name: 'created_by' })
  user?: User;
}

export default Product;
